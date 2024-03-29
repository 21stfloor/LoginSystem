import { isPasswordValid } from './authController.js';
import { doesUserExist } from './userController.js';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const numberRegex = /\d/;

function isValidEmail(email) {
  
    if (!email) {
        return false;
    }
  
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}

function doesNotContainNumbers(str) {
    return !numberRegex.test(str);
}

function isNotFutureDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day) < new Date();
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