import { isValidEmail, containsNumbers, isFutureDate, isValidGender, isPasswordValid, isSamePassword } from './authController.js';
import { doesUserExist } from './userController.js';

function getRegistrationValidationRules(req) {    
    return [
        { field: 'email', type: 'string', required: true, validator: isValidEmail, asyncValidator: doesUserExist },
        { field: 'firstName', type: 'string', required: true, validator: !containsNumbers },
        { field: 'lastName', type: 'string', required: true, validator: !containsNumbers },
        { field: 'birthday', type: 'string', required: true, validator: !isFutureDate },
        { field: 'gender', type: 'string', required: true, validator: isValidGender },
        { field: 'password', type: 'string', required: true, validator: isPasswordValid },
        { field: 'confirmPassword', type: 'string', required: true, validator: (value) => isSamePassword(req.body.password, value)}
    ];
}

export { getRegistrationValidationRules }