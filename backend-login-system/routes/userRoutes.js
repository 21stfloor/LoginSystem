import express from 'express';
import mongoose from 'mongoose';
import { getRegistrationValidationRules } from '../controllers/validationController.js';
import { doesUserExist } from '../controllers/userController.js';
import User from '../models/userModel.js';
import { hashPassword} from "../controllers/authController.js";

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
    const SESSION = await mongoose.startSession();
    SESSION.startTransaction();

    try {
        const USER_EXISTS = await doesUserExist(req.body.email);
        if (USER_EXISTS) {
            await SESSION.abortTransaction();
            await SESSION.endSession();
            return res.status(400).json({ error: 'User already exists' });
        } else {
            const HASHED_PASSWORD = await hashPassword(req.body.password);
            const NEW_USER = new User({
                ...req.body,
                password: HASHED_PASSWORD
            });
            await NEW_USER.save({ session: SESSION });
            await SESSION.commitTransaction();
            await SESSION.endSession();
            return res.status(200).json({ message: 'Success' });
        }
    } catch (error) {
        await SESSION.abortTransaction();
        await SESSION.endSession();
        return res.status(500).json({ error: error.message });
    }
});

export default ROUTER;