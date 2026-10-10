import { useState, useEffect } from "react";
import validInput from "../../js/validInput.js";
import displayError from "../../js/displayError.js";
import validPasswordCondition from "../../js/validPasswordCondition.js";
let password = "";
function useInput({ initialValue = "", errors = {}, setErrors = {} }) {
  const [value, setValue] = useState(initialValue);
  //!
  function handleChange(e, errors) {
    setValue(e.target.value);
    const name = e.target.name;
    console.log(name);
    const { touched } = errors[name];
    if (name === "password") {
      password = e.target.value.trim();
    }

    if (!touched) return;
    //
    if (name === "password") {
      validPasswordCondition(password, setErrors);
    }
    //
    if (name === "confirmPassword") {
      console.log("password", password);
      const isvalid = e.target.value.trim() === password;
      console.log(e.target.value, "e.target.value");
      console.log(isvalid, "isvalid");
      displayError(setErrors, name, isvalid);
      return;
    }
    //
    const isvalid = validInput(e.target.value, name);
    //
    displayError(setErrors, name, isvalid);
  }
  //
  return {
    value,
    onChange: (e) => {
      handleChange(e, errors);
    },
  };
}

export default useInput;
