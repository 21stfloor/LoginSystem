import { isPasswordValid } from './authController.js';
import { doesUserExist } from './userController.js';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const NUMBER_REGEX = /\d/;
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const LEAST_YEAR = 1900;

function isValidEmail(email) {
    if (!email) {
        return false;
    }
  
    if (!EMAIL_REGEX.test(email)) {
        return false;
    }
    
    return true;
}

function doesNotContainNumbers(str) {
    return !NUMBER_REGEX.test(str);
}

function isValidDate(dateString) {
    let maxDaysPerMonth = {
        1: 31,  // January
        2: 28,  // February (considering non-leap years by default)
        3: 31,  // March
        4: 30,  // April
        5: 31,  // May
        6: 30,  // June
        7: 31,  // July
        8: 31,  // August
        9: 30,  // September
        10: 31, // October
        11: 30, // November
        12: 31  // December
    };

    if (!DATE_FORMAT_REGEX.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDaysPerMonth[2] = 29;
    }

    return year >= LEAST_YEAR && month >= 1 && month <= 12 && day >= 1 && day <= maxDaysPerMonth[month];
}

function isNotFutureDate(dateString) {
    const currentYear = new Date().getFullYear();
    return isValidDate(dateString) && parseInt(dateString.substring(0, 4)) <= currentYear;
}

function isValidGender(gender) {
    return gender === 'Male' || gender === 'Female';
}
  
function isSamePassword(password, confirmPassword) {
    return password === confirmPassword;
}
  
function getRegistrationValidationRules(req) {    
    return [
        { field: 'email', type: 'string', required: true, validator: isValidEmail, asyncValidator: doesUserExist },
        { field: 'firstName', type: 'string', required: true, validator: doesNotContainNumbers },
        { field: 'lastName', type: 'string', required: true, validator: doesNotContainNumbers },
        { field: 'birthday', type: 'string', required: true, validator: isNotFutureDate },
        { field: 'gender', type: 'string', required: true, validator: isValidGender },
        { field: 'password', type: 'string', required: true, validator: isPasswordValid },
        { field: 'confirmPassword', type: 'string', required: true, validator: (value) => isSamePassword(req.body.password, value)}
    ];
}

export { getRegistrationValidationRules }