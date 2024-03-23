import User from '../models/user.js';

async function doesUserExist(email) {
    try {
        const user = await User.findOne({ email });
        return user != null;
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export default doesUserExist;