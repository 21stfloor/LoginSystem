import express from 'express';
import mongoose from 'mongoose';
import json from 'express';
import dotenv from 'dotenv';
import index from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(json());

app.use('/', index);

app.listen(port, async () =>  {
  console.log(`Server Started at port: ${port}`);
});
