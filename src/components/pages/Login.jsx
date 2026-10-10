import { useState, useEffect } from "react";
import Paragraph from "../Ui/paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import ClasicTitleAndInput from "../sections/classicTitleAndInput";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
//icons
//
import RememberMeCheckBox from "@/components/sections/RememberMeCheckBox";
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
import { sendEmailVerification } from "firebase/auth";
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
    //remmber me
    if (remmberMe) {
      await setPersistence(auth, browserLocalPersistence);
    } else {
      await setPersistence(auth, browserSessionPersistence);
    }
    //
    let result;
    try {
      result = await signInWithUserAndPassword({
        user: email.value,
        password: passwordInputValue,
      });
    } catch (err) {
      console.log(err);
    }
    const user = auth.currentUser;
    //* if email not verfied
    if (!result.user.emailVerified) {
      // sendEmailVerification(user);
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
  }
  //
  // this when the user lives the input
  return (
    <>
      <div className="px-6 pt-6 flex-1">
        <div className="text-center">
          <Paragraph className="formTitle" text="login" />
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
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
            text="login"
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
