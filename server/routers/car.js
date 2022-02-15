const express = require('express');
const Car = require("../dbs/car")
const Order = require("../dbs/order")
var router = express.Router();

router.get('/cars', async (req, res) => {
  if (req.session.user) {
    var result = await Car.findOne({
      username: req.session.user.username
    }).then((e) => {
      let carlistarr = e.prolist
      res.status(200).json({
        code: 0,
        cardata: carlistarr
      })
    });
  } else {
    res.status(200).json({
      code: -1
    })
  }

});

router.post("/detele", async (req, res) => {
  let newlist = []
  Car.findOne({
    username: req.session.user.username
  }).then((e) => {
    e.prolist.map((item) => {
      if (item.id != req.body.id) {
        newlist.push(item)
      }
    })
    Car.findOneAndUpdate({ username: e.username }, { $set: { prolist: newlist } }).then((c) => {
      res.status(200).json({
        code: 0,
        message: "成功",
      });
    })
  })
})

router.post('/add', async (req, res) => {
  if (req.session.user) {
    Car.findOne({
      username: req.session.user.username
    }).then((e) => {
      if (e) {
        let a = 0
        e.prolist.map((item) => {
          if (item.id == req.body.id) {
            item.num += req.body.num;
            a++
            return
          }
        })
        if (a == 0) {
          e.prolist.push(req.body)
        }
        Car.findOneAndUpdate({ username: e.username }, { $set: { prolist: e.prolist } }).then((c) => {
          res.status(200).json({
            code: 0,
            message: "成功",
          });
        })
      } else {
        const data = new Car({
          username: req.session.user.username,
          prolist: [req.body]
        })
        data.save()
        res.status(200).json({
          code: 0,
          message: "成功",
        });
      }
    })
  } else {
    res.status(200).json({
      code: -1,
      message: "未登录",
    });
  }

})

router.post('/buy', (req, res) => {
  if (req.session.user) {
    console.log(req.body)
    const data = new Order(req.body)
    data.save().then(() => {
      res.status(200).json({
        code: 0,
        message: "购买成功",
      });
    })
  } else {
    res.status(200).json({
      code: -1,
      message: "未登录",
    });
  }
})
router.post('/getbuydata',(req,res)=>{
  if(req.session.user){
    Order.find({username:req.session.user.username}).then((user)=>{
    	console.log(user)
      res.status(200).json({
        code: 0,
        msg: user,
      });
    })
  }else{
  	res.status(200).json({
        code: -1,
        msg: 'xx',
      });
  }
})
router.post('/deleteCar',(req,res)=>{
  if(req.session.user){
    Car.findOneAndUpdate({ username: req.session.user.username }, { $set: { prolist: [] } }).then((c) => {
      res.status(200).json({
        code: 0,
        message: "成功",
      });
    })
  }
})

module.exports = router