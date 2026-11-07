import { useState, useEffect } from "react";
import Paragraph from "../Ui/Paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import Button from "../Ui/Button";
import { Link } from "react-router-dom";
import RememberMeCheckBox from "@/components/sections/RememberMeCheckBox";
import BounceLoadingAnimation from "../icons/BounceLoadingAnimation";
import { useNavigate } from "react-router-dom";
import signInWithUserAndPassword from "../../js/signInWithUserPassword";
import ClasicTitleAndInput from "../sections/classicTitleAndInput";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { livingInput } from "../../js/livingInput";
import useInput from "../hooks/useinput";
import { validEmail } from "../../js/checkInputsValidation";
import { auth } from "../../Firebase/firebase";

function Login() {
  const navigate = useNavigate();
  const [remmberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({
    email: {
      msg: "email not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
  });

  const [focused, setfocused] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [userOrPasswordIncorretError, setuserOrPasswordIncorretError] =
    useState(false);
  const [loginAnimation, setloginAnimation] = useState(false);

  const { setValue, ...email } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const emailisValid = validEmail(email.value);

    setErrors((prev) => ({
      ...prev,
      ["email"]: {
        ...prev.email,
        showError: !emailisValid,
        touched: true,
      },
    }));

    if (!emailisValid) return;

    try {
      setloginAnimation(true);

      if (remmberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      const result = await signInWithUserAndPassword({
        user: email.value,
        password: passwordInputValue,
      });

      const user = auth.currentUser;

      if (!result.user.emailVerified) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const fullName = userDoc.data().fullName;

        navigate("/verifyEmail", {
          state: {
            email: email.value,
            fullName: fullName,
          },
        });

        return;
      }
      if (result.user.emailVerified) {
        window.location.href = "/home";
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setuserOrPasswordIncorretError(true);
        setTimeout(() => {
          setuserOrPasswordIncorretError(false);
        }, 2000);
      }
    } finally {
      setloginAnimation(false);
    }
  }

  return (
    <div className="relative isolate flex min-h-full flex-1 items-center justify-center overflow-hidden bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      {/* Decorative curved background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[320px] bg-gradient-to-br from-orange-400 to-orange-600 sm:h-[380px]">
        <svg
          className="absolute -bottom-px left-0 h-40 w-full sm:h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f9fafb"
            d="M0,160 C240,300 480,300 720,180 C960,60 1200,80 1440,180 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Login form */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl shadow-orange-900/10 sm:p-8">
        <div className="text-center">
          <Paragraph className="formTitle" text="login" />
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-500 font-inter text-red-500 bg-[rgba(239_68_68_/_.1)] w-fit mx-auto rounded-lg ${userOrPasswordIncorretError ? "max-h-10" : "max-h-0"}`}
        >
          <p className="px-2 py-1">email or password incorrect</p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <InputWithTitle
            title="email"
            name="email"
            type="email"
            placeholder="nn@example.com"
            error={errors.email["msg"]}
            showError={errors.email.showError}
            {...email}
            onblur={(e) => {
              livingInput(e, setErrors);
            }}
          />

          <ClasicTitleAndInput
            type={showPassword ? "text" : "password"}
            title="password"
            name="password"
            autoComplete="password"
            required={"required"}
            onblur={(e) => {
              setfocused(false);
              setshowPassword(false);
            }}
            focused={focused}
            onfocuse={(e) => {
              setfocused(true);
            }}
            value={passwordInputValue}
            onChange={(e) => {
              setPasswordInputValue(e.target.value);
            }}
            showPassword={showPassword}
            setshowPassword={setshowPassword}
          />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <RememberMeCheckBox
              remmberMe={remmberMe}
              setRememberMe={setRememberMe}
              text="remember me"
            />

            <button
              onClick={() => {
                navigate("/resetPassword");
              }}
              type="button"
              className="inputTitle mb-0 text-xs"
            >
              forgot Password
            </button>
          </div>

          <Button
            type="submit"
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3 flex items-center justify-center gap-1"
            text="login"
            disabled={loginAnimation}
            animation={
              <BounceLoadingAnimation
                className={`${loginAnimation ? "block" : "hidden"}`}
              />
            }
          />
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-center capitalize">
          <Paragraph text="don't have an account ? " />
          <Link
            to="/register"
            className="ml-[2px] cursor-pointer text-orange-500"
          >
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
