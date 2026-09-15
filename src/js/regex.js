const fullnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})(?=.*(?:\d|[^A-Za-z\d])).*$/;
const hasUppercase = /[A-Z]/;
const hasEnoughCharacters = /.{8,}/;
const hasSpecialCharacter = /[^A-Za-z0-9]/;

export {
  fullnameRegex,
  emailRegex,
  passwordRegex,
  hasUppercase,
  hasEnoughCharacters,
  hasSpecialCharacter,
};
