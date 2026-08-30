// icons
import Logo from "@/components/icons/Logo";
import Paragraph from "../Ui/paragraph";
//jsx
import LogoAndTitle from "@/components/sections/LogoAndTitle";
import InputWithTitle from "@/components/sections/InputWithTitle";
import Button from "@/components/Ui/Button";
import { Link } from "react-router-dom";
import useInput from "../hooks/Useinput.js";
//firebase
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
//
import { fullnameRegex, emailRegex, passwordRegex } from "../../js/regex.js";
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
  if (!fullnameRegex.test(fullName.value)) {
    FormInputsErrorsObj.fullName = true;
  } else {
    FormInputsErrorsObj.fullName = false;
  }

  if (!emailRegex.test(email.value)) {
    FormInputsErrorsObj.email = true;
  } else {
    FormInputsErrorsObj.email = false;
  }
  if (!passwordRegex.test(password.value)) {
    FormInputsErrorsObj.password = true;
  } else {
    FormInputsErrorsObj.password = false;
  }

  if (password.value !== confirmPassword.value) {
    FormInputsErrorsObj.confirmPassword = true;
  } else {
    FormInputsErrorsObj.confirmPassword = false;
  }
  displayOrhideformErrors(FormInputsErrorsObj, setErrors);
  return Object.values(FormInputsErrorsObj).some((value) => value === true);
}

//!
//* this when the user lives the input

function livingInput(inputName, setErrors) {
  setErrors((prev) => ({
    ...prev,
    [inputName]: {
      ...prev[inputName],
      touched: true,
    },
  }));
}

//todo register cmponent function
function Register() {
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
      msg: "password mast include uppercase letter,must include special caracter,must be more than 8 letters",
      showError: false,
      touched: false,
      isvalid: false,
    },
    confirmPassword: {
      msg: "password not much ",
      showError: false,
      touched: false,
      isvalid: false,
    },
  });
  //!
  const fullName = useInput({ initialValue: "", errors });
  const email = useInput({ initialValue: "", errors });
  const password = useInput({ initialValue: "", errors });
  const confirmPassword = useInput({ initialValue: "", errors });
  //!
  useEffect(() => {
    console.log("errors***###***", errors);
  }, [errors]);
  //!

  //todo function when user clickes form submit
  async function handleSubmit(e) {
    e.preventDefault();
    //
    const hasInvalidInputs = validinputsfunc(
      fullName,
      email,
      password,
      confirmPassword,
      setErrors,
    );
    if (hasInvalidInputs) {
      console.log("inside the false validinputs func");
      return;
    }
    // try {
    //   const userCridenial = await createUserWithEmailAndPassword(
    //     auth,
    //     email.value,
    //     password.value,
    //   );
    //   console.log(userCridenial, "usercridenial");g
    //   const uid = userCridenial.user.uid;
    //   await setDoc(doc(db, "users", uid), {
    //     fullName: fullName.value,
    //   });
    //   console.log("registred succefully..");
    // } catch (err) {
    //   if (err.code === "auth/email-already-in-use") {
    //     console.log("this email already exist");
    //   } else {
    //     console.log(err);
    //   }
    // }
  }
  //
  return (
    <div className="px-6 pt-6 h-dvh">
      <LogoAndTitle
        logo={<Logo width="32" height="32" />}
        title="askanote"
        className="flex gap-2 items-center mb-12"
      />

      <div className="text-center">
        <Paragraph className="formTitle" text="create and account" />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <InputWithTitle
          name="fullName"
          {...fullName}
          value={fullName.value}
          onChange={fullName.onChange}
          title="full name"
          type="text"
          error={errors.fullName["msg"]}
          showError={errors.fullName.showError}
          // onblur={() => {
          //   livingInput("fullName", setErrors);
          // }}
        />
        <InputWithTitle
          name="email"
          title="email"
          type="email"
          error={errors.email["msg"]}
          showError={errors.email.showError}
          {...email}
          // onblur={() => {
          //   livingInput("email", setErrors);
          // }}
        />
        <InputWithTitle
          name="password"
          {...password}
          title="password"
          type="password"
          error={errors.password["msg"]}
          showError={errors.password.showError}
          onblur={() => {
            livingInput("password", setErrors);
          }}
        />
        <InputWithTitle
          name="confirmPassword"
          {...confirmPassword}
          title="confirm password"
          type="password"
          error={errors.confirmPassword["msg"]}
          showError={errors.confirmPassword.showError}
          onblur={() => {
            livingInput("confirmPassword", setErrors);
          }}
        />

        <Button
          className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3"
          text="sign up"
        />
      </form>

      <div className="text-center mt-4 flex items-center justify-center flex-wrap capitalize">
        <Paragraph text="already have an acoount?" className="" />
        <Link to="/login" className="text-orange-500 cursor-pointer ">
          sign in
        </Link>
      </div>
    </div>
  );
}
export default Register;
