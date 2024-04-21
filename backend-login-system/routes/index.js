import express, { json } from 'express';
import userRoutes from './userRoutes.js';
import verificationRoutes from './verificationRoutes.js';

const ROUTER = express.Router();

ROUTER.use(json());
ROUTER.use('/user', userRoutes);
ROUTER.use('/verification', verificationRoutes);

export default ROUTER;