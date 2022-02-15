const mongoose = require("mongoose");

var productScheme = mongoose.Schema({
    name: String,
    sort: String,
    price: Number,
    number: String,
    src: String,
    described: String,
    desSrc: String
});

var product = mongoose.model("product", productScheme)

module.exports = product;