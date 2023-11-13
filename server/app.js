require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');

// express
const app = express();
app.use(express.json());

// routes
app.use('/api/v1/', user);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
