import { useState, useEffect } from "react";
import Paragraph from "../Ui/Paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import Button from "../Ui/Button";
//firebase
import { sendPasswordResetEmail } from "firebase/auth";
//react
import { useNavigate } from "react-router-dom";
//
import { livingInput } from "../../js/livingInput";
//
import useInput from "../hooks/useinput";
//
import { validEmail } from "../../js/checkInputsValidation";
import { auth } from "../../Firebase/firebase";
//
import BounceLoadingAnimation from "../icons/BounceLoadingAnimation";
//
function ResetPassword() {
  const [loginAnimation, setloginAnimation] = useState(false);

  const navigate = useNavigate();
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
  //
  const { setValue: setEmailvalue, ...email } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
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

      await sendPasswordResetEmail(auth, email.value);
      navigate("/sendResetPasswordToEmail", {
        state: {
          email: email.value,
        },
      });
    } catch (err) {
      console.log("err", err);
    } finally {
      setloginAnimation(false);
    }
  }
  // this when the user lives the input
  return (
    <div className="relative isolate flex min-h-full flex-1 items-center justify-center overflow-x-clip bg-gray-50 px-4 pb-8 pt-28 sm:px-6 sm:pb-10 lg:px-8">
      {/* Decorative curved background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[260px] bg-gradient-to-br from-orange-400 to-orange-600 sm:h-[320px] lg:h-[380px]">
        <svg
          className="absolute -bottom-px left-0 h-32 w-full sm:h-40 lg:h-48"
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

      {/* Reset password form */}
      <div className="relative my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-xl shadow-orange-900/10 sm:p-8">
        <div className="text-center">
          <Paragraph className="formTitle" text="reset password" />
        </div>

        <Paragraph
          className="normalParagraphStyle mb-4"
          text="Enter the email associated with your account"
        />

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

          <Button
            type="submit"
            disabled={loginAnimation}
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3 flex items-center justify-center gap-1"
            text={loginAnimation ? "please wait" : "continue"}
            animation={
              <BounceLoadingAnimation
                className={`${loginAnimation ? "block" : "hidden"}`}
              />
            }
          />
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
