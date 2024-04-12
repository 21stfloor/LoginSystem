import VerificationToken from "../models/verificationTokenModel.js";
import { generateVerificationToken } from "./authController.js";

async function doesTokenExist(email) {
    try {
        const TOKEN = await VerificationToken.findOne({ email });
        return TOKEN != null;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createToken(email) {
    if (await doesTokenExist(email)) throw new Error('Token already exists');

    try {
        const TOKEN = generateVerificationToken();
        const NEW_TOKEN = new VerificationToken({
            _id: TOKEN,
            email
        });
        await NEW_TOKEN.save();
        return TOKEN;
    } catch (err) {
        throw new Error(err.message);
    }
}

export { createToken };