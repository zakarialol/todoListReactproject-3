import {
  hasUppercase,
  hasEnoughCharacters,
  hasSpecialCharacter,
} from "./regex";
function validPasswordCondition(password, setErrors) {
  setErrors((prev) => ({
    ...prev,
    password: {
      ...prev.password,
      passwordCon: {
        ...prev.password.passwordCon,
        upperCase: hasUppercase.test(password),
        specialCaracter: hasSpecialCharacter.test(password),
        moreThanEightLetters: hasEnoughCharacters.test(password),
      },
    },
  }));
}
export default validPasswordCondition;
