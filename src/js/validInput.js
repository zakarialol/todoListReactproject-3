import { fullnameRegex, emailRegex, passwordRegex } from "./regex.js";
const regexOBj = {
  fullName: fullnameRegex,
  email: emailRegex,
  password: passwordRegex,
};

function validInput(value, name = "") {
  return regexOBj[name].test(value.trim());
}
export default validInput;
