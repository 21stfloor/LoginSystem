import commonPasswords from 'common-password-checker';//TODO: Look for more updated third-party dependency for future support
import crypto from "crypto";

const MINIMUM_PASSWORD_LENGTH = 8;
const BYTES_NUMBER = 20;
const COMMON_SUBSTITUTIONS = ['4', '3', '1', '0', '5']; 
const COMMON_DIGITS = ['123', '1234', '12345']; 
const COMMON_SPECIAL_CHARACTERS = ['!', '@', '$', '&']; 
const SPECIAL_CHARACTERS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

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

  if (
    COMMON_SUBSTITUTIONS.some(substitution => password.includes(substitution)) ||
    COMMON_DIGITS.some(digit => password.includes(digit)) ||
    COMMON_SPECIAL_CHARACTERS.some(char => password.includes(char))
  ) {
    return false;
  }
  
  return true;
}

function generateVerificationToken() {
  return crypto.randomBytes(BYTES_NUMBER).toString('hex');
}

export { isPasswordValid, generateVerificationToken };
