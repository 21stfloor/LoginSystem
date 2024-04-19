import commonPasswords from 'common-password-checker';//TODO: Look for more updated third-party dependency for future support
import bcrypt from "bcrypt";

const MINIMUM_PASSWORD_LENGTH = 8;
const SPECIAL_CHARACTERS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const SALT_ROUNDS = 10;

function isCommonPassword(password) {
  return commonPasswords(password);
}

function isPasswordValid(password) {
  if (password.length < MINIMUM_PASSWORD_LENGTH) {
    return false;
  }

  if (isCommonPassword(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!SPECIAL_CHARACTERS.test(password)) {
    return false;
  }

  if (password.toUpperCase() === password || password.toLowerCase() === password) {
    return false;
  }
  
  return true;
}

function hashPassword(rawPassword){
  return bcrypt.hashSync(rawPassword, SALT_ROUNDS);
}

export { isPasswordValid, hashPassword };
