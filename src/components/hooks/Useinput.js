import { useState, useEffect } from "react";
import validInput from "../../js/validInput.js";
import displayError from "../../js/displayError.js";
import { passwordRegex } from "../../js/regex.js";
let password = null;
function useInput({ initialValue = "", errors = {}, setErrors = {} }) {
  const [value, setValue] = useState(initialValue);
  //!
  function handleChange(e, errors) {
    setValue(e.target.value);
    const name = e.target.name;
    const { touched } = errors[name];
    if (!touched) return;
    //
    if (name === "password") {
      password = e.target.value;
    }
    //
    if (name === "confirmPassword") {
      const isvalid = e.target.value === password;
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
