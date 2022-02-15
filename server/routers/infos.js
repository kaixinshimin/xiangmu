var express = require("express")
var router = express.Router()
const Members = require('../dbs/member')
const Adresses = require('../dbs/adress')

router.post("/member", (req, res) => {
    const {
        username,
        ...msg
    } = req.body
    Members.findOneAndUpdate({
        username: username
    }, req.body, {
        new: true
    }).then((e) => {
        res.status(200).json({
            code: 0,
            msg: '修改成功',
        });
    })
})
router.post("/getadress", async (req, res) => {
    const {
        username,
        phone,
        name,
        adress,
        adressname
    } = req.body.useradress;
    const newadress = new Adresses({
        username,
        phone,
        name,
        adress,
        adressname
    })
    newadress.save().then((e) => {
        res.status(200).json({
            code: 0,
            msg: e
        });
    })
})


router.post("/getmember", (req, res) => {
    Members.findOne({
        username: req.body.name
    }, (error, user) => {
        if (error) {
            res.status(200).json({
                code: -1,
                msg: error.message,
            });
            return;
        } else if (user) {
            res.status(200).json({
                code: 0,
                msg: user,
            });
        } else {
            const data = {
                username: req.body.name,
                nicheng: '',
                name: '',
                lastname: '',
                myself: '',
                sex: '',
                email: req.body.emails,
                oldpassword: '',
                newpassword: '',
                passagain: ''
            }
            const aa = new Members(data)
            aa.save().then((e) => {
                res.status(200).json({
                    code: 0,
                    msg: e
                });
            })
        }
    });
})
router.get('/city', (req, res) => {
    res.json(city)
})
router.get('/adress', (req, res) => {
    if (req.session.user) {
        Adresses.find().then((e) => {
            res.status(200).json({
                code: 0,
                msg: e
            });
        })
    }else{
        res.status(200).json({
            code: -1,
            msg: '未登录'
        });
    }
})

router.post('/delete', (req, res) => {
    Adresses.findByIdAndDelete(req.body.id).then(() => {
        res.status(200).json({
            code: 0,
            msg: ''
        });
    }, (err) => {
        res.status(200).json({
            code: -1,
            msg: err
        });
    })
})


module.exports = router