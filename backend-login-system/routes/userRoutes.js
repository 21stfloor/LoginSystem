import express from 'express';
const router = express.Router();
import { doesUserExist } from '../controllers/userController.js';
import { isCommonPassword } from '../controllers/authController.js';

function isInvalidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
}

function containsNumbers(str) {
    const numberRegex = /\d/;
    return numberRegex.test(str);
}

function isFutureDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day) > new Date();
}

function isInvalidGender(gender) {
    return gender != 'Male' &&   gender != 'Female';
}

function getValidationRules(req) {    
    return [
        { field: 'email', type: 'string', required: true, invalidator: isInvalidEmail, asyncInvalidator: doesUserExist},
        { field: 'firstName', type: 'string', required: true, invalidator: containsNumbers },
        { field: 'lastName', type: 'string', required: true, invalidator: containsNumbers },
        { field: 'birthday', type: 'string', required: true, invalidator: isFutureDate },
        { field: 'gender', type: 'string', required: true, invalidator: isInvalidGender },
        { field: 'password', type: 'string', required: true, invalidator: isCommonPassword},
        { field: 'confirmPassword', type: 'string', required: true, invalidator: (value) => value !== req.body.password}
    ];
}

router.post('/validate-registration', async (req, res) => {
    const validationRules = getValidationRules(req);

    let hasErrors = false;
    const errors = {};
    for (const rule of validationRules) {
        if (rule.type !== typeof req.body[rule.field]) {
            errors[rule.field] = `Invalid type for ${rule.field}`;
            hasErrors = true;
        }
        if (rule.required && !req.body[rule.field]) {
            errors[rule.field] = `${rule.field} is required`;
            hasErrors = true;
        } 
        if (rule.invalidator && rule.invalidator(req.body[rule.field])) {
            errors[rule.field] = `Invalid ${rule.field}`;
            hasErrors = true;
        }
        if (rule.asyncInvalidator) {
            const isTaken = await rule.asyncInvalidator(req.body[rule.field]);
            if (isTaken) {
                errors[rule.field] = `${rule.field} is already taken or invalid`;
                hasErrors = true;
            }
        }
    }

    if (hasErrors) {
        return res.status(400).json({ message: errors }); // Bad request with errors
    } else {
        return res.status(200).json({ message: 'Registration Validation successful' });
    }
});

export default router;