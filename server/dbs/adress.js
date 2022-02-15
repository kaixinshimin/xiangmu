const mongoose = require("mongoose");

var adressScheme = mongoose.Schema({
    adress: String,
    name: String,
    phone: String,
    username: String,
    adressname:String
});

var Adresses = mongoose.model("adress", adressScheme)

module.exports = Adresses;