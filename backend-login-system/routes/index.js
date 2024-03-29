import express, { json } from 'express';
import userRoutes from './userRoutes.js';

const ROUTER = express.Router();

ROUTER.use(json());
ROUTER.use('/user', userRoutes); 

export default ROUTER;