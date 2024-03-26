import commonPasswords from 'common-password-checker';//TODO: Look for more updated third-party dependency for future support

function isCommonPassword(password) {
  return commonPasswords(password);
}

function isPasswordValid(password) {
  if (password.length < 8) {
    return false;
  }

  if (isCommonPassword(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (!specialCharacters.test(password)) {
    return false;
  }

  if (password.toUpperCase() === password || password.toLowerCase() === password) {
    return false;
  }

  const commonSubstitutions = ['4', '3', '1', '0', '5']; 
  const commonDigits = ['123', '1234', '12345']; 
  const commonSpecialCharacters = ['!', '@', '$', '&']; 

  if (
    commonSubstitutions.some(substitution => password.includes(substitution)) ||
    commonDigits.some(digit => password.includes(digit)) ||
    commonSpecialCharacters.some(char => password.includes(char))
  ) {
    return false;
  }
  
  return true;
}

export default { isPasswordValid };