import User from '../models/user.js';
import commonPasswords from 'common-password-checker';

async function doesUserExist(email) {
    try {
        const user = await User.findOne({ email });
        return user != null;
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function isCommonPassword(password) {
    if (await commonPasswords(password)) {
        return res.status(400).json({ message: 'Password is too common' });
    }
}

export {doesUserExist, isCommonPassword};