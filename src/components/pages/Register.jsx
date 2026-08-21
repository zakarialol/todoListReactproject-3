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
import { useState } from "react";
//
const validinputsfunc = (
  fullName,
  email,
  password,
  confirmPassword,
  setErrors,
  errors,
) => {
  //
  const fullnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  //
  const FormInputsErrorsObj = {};
  if (!fullnameRegex.test(fullName.value)) {
    FormInputsErrorsObj.fullName = true;
    console.log("inside the full name");
    // setErrors((prev) => {
    //   return {
    //     ...prev,
    //     fullName: {
    //       ...prev.fullName,
    //       showError: condition,
    //     },
    //   };
    // });
  }

  if (!emailRegex.test(email.value)) {
    console.log("inside email condition");
    FormInputsErrorsObj.email = true;
    // setErrors((prev) => {
    //   return {
    //     ...prev,
    //     email: {
    //       ...prev.email,
    //       showError: condition,
    //     },
    //   };
    // });
  }

  if (!passwordRegex.test(password.value)) {
    console.log("inside the password");
    FormInputsErrorsObj.password = true;
    // setErrors((prev) => {
    //   return {
    //     ...prev,
    //     password: {
    //       ...prev.password,
    //       showError: condition,
    //     },
    //   };
    // });
  }

  if (password.value !== confirmPassword.value) {
    console.log("inside confirm password");
    FormInputsErrorsObj.confirmPassword = true;
    // setErrors((prev) => {
    //   return {
    //     ...prev,
    //     confirmPassword: {
    //       ...prev.confirmPassword,
    //       showError: condition,
    //     },
    //   };
    // });
  }
  console.log(FormInputsErrorsObj, "forinputserrorsobj");
  for (const key in FormInputsErrorsObj) {
    setErrors((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev.key,
          showError: FormInputsErrorsObj[key],
        },
      };
    });
  }
  console.log(errors, "errors");
  // setErrors(FormInputsErrorsObj);
  // console.log(
  //   Object.keys(FormInputsErrorsObj).length === 0,
  //   "result of inputs",
  // );
  // return Object.keys(FormInputsErrorsObj).length === 0;
};

function Register() {
  const fullName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const [errors, setErrors] = useState({
    fullName: {
      msg: "full name not valid",
      showError: false,
    },
    email: {
      msg: "email not valid",
      showError: false,
    },
    password: {
      msg: "password mast include uppercase letter,must include special caracter,must be more than 8 letters",
      showError: false,
    },
    confirmPassword: {
      msg: "password not much ",
      showError: false,
    },
  });
  //function to call the firebase api
  async function handleSubmit(e) {
    e.preventDefault();
    //
    validinputsfunc(
      fullName,
      email,
      password,
      confirmPassword,
      setErrors,
      errors,
    );
    if (!validinputsfunc) {
      return;
    }
    // try {
    //   const userCridenial = await createUserWithEmailAndPassword(
    //     auth,
    //     email.value,
    //     password.value,
    //   );
    //   console.log(userCridenial, "usercridenial");
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
          title="full name"
          type="text"
          error={errors.fullName["msg"]}
          showError={errors.fullName.showError}
        />
        <InputWithTitle
          name="email"
          {...email}
          title="email"
          type="email"
          error={errors.email["msg"]}
          showError={errors.email.showError}
        />
        <InputWithTitle
          name="password"
          {...password}
          title="password"
          type="password"
          error={errors.password["msg"]}
          showError={errors.password.showError}
        />
        <InputWithTitle
          name="confirmPassword"
          {...confirmPassword}
          title="confirm password"
          type="password"
          error={errors.confirmPassword["msg"]}
          showError={errors.confirmPassword.showError}
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
