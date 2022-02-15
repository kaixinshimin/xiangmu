const express = require('express');
var router = express.Router();
const News = require('../dbs/news')
const Xiangq = require('../dbs/xiangq')

router.get('/menu', async (req, res) => {
    News.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                menu: []
            })
        } else {
            res.status(200).json({
                code: 0,
                msg: data
            })
        }
    })
})
router.get('/xiang', async (req, res) => {
    Xiangq.find().then(function (data, err) {
        if (err) {
            res.status(200).json({
                code: -1,
                menu: []
            })
        } else {
            res.status(200).json({
                code: 0,
                msg: data
            })
        }
    })
})


module.exports = router