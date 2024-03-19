// const envVariables = require('./config');
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV;

mongoose.connect(mongoURI)
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log('Server Started');
});