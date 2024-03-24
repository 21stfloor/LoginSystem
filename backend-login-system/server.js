import express from 'express';
import mongoose from 'mongoose';
import json from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

mongoose.connect(mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(json());

import { isCommonPassword } from './routes/users.js';

app.listen(port, async () =>  {
  console.log(`Server Started at port: ${port}`);
  console.log(await isCommonPassword('password'));
  console.log(await isCommonPassword('password123'));
  console.log(await isCommonPassword('password123!'));
  console.log(await isCommonPassword('password123!@#'));
});
