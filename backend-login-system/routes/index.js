import express, { json } from 'express';
import userRoutes from './userRoutes.js';
import verificationRoutes from './verificationRoutes.js';
import emailRoutes from './emailRoutes.js';

const ROUTER = express.Router();

ROUTER.use(json());
ROUTER.use('/user', userRoutes); 
ROUTER.use('/verification', verificationRoutes);
ROUTER.use('/email', emailRoutes);

export default ROUTER;