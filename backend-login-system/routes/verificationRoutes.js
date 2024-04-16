import express from 'express';
import VerificationToken from '../models/verificationTokenModel.js';

const ROUTER = express.Router();

ROUTER.get('/verify/:id', async (req, res) => {
    const VERIFICATION_ID = req.params.id;
    if (!VERIFICATION_ID) {    
        return res.status(400).send('Bad Request');
    }

    try {
        const DELETED_TOKEN = await VerificationToken.findOneAndDelete({ _id: VERIFICATION_ID });

        if (!DELETED_TOKEN) {
            return res.status(404).send('Verification token not found');
        }

        return res.redirect('/login');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default ROUTER;