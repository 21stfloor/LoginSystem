import express from 'express';
import { generateVerificationToken, doesTokenExist } from '../controllers/authController.js';

const ROUTER = express.Router();

ROUTER.post('/create-token', async (req, res) => {
    const EMAIL = req.body.email;
    const TOKEN_EXISTS = await doesTokenExist(EMAIL);
    if (TOKEN_EXISTS) {
        return res.status(400).json({ error: 'Token already exists' });
    } else {
        const token = generateVerificationToken();
        return res.status(200).json({ message: "Success", token });
    }
});

export default ROUTER;