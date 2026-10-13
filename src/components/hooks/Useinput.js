import { useState, useEffect } from "react";
import validInput from "../../js/validInput.js";
import displayError from "../../js/displayError.js";
import validPasswordCondition from "../../js/validPasswordCondition.js";
import validTextArea from "../../js/validTextArea.js";
let password = "";
function useInput({ initialValue = "", errors = {}, setErrors = {} }) {
  const [value, setValue] = useState(initialValue);
  //!
  function handleChange(e, errors) {
    setValue(e.target.value);
    const name = e.target.name;
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
      const isvalid = e.target.value.trim() === password;
      displayError(setErrors, name, isvalid);
      return;
    }
    //
    let isvalid;
    if (name === "message") {
      const message = e.target.value;
      isvalid = validTextArea(message);
    } else {
      isvalid = validInput(e.target.value, name);
    }
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
