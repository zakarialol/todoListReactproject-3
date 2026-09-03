import { fullnameRegex, emailRegex, passwordRegex } from "./regex.js";
const regexOBj = {
  fullName: fullnameRegex,
  email: emailRegex,
  password: passwordRegex,
};

function validInput(value, name = "") {
  // console.log("valid input *#*");
  return regexOBj[name].test(value);
}
export default validInput;
