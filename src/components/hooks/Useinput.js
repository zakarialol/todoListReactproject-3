import { useState, useEffect } from "react";
import validInput from "../../js/validInput.js";
//
// const regexOBj = {
//   fullName: fullnameRegex,
//   email: emailRegex,
//   password: passwordRegex,
// };
//
function useInput({ initialValue = "", errors = {}, setErrors = {} }) {
  // useEffect(() => {
  //   console.log("errros isnide the usinput", errors);
  // }, [errors]);
  const [value, setValue] = useState(initialValue);
  function handleChange(e, errors) {
    setValue(e.target.value);
    const name = e.target.name;
    // console.log(name, "name inside vlaid input");
    const { showError, touched } = errors[name];
    if (!showError || !touched) return;
    //
    const inputIsValid = validInput(e.target.value, name);
    if (inputIsValid) {
      // console.log("the input is valid succefully ***##***");
      setErrors((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          isvalid: true,
        },
      }));
    }
    // console.log("errors insidethe useinput", errors);
  }
  return {
    value,
    onChange: (e) => {
      handleChange(e, errors);
    },
  };
}

export default useInput;
