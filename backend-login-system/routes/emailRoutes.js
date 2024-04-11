import express from 'express';
import nodemailer from 'nodemailer';

const ROUTER = express.Router();
const TRANSPORTER = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    ignoreTLS: false,
    secure: false,
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const EMAIL_VERIFICATION_SUBJECT = 'Complete Your Account Registration - Verify Your Email Address';

ROUTER.post('/send', async (req, res) => {
    let { email, verificationLink, fullName } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if (!verificationLink) {
        return res.status(400).json({ error: 'Verification link is required' });
    }
    if (!fullName) {
        return res.status(400).json({ error: 'Full name is required' });
    }

    const EMAIL_CONTENT = `Dear ${fullName},

    Thank you for signing up with ${process.env.PRODUCT_NAME}! To ensure the security and integrity of your account, we kindly ask you to verify your email address by clicking on the link below:
    
    ${verificationLink}
    
    Once verified, you'll gain full access to all the features and benefits of our platform. If you did not register with us, please ignore this email or contact our support team immediately at ${process.env.EMAIL_USER}.
    
    Thank you for choosing ${process.env.PRODUCT_NAME}. We look forward to serving you!
    
    Best regards,
    21stfloordev`;

    const MAIL_OPTIONS = {
        from: process.env.EMAIL_USER,
        to: email,
        EMAIL_VERIFICATION_SUBJECT,
        TEXT: EMAIL_CONTENT,
    }

    TRANSPORTER.sendMail(MAIL_OPTIONS, function (error, info) {
        if (error) {
            res.status(500).send(error);
        }
        else {
            res.status(200).send('Email was sent successfully');
        }
    });
});

export default ROUTER;