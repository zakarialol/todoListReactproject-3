import { useState } from "react";
import Paragraph from "../Ui/paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import PasswordInput from "../sections/PasswordInput";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
//
import { livingInput } from "../../js/livingInput";
//
import useInput from "../hooks/useinput";
//
import { validEmail, validPassword } from "../../js/checkInputsValidation";
//
//
function Login() {
  const [errors, setErrors] = useState({
    email: {
      msg: "email not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
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
  });
  //!state
  const [focused, setfocused] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  //
  const email = useInput({ initialValue: "", errors, setErrors });
  const password = useInput({ initialValue: "", errors, setErrors });
  //hanlde sumbit
  function handleSubmit(e) {
    e.preventDefault();
    const emailisValid = validEmail(email.value);
    const passwordisValid = validPassword(password.value);
    setErrors((prev) => ({
      ...prev,
      ["email"]: {
        ...prev.email,
        showError: !emailisValid,
        touched: true,
      },
      ["password"]: {
        ...prev.password,
        showError: !passwordisValid,
        touched: true,
      },
    }));
    if (!emailisValid || !passwordisValid) return;
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
          <PasswordInput
            type={showPassword ? "text" : "password"}
            title="password"
            name="password"
            onblur={() => {
              setfocused(false);
              setshowPassword(false);
            }}
            error={errors.password["msg"]}
            focused={focused}
            onfocuse={(e) => {
              setfocused(true);
              livingInput(e, setErrors, password);
            }}
            showPassword={showPassword}
            setshowPassword={setshowPassword}
            showError={errors.password.showError}
            passwordCon={errors.password.passwordCon}
            {...password}
          />
          <Button
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
            text="login"
          />
          <div className="text-center mt-4 flex items-center justify-center flex-wrap capitalize gap-1">
            <Paragraph text="don't have an account ? " />
            <Link
              to="/register"
              className="text-orange-500 cursor-pointer ml-[2px] "
            >
              sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
