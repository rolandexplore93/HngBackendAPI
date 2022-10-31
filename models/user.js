const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    slackUsername: {
        type: String,
        required: true,
        unique: true
    },
    backend: {
        type: Boolean,
        default: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User