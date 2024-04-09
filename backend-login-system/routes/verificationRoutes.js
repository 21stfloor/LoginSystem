import express from 'express';
import mongoose from 'mongoose';
import { generateVerificationToken, doesTokenExist } from '../controllers/authController.js';
import VerificationToken from '../models/verificationTokenModel.js';

const ROUTER = express.Router();

ROUTER.post('/create-token', async (req, res) => {
    const EMAIL = req.body.email;

    const SESSION = await mongoose.startSession();
    SESSION.startTransaction();

    try {
        const USER_EXISTS = await doesUserExist(EMAIL); // Pass session to the function
        if (!USER_EXISTS) {
            await SESSION.abortTransaction();
            await SESSION.endSession();
            return res.status(400).json({ error: 'User does not exist' });
        }
        const TOKEN_EXISTS = await doesTokenExist(EMAIL); // Pass session to the function
        if (TOKEN_EXISTS) {
            await SESSION.abortTransaction();
            await SESSION.endSession();
            return res.status(400).json({ error: 'Token already exists' });
        } else {
            const TOKEN = generateVerificationToken();
            const NEW_TOKEN = new VerificationToken({
                _id: TOKEN,
                email: EMAIL
            });
            await NEW_TOKEN.save({ session: SESSION });
            await SESSION.commitTransaction();
            await SESSION.endSession();
            return res.status(200).json({ message: "Success", token: TOKEN });
        }
    } catch (error) {
        await SESSION.abortTransaction();
        await SESSION.endSession();
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default ROUTER;