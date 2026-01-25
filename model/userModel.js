const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter the username."]
    },
    email: {
        type: String,
        required: [true, "Please enter user email."],
        unique: [true, "Email address already taken."]
    },
    password: {
        type: String,
        required: [true, "Please enter you password."]
    },
},
{
    timeStamps: true,
});

module.exports = mongoose.model("User", userSchema);