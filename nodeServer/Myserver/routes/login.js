const jwt  = require('jsonwebtoken');
const { PWD,TOKEN_KEY,TIME } = require('../secret')

var express = require('express');
var router = express.Router();

const mysql = require('../db/index')

var { Result } = require('../db/Result')

router.post('/login', function(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    try{
        //和数据库对比
        mysql.EXECUTE('select * from `user` where username = ? and password = ?',[username,password]).then(result => {
            if(!result || result.length===0){
                res.json( new Result({
                    code: 1,
                    msg: '账号或者密码错误'
                }) )
            }else{
                const  token = jwt.sign({username},TOKEN_KEY,{expiresIn:TIME})

                res.json( new Result({
                    code: 0,
                    msg: '登录成功',
                    data: {
                        data: result[0],
                        token: token
                    },
                }) )
            }
        })
    }catch(e){
        console.log(e)
    }
});

router.post('/customerLogin', function(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    try{
        //和数据库对比
        mysql.EXECUTE('select * from `customers` where name = ? and password = ?',[username,password]).then(result => {
            if(!result || result.length===0){
                res.json( new Result({
                    code: 1,
                    msg: '账号或者密码错误'
                }) )
            }else{
                const  token = jwt.sign({username},TOKEN_KEY,{expiresIn:TIME})
                res.json( new Result({
                    code: 0,
                    msg: '登录成功',
                    data: {
                        data: result[0],
                        token: token
                    },
                }) )
            }
        })
    }catch(e){
        console.log(e)
    }
});

module.exports = router;