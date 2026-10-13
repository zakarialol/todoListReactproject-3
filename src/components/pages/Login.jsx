import { useState, useEffect } from "react";
import Paragraph from "../Ui/Paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import Button from "../Ui/Button";
import { Link } from "react-router-dom";
//icons
//
import RememberMeCheckBox from "@/components/sections/RememberMeCheckBox";
import BounceLoadingAnimation from "../icons/BounceLoadingAnimation";
//react
import { useNavigate } from "react-router-dom";
//
import signInWithUserAndPassword from "../../js/signInWithUserPassword";
//
//firebase
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

//
import { livingInput } from "../../js/livingInput";
//
import useInput from "../hooks/useinput";
//
import { validEmail } from "../../js/checkInputsValidation";
import { auth } from "../../Firebase/firebase";
//
//
function Login() {
  const navigate = useNavigate();
  //chared state
  const [remmberMe, setRememberMe] = useState(false);
  //
  const [errors, setErrors] = useState({
    email: {
      msg: "email not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
  });
  //!state
  const [focused, setfocused] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [userOrPasswordIncorretError, setuserOrPasswordIncorretError] =
    useState(false);
  const [loginAnimation, setloginAnimation] = useState(false);
  //
  const email = useInput({ initialValue: "", errors, setErrors });
  //hanlde sumbit
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
      //remmber me
      if (remmberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }
      //
      const result = await signInWithUserAndPassword({
        user: email.value,
        password: passwordInputValue,
      });
      const user = auth.currentUser;
      //* if email not verfied
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
      //* if email verified
      if (result.user.emailVerified) navigate("/home");
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
  //
  // this when the user lives the input
  return (
    <>
      <div className="px-6 pt-6 flex-1">
        <div className="text-center">
          <Paragraph className="formTitle" text="login" />
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-500 font-inter text-red-500 bg-[rgba(239_68_68_/_.1)] w-fit mx-auto rounded-lg ${userOrPasswordIncorretError ? "max-h-10" : "max-h-0"}`}
        >
          <p className="px-2 py-1 ">user or password incorrect</p>
        </div>
        {/* //*form ------------------------------------------------------ */}
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
          <div className="flex justify-between gap-2 mb-2">
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
            animation={
              <BounceLoadingAnimation
                className={`${loginAnimation ? "block" : "hidden"}`}
              />
            }
          />
        </form>
        <div className="text-center mt-4 flex items-center justify-center flex-wrap capitalize gap-1">
          <Paragraph text="don't have an account ? " />
          <Link
            to="/register"
            className="text-orange-500 cursor-pointer ml-[2px] "
          >
            sign up
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;
