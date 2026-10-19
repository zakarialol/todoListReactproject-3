// icons
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
    const userCridenial = await senduserToFirebase({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      setEmailExistAlready,
      setErrors,
    });
    console.log(userCridenial, "userCridenial");
    if (!userCridenial) return;
    await sendEmailVerification(userCridenial.user);
    navigate("/verifyEmail", {
      state: {
        id: userCridenial.user.uid,
        email: email.value,
        fullName: fullName.value,
      },
    });
  }
  //!
  //
  return (
    <div className="px-6 pt-6 flex-1">
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
          className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
          text="sign up"
        />
      </form>
      <div className="text-center mt-4 flex items-center justify-center flex-wrap capitalize gap-1">
        <Paragraph text="already have an acoount ? " className="" />
        <Link to="/" className="text-orange-500 cursor-pointer ">
          sign in
        </Link>
      </div>
    </div>
  );
}
export default Register;
