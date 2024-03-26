import express, { json } from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';

router.use(json());
router.use('/user', userRoutes); 

export default router;