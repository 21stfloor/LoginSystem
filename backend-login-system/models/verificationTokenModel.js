import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const verificationTokenSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export default model('VerificationToken', verificationTokenSchema, 'VerificationToken');
