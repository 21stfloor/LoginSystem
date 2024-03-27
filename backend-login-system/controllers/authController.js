import commonPasswords from 'common-password-checker';//TODO: Look for more updated third-party dependency for future support

function isCommonPassword(password) {
  return commonPasswords(password);
}

function isPasswordValid(password) {
  const MINIMUM_LENGTH = 8;
  if (password.length < MINIMUM_LENGTH) {
    return false;
  }

  if (isCommonPassword(password)) {
    return false;
  }

  if (!containsNumbers(password)) {
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

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!email) {
    throw new Error('Email is required'); // Or return false with an error message
  }

  if (!emailRegex.test(email)) {
    return false;
  }
  
  return true;
}

function containsNumbers(str) {
  const numberRegex = /\d/;
  return numberRegex.test(str);
}

function isFutureDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day) > new Date();
}

function isValidGender(gender) {
  return gender === 'Male' || gender === 'Female';
}

function isSamePassword(password, confirmPassword) {
  return password === confirmPassword;
}

export { isPasswordValid, isValidEmail, containsNumbers, isFutureDate, isValidGender, isSamePassword };