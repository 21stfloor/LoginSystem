import User from '../models/userModel.js';

async function doesUserExist(email) {
    try {
        const user = await User.findOne({ email });
        return user != null;
    } catch (err) {
        throw new Error(err.message);
    }
}


export {doesUserExist};