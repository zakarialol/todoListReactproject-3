import Paragraph from "../Ui/Paragraph";
//jsx
import InputWithTitle from "@/components/sections/InputWithTitle";
import Button from "@/components/Ui/Button";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useinput.js";
//firebase
import { useState, useEffect } from "react";
import { livingInput } from "../../js/livingInput.js";
import { sendEmailVerification } from "firebase/auth";
//
import { fullnameRegex, emailRegex, passwordRegex } from "../../js/regex.js";
import senduserToFirebase from "../../js/senduserToFirebase.js";
//
import BounceLoadingAnimation from "../icons/BounceLoadingAnimation.jsx";
//
import displayOrhideformErrors from "../../js/DispalyOrHideFormError.js";
//
function validinputsfunc(
  fullName,
  email,
  password,
  confirmPassword,
  setErrors,
) {
  const FormInputsErrorsObj = {};
  if (!fullnameRegex.test(fullName.value.trim())) {
    FormInputsErrorsObj.fullName = true;
  } else {
    FormInputsErrorsObj.fullName = false;
  }

  if (!emailRegex.test(email.value.trim())) {
    FormInputsErrorsObj.email = true;
  } else {
    FormInputsErrorsObj.email = false;
  }
  if (!passwordRegex.test(password.value.trim())) {
    FormInputsErrorsObj.password = true;
  } else {
    FormInputsErrorsObj.password = false;
  }

  if (password.value !== confirmPassword.value.trim()) {
    FormInputsErrorsObj.confirmPassword = true;
  } else {
    FormInputsErrorsObj.confirmPassword = false;
  }
  displayOrhideformErrors(FormInputsErrorsObj, setErrors);
  return Object.values(FormInputsErrorsObj).some((value) => value === true);
}

//!
//* this when the user lives the input

//todo register cmponent function
function Register() {
  const [loginAnimation, setloginAnimation] = useState(false);
  //state for email if exist
  const [emailexistalready, setEmailExistAlready] = useState(false);
  const navigate = useNavigate();
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
    fullName: {
      msg: "full name not valid",
      showError: false,
      touched: false,
      isvalid: false,
    },
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
    confirmPassword: {
      msg: "password don't much ",
      showError: false,
      touched: false,
      isvalid: false,
    },
  });
  //!
  const { setValue: setfullName, ...fullName } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setEmail, ...email } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setPassword, ...password } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });
  const { setValue: setconfirm, ...confirmPassword } = useInput({
    initialValue: "",
    errors,
    setErrors,
  });

  //todo function when user clickes form submit
  //!
  async function handleSubmit(e, setEmailExistAlready, setErrors) {
    e.preventDefault();
    //
    setErrors((prev) => ({
      ...prev,
      fullName: { ...prev.fullName, touched: true },
      email: { ...prev.email, touched: true },
      password: { ...prev.password, touched: true },
      confirmPassword: { ...prev.confirmPassword, touched: true },
    }));
    const hasInvalidInputs = validinputsfunc(
      fullName,
      email,
      password,
      confirmPassword,
      setErrors,
    );
    if (hasInvalidInputs) return;
    try {
      setloginAnimation(true);

      const userCridenial = await senduserToFirebase({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        setEmailExistAlready,
        setErrors,
      });
      if (!userCridenial) return;
      await sendEmailVerification(userCridenial.user);
      navigate("/verifyEmail", {
        state: {
          id: userCridenial.user.uid,
          email: email.value,
          fullName: fullName.value,
        },
      });
    } catch (err) {
      setloginAnimation(false);
      console.log("error", err);
    } finally {
    }
  }
  //!
  //
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

      {/* Register form */}
      <div className="relative my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-xl shadow-orange-900/10 sm:p-8">
        <div className="text-center">
          <Paragraph className="formTitle" text="create an account" />
        </div>

        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e, setEmailExistAlready, setErrors);
          }}
        >
          <InputWithTitle
            title="full name"
            name="fullName"
            {...fullName}
            value={fullName.value}
            onChange={fullName.onChange}
            type="text"
            error={errors.fullName["msg"]}
            showPassword={showPassword}
            showError={errors.fullName.showError}
            onblur={(e) => {
              livingInput(e, setErrors);
            }}
          />

          <InputWithTitle
            title="email"
            name="email"
            type="email"
            showPassword={showPassword}
            error={
              emailexistalready
                ? "this email already registred"
                : errors.email["msg"]
            }
            emailexistalready={emailexistalready}
            onblur={(e) => {
              livingInput(e, setErrors);
            }}
            showError={errors.email.showError}
            {...email}
          />

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
              setshowPassword((prev) => ({
                ...prev,
                confirmPassword: false,
              }));
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
            onClick={(e) => {
              handleSubmit(e, setEmailExistAlready, setErrors);
            }}
            disabled={loginAnimation}
            className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3 flex items-center justify-center gap-1"
            text={loginAnimation ? "please wait" : "register"}
            animation={
              <BounceLoadingAnimation
                className={`${loginAnimation ? "block" : "hidden"}`}
              />
            }
          />
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-center capitalize">
          <Paragraph text="already have an acoount ? " className="" />
          <Link to="/" className="ml-[2px] cursor-pointer text-orange-500">
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
