import express from 'express';
import { getRegistrationValidationRules } from '../controllers/validationController.js';
import { doesUserExist } from '../controllers/userController.js';
import User from '../models/userModel.js';

const ROUTER = express.Router();

ROUTER.post('/validate-registration', async (req, res) => {
    const validationRules = getRegistrationValidationRules(req);
    let hasErrors = false;
    const errors = {};

    for (const rule of validationRules) {
        if (rule.required && !req.body[rule.field]) {
            errors[rule.field] = `${rule.field} is required`;
            hasErrors = true;
            continue;
        }
        if (rule.type !== typeof req.body[rule.field]) {
            errors[rule.field] = `Invalid type for ${rule.field}`;
            hasErrors = true;
            continue;
        }
        if (rule.validator && !rule.validator(req.body[rule.field])) {
            errors[rule.field] = `Invalid ${rule.field}`;
            hasErrors = true;
        }
        if (rule.asyncValidator) {
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

ROUTER.post('/register', async (req, res) => {
    const USER_EXISTS = await doesUserExist(req.body.email);
    if (USER_EXISTS) {
        return res.status(400).json({ error: 'User already exists' });
    } else {
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(200).json({ message: 'Success' });
    }
});

export default ROUTER;