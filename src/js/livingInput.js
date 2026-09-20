import validInput from "./validInput";
import displayError from "./displayError";
function livingInput(e, setErrors, password = {}) {
  const name = e.target.name;
  if (name === "confirmPassword") {
    const isvalid = e.target.value === password.value;
    displayError(setErrors, name, isvalid);
    return;
  }
  const isvalid = validInput(e.target.value, name);
  displayError(setErrors, name, isvalid);
}
export { livingInput };
