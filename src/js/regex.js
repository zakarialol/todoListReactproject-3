const fullnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})(?=.*(?:\d|[^A-Za-z\d])).*$/;
const hasUppercase = /[A-Z]/;
const hasEnoughCharacters = /.{8,}/;
const hasSpecialCharacter = /[^A-Za-z0-9]/;
const nameRegex = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;
const subjectRegex = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} .,!?'"()&:/_-]*$/u;

export {
  fullnameRegex,
  emailRegex,
  passwordRegex,
  hasUppercase,
  hasEnoughCharacters,
  hasSpecialCharacter,
  nameRegex,
  subjectRegex,
};
