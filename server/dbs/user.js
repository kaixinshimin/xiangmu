const mongoose = require("mongoose");

var userScheme = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});

var users = mongoose.model("users", userScheme)

module.exports = users;