import express, { json } from 'express';
import userRoutes from './userRoutes.js';
const router = express.Router();

router.use(json());
router.use('/user', userRoutes); 

export default router;