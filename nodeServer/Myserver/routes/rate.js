var express = require('express');
var router = express.Router();

var { Result } = require('../db/Result')

const axios = require('axios')
const qs = require('qs')

router.get('/getRate', function (req, res, next) {
    const scur = req.query.scur
    const tcur = req.query.tcur
    axios.get('http://api.k780.com/',{
        params: {
            app: 'finance.rate',
            scur: scur,
            tcur: tcur,
            appkey: 10003,
            sign: 'b59bc3ef6191eb9f747dd4e83c99f2a4'
        }
    }).then(result => {
        res.json(new Result({
            data: result
        }))
    })
})

module.exports = router;