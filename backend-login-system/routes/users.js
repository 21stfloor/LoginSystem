import User from '../models/user.js';
import commonPasswords from 'common-password-checker';

async function doesUserExist(email) {
    try {
        const user = await User.findOne({ email });
        return user != null;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function isCommonPassword(password) {
    return await commonPasswords(password);
}

export {doesUserExist, isCommonPassword};