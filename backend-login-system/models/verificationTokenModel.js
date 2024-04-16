import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VERIFICATION_TOKEN_SCHEMA = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export default model('VerificationToken', VERIFICATION_TOKEN_SCHEMA, 'VerificationTokens');
