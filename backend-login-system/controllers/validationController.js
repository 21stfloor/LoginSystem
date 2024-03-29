import { isPasswordValid } from './authController.js';
import { doesUserExist } from './userController.js';

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

function doesNotContainNumbers(str) {
    const numberRegex = /\d/;
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