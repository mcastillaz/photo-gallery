    
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');//Para cifrar ls contraseñas

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);