const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const app = express();

//自定义路由模块
var user = require('./routers/user.js');
var product = require('./routers/product.js');
var news = require('./routers/news.js');
var cars = require('./routers/car.js');
var infos = require('./routers/infos.js');

app.use('/', express.static('views/img'));
app.use(expressSession({ secret: 'password', resave: false, saveUninitialized: false }));
//post中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/tea", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("连接成功");
});


//注册路由
app.use('/user', user);
app.use('/news', news);
app.use('/product', product);
app.use('/car', cars);
app.use('/infos', infos);

app.listen(80, function () {
    console.log('express-server is listening 9999.....');
});
