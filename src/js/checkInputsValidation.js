import { emailRegex, passwordRegex } from "./regex";
function validEmail(email) {
  return emailRegex.test(email);
}
function validPassword(password) {
  return passwordRegex.test(password);
}

export { validEmail, validPassword };
