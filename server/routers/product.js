const express = require('express');
var router = express.Router();
const Product = require('../dbs/product')
const city =require('../views/img/citydata')
router.get('/list', async (req, res) => {
	if(req.query.index){
	    const a=(req.query.index-1)*10
		const list = await Product.find().limit(10).skip(a)
		res.status(200).json({
	        code: 1,
	        msg: list
	    })
	}else{
		const list = await Product.find()
		res.status(200).json({
	        code: 1,
	        msg: list
	    })
	}
    
})
router.get('/citydata',(req, res) => {
    res.send(city)
})
router.get('/detail', async (req, res) => {
    const list = await Product.findOne({ _id: req.query.id })
    res.status(200).json({
        code: 1,
        msg: list
    })
})
router.post('/add', (req, res) => {
    const data = new Product(req.body)
    data.save().then(() => {
        res.status(200).json({
            code: 1,
            msg: '添加成功'
        })
    })
})
router.post('/change', (req, res) => {
    const { _id, __v, ...msg } = req.body
    Product.findByIdAndUpdate(_id, { $set: msg }, { new: true }).then((msg) => {
        res.status(200).json({
            code: 1,
            msg: '修改成功'
        })
    }, (err) => {
        res.status(200).json({
            code: 0,
            msg: err.msg
        })
    })
})
router.post('/delete', (req, res) => {
    Product.deleteOne({ _id: req.body.id }).then(() => {
        res.status(200).json({
            code: 1,
            msg: '删除成功'
        })
    })
})
router.post('/search', async (req, res) => {
    const data = await Product.find({ $or: [{ name: {$regex:req.body.msg} }, { sort: {$regex:req.body.msg} }] })
    if (data.length) {
        res.status(200).json({
            code: 1,
            msg: data
        })
    } else {
        res.status(200).json({
            code: 0,
            msg: '未找到想要搜索的商品'
        })
    }
})


module.exports = router