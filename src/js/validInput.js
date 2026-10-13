import {
  fullnameRegex,
  emailRegex,
  passwordRegex,
  nameRegex,
  subjectRegex,
} from "./regex.js";
const regexOBj = {
  fullName: fullnameRegex,
  email: emailRegex,
  password: passwordRegex,
  name: nameRegex,
  subject: subjectRegex,
};

function validInput(value, name = "") {
  return regexOBj[name].test(value.trim());
}
export default validInput;
