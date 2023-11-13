const mongoose = require('mongoose');
const commonSchema = require('../utils/commonSchema');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 20,
    trim: true,
    required: [true, 'Username is required'],

  },
  email: {
    type: String,
    required: [true, 'Valid email is required'],
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  password: {
    type: String,
    required: [true, 'Password is required, Schema'],
  },
  ...commonSchema,
});

module.exports = mongoose.model('User', userSchema);
