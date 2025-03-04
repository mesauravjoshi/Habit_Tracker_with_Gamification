const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Unique username
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;