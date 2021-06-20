var express = require('express');
var router = express.Router();

const mysql = require('../db/index')

var { Result } = require('../db/Result')

router.get('/GetUserInfo', function(req, res, next) {
    const id = req.query.id
    mysql.EXECUTE("SELECT * FROM `user` where id = ?", id).then(result => {
        res.status(200)
        res.json(new Result({ data: result[0] }))
    })
});

router.get('/GetTableData', function(req, res, next) {
    const currentPage = Number(req.query.currentPage)
    const size = Number(req.query.size)
    const key = req.query.key
    const Ekey = '%' + key + '%'
    if (key){
        mysql.EXECUTE("select * from `user` where name like ? limit ?, ?", [Ekey, (currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT COUNT(id) FROM ( select * from `user` where name like ? ) as newSearch", [Ekey]).then(countResult => {
                res.json(new Result({
                    data: {
                        data: result,
                        total: countResult[0].count,
                        currentPage: currentPage,
                        size: size
                    }
                }))
            })
        })
    }else{
        mysql.EXECUTE("SELECT *,date_format(date, '%Y-%m-%d %H:%i:%s') as date FROM `user` limit ?, ?", [(currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT count(id) as count FROM `user`").then(countResult => {
                res.json(new Result({
                    data: {
                        data: result,
                        total: countResult[0].count,
                        currentPage: currentPage,
                        size: size
                    }
                }))
            })
        })
    }
});

router.post('/Save', function (req, res, next) {
    console.log(req.body)
    const name = req.body.name
    const date = req.body.date
    const message = req.body.message
    const type = req.body.type
    const place = req.body.place
    const level = req.body.level
    const phone = req.body.phone
    mysql.EXECUTE("INSERT INTO `user` ( id, name, level, phone, date, place, type, message ) VALUES (round(rand(1000000), 0), ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'), ?, ?, ?)", [name, level, phone, date, place, type, message]).then(result => {
        console.log(result)
        if (result.affectedRows === 1){
            res.json(new Result({
                code: 1,
                msg: '操作成功'
            }))
        }else{
            res.json(new Result({
                code: 0,
                msg: '操作失败'
            }))
        }
    })
})

router.post('/Update', function (req, res, next) {
    const id = req.body.id
    const name = req.body.name
    const date = req.body.date
    const message = req.body.message
    const type = req.body.type
    const place = req.body.place
    const level = req.body.level
    const phone = req.body.phone
    mysql.EXECUTE("UPDATE `user` SET name = ?, level = ?, phone = ?, date = ?, place = ?, type = ?, message = ? WHERE id = ?", [name, level, phone, date, place, type, message, id]).then(result => {
        if (result.affectedRows === 1){
            res.json(new Result({
                code: 1,
                msg: '操作成功'
            }))
        }else{
            res.json(new Result({
                code: 0,
                msg: '操作失败'
            }))
        }
    })
})

router.post('/Delete', function (req, res, next) {
    const id = req.body.id
    mysql.EXECUTE("DELETE FROM `user` WHERE id = ?", [id]).then(result => {
        console.log(result)
        if (result.affectedRows === 1){
            res.json(new Result({
                code: 1,
                msg: '操作成功'
            }))
        }else{
            res.json(new Result({
                code: 0,
                msg: '操作失败'
            }))
        }
    })
})

router.get('/Map', function (req ,res,next) {
    mysql.EXECUTE('SELECT place as name,count(id) as value FROM `user` GROUP BY place').then(result => {
        res.json(new Result({
            code: 1,
            msg: '操作成功',
            data: result
        }))
    })
})

module.exports = router;