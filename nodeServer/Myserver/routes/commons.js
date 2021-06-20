var express = require('express');
var router = express.Router();

const mysql = require('../db/index')

var { Result } = require('../db/Result')

router.get('/GetMessages', function(req, res, next) {
    mysql.EXECUTE("SELECT *,date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime FROM `commons`").then(result => {
        res.status(200)
        res.json(new Result({ data: result }))
    })
});

router.get('/GetDetail', function(req, res, next) {
    const id = req.query.id
    console.log(id)
    mysql.EXECUTE("SELECT *,date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime FROM `commons` WHERE id = ?",[id]).then(result => {
        res.status(200)
        res.json(new Result({ data: result }))
    })
});

router.get('/GetTableData', function(req, res, next) {
    const currentPage = Number(req.query.currentPage)
    const size = Number(req.query.size)
    const key = req.query.key
    const Ekey = '%' + key + '%'
    if (key){
        mysql.EXECUTE("select *,date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime from `commons` where detail like ? limit ?, ?", [Ekey, (currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT COUNT(id) FROM ( select * from `commons` where detail like ? ) as newSearch", [Ekey]).then(countResult => {
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
        mysql.EXECUTE("SELECT *,date_format(datetime, '%Y-%m-%d %H:%i:%s') as datetime FROM `commons` limit ?, ?", [(currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT count(id) as count FROM `commons`").then(countResult => {
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
    const title = req.body.title
    const detail = req.body.detail
    mysql.EXECUTE("INSERT INTO `commons` ( title, detail ) VALUES (?, ?)", [title, detail]).then(result => {
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
    const title = req.body.title
    const detail = req.body.detail
    mysql.EXECUTE("UPDATE `commons` SET title = ?, detail = ? WHERE id = ?", [title, detail, id]).then(result => {
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
    mysql.EXECUTE("DELETE FROM `commons` WHERE id = ?", [id]).then(result => {
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

module.exports = router;
