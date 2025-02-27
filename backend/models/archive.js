// Archive
const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    habitId: { type: String, required: true, unique: true },
    userId: { type: String, required: true},
});

const Archive = mongoose.model('Archive', archiveSchema);
module.exports = Archive;