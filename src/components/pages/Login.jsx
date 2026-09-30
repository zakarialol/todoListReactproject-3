import { useState } from "react";
import Paragraph from "../Ui/paragraph";
import InputWithTitle from "../sections/InputWithTitle";
import ClasicTitleAndInput from "../sections/classicTitleAndInput";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
//react
import { useNavigate } from "react-router-dom";
//
import signInWithUserAndPassword from "../../js/signInWithUserPassword";
//
//firebase
//
import { livingInput } from "../../js/livingInput";
//
import useInput from "../hooks/useinput";
//
import { validEmail } from "../../js/checkInputsValidation";
//
//
function Login() {
  const navigate = useNavigate();
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
    const result = await signInWithUserAndPassword({
      user: email.value,
      password: passwordInputValue,
    });
    if (result) navigate("/home");
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
