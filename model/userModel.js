const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the username."]
    },
    email: {
        type: String,
        required: [true, "Please enter user email."]
    },
    password: {
        type: String,
        required: [true, "Please enter you password."]
    },
});

module.exports = mongoose.model("User", userSchema);