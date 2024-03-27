import express from 'express';
const router = express.Router();
import { getRegistrationValidationRules } from '../controllers/validationController.js';

router.post('/validate-registration', async (req, res) => {
    const validationRules = getRegistrationValidationRules(req);
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
        if (rule.validator && !rule.validator(req.body[rule.field])) {
            errors[rule.field] = `Invalid ${rule.field}`;
            hasErrors = true;
        }
        if (rule.asyncInvalidator) {
            const isTaken = await rule.asyncValidator(req.body[rule.field]);
            if (isTaken) {
                errors[rule.field] = `${rule.field} is already taken or invalid`;
                hasErrors = true;
            }
        }
    }

    if (hasErrors) {
        return res.status(400).json({ errors: errors });
    } else {
        return res.status(200).json({ message: 'Registration Validation successful' });
    }
});

export default router;