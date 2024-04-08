import express from 'express';
import { generateVerificationToken, doesTokenExist } from '../controllers/authController.js';
import VerificationTokenModel from '../models/verificationTokenModel.js';

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

ROUTER.get('/verify/:id', async (req, res) => {
    const VERIFICATION_ID = req.params.id;
    if (!VERIFICATION_ID) {    
        return res.status(400).send('Bad Request');
    }

    try {
        const DELETED_TOKEN = await VerificationTokenModel.findOneAndDelete({ id: VERIFICATION_ID });

        if (!DELETED_TOKEN) {
            return res.status(404).send('Verification token not found');
        }

        return res.redirect('/login');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default ROUTER;