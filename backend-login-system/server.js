import express from 'express';
import mongoose from 'mongoose';
import json from 'express';
import dotenv from 'dotenv';
import index from './routes/index.js';

dotenv.config();

const APP = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

mongoose.connect(MONGO_URI);
const DB = mongoose.connection;
DB.on('error', (error) => console.error(error));
DB.once('open', () => console.log('Connected to Database'));

APP.use(json());

APP.use('/', index);

APP.listen(PORT, async () =>  {
  console.log(`Server Started at port: ${PORT}`);
});
