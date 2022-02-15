const mongoose = require("mongoose");

var memberScheme = mongoose.Schema({
    username: String,
    nicheng: String,
    name: String,
    lastname: String,
    myself: String,
    sex: String,
    email: String,
    oldpassword: String,
    newpassword: String,
    passagain: String,
});

var members = mongoose.model("member", memberScheme)

module.exports = members;