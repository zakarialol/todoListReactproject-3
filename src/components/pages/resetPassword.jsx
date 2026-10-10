import { useState, useEffect } from "react";
import Paragraph from "../Ui/paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import Button from "../ui/Button";
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
//
function ResetPassword() {
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
    await sendPasswordResetEmail(auth, email.value);
    navigate("/sendResetPasswordToEmail", {
      state: {
        email: email.value,
      },
    });
  }
  // this when the user lives the input
  return (
    <>
      <div className="px-6 pt-6 flex-1">
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
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
            text="continue"
          />
        </form>
      </div>
    </>
  );
}
export default ResetPassword;
