import { useState, useEffect } from "react";
import Paragraph from "../Ui/Paragraph";
import InputWithTitle from "../sections/InputWithTitle";
//react
import { useNavigate } from "react-router-dom";
//jsx
import Button from "../Ui/Button";
//
import { livingInput } from "../../js/livingInput";
//
import useInput from "../hooks/useinput";
//
import { validEmail } from "../../js/checkInputsValidation";
import { auth } from "../../Firebase/firebase";
//
//
function Newpassword() {
  //this for passowrds
  const [focused, setFocused] = useState({
    password: false,
    confirmPassword: false,
  });
  //
  const [showPassword, setshowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  //
  const [errors, setErrors] = useState({
    password: {
      msg: "password mast include uppercase letter,must include special caracter or number,must be more than 8 caracters",
      passwordCon: {
        upperCase: false,
        specialCaracter: false,
        moreThanEightLetters: false,
      },
      showError: false,
      touched: false,
      isvalid: false,
    },
    confirmPassword: {
      msg: "password don't much ",
      showError: false,
      touched: false,
      isvalid: false,
    },
  });
  //
  const { setValue: setPasswordValue, ...password } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setConfirmPassword, ...confirmPassword } = useInput({
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
  }
  //
  // this when the user lives the input
  return (
    <div className="px-6 pt-6 flex-1">
      <div className="text-center">
        <Paragraph className="formTitle" text="new password" />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <InputWithTitle
          title={"password"}
          name="password"
          {...password}
          type={showPassword.password ? "text" : "password"}
          error={errors.password["msg"]}
          showError={errors.password.showError}
          onblur={(e) => {
            livingInput(e, setErrors);
            setFocused(false);
            setshowPassword((prev) => ({ ...prev, password: false }));
          }}
          showPassword={showPassword}
          setshowPassword={setshowPassword}
          focused={focused.password}
          passwordCon={errors.password.passwordCon}
          onfocus={() => {
            setFocused((prev) => ({
              ...prev,
              password: true,
            }));
          }}
        />
        <InputWithTitle
          title="confirm password"
          name="confirmPassword"
          {...confirmPassword}
          type={showPassword.confirmPassword ? "text" : "password"}
          error={errors.confirmPassword["msg"]}
          showError={errors.confirmPassword.showError}
          setshowPassword={setshowPassword}
          showPassword={showPassword}
          onblur={(e) => {
            livingInput(e, setErrors, password);
            setFocused(false);
            setshowPassword((prev) => ({ ...prev, confirmPassword: false }));
          }}
          onfocus={() => {
            setFocused((prev) => ({
              ...prev,
              confirmPassword: true,
            }));
          }}
          focused={focused.confirmPassword}
        />
        <Button
          type="submit"
          className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
          text="login"
        />
      </form>
    </div>
  );
}
export default Newpassword;
