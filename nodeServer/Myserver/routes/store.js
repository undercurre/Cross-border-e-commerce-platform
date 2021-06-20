var express = require('express');
var router = express.Router();

const mysql = require('../db/index')

var { Result } = require('../db/Result')

router.get('/GetTableData', function(req, res, next) {
    const currentPage = Number(req.query.currentPage)
    const size = Number(req.query.size)
    const key = req.query.key
    const Ekey = '%' + key + '%'
    if (key){
        mysql.EXECUTE("select * from `store` where name like ? limit ?, ?", [Ekey, (currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT COUNT(id) FROM ( select * from `store` where name like ? ) as newSearch", [Ekey]).then(countResult => {
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
        mysql.EXECUTE("SELECT * FROM `store` limit ?, ?", [(currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT count(id) as count FROM `store`").then(countResult => {
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
    const place = req.body.place
    mysql.EXECUTE("INSERT INTO `store` ( name, place ) VALUES (?, ?)", [name, place]).then(result => {
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
    const place = req.body.place
    mysql.EXECUTE("UPDATE `store` SET name = ?, place = ? WHERE id = ?", [name, place, id]).then(result => {
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
    mysql.EXECUTE("DELETE FROM `store` WHERE id = ?", [id]).then(result => {
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
    mysql.EXECUTE('SELECT place as name,count(id) as value FROM `store` GROUP BY place').then(result => {
        res.json(new Result({
            code: 1,
            msg: '操作成功',
            data: result
        }))
    })
})

module.exports = router;
