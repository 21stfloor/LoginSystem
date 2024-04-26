import crypto from "crypto";
import VerificationToken from "../models/verificationTokenModel.js";

const BYTES_NUMBER = 20;

async function doesTokenExist(email) {
    try {
        const TOKEN = await VerificationToken.findOne({ email });
        return TOKEN != null;
    } catch (err) {
        throw new Error(err.message);
    }
}

function generateVerificationToken() {
    return crypto.randomBytes(BYTES_NUMBER).toString('hex');
}

export { generateVerificationToken, doesTokenExist };