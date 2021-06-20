var express = require('express');
var router = express.Router();
var async = require('async')
const mysql = require('../db/index')

var { Result } = require('../db/Result')

router.get('/GetTableData', function(req, res, next) {
    const currentPage = Number(req.query.currentPage)
    const size = Number(req.query.size)
    const key = req.query.key
    const Ekey = '%' + key + '%'
    if (key){
        mysql.EXECUTE("SELECT * FROM (SELECT CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images,goods.id,goods.name,goods.CCY,goods.price,goods.type,goods.origin_type,COALESCE(support.id,factory.id) AS origin_id,COALESCE(support.name,factory.name) AS origin_name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',store.id,'\"'),CONCAT(',\"name\":\"',store.`name`,'\"'),CONCAT(',\"count\":\"',good_store.count,'\"}')),']') AS store FROM goods LEFT JOIN factory ON factory.id = goods.origin_id LEFT JOIN support ON support.id = goods.origin_id JOIN good_store ON goods.id = good_store.goodID JOIN store ON store.id = good_store.storeID JOIN image ON image.goodID = goods.id GROUP BY goods.id) as g where name like ? limit ?, ?", [Ekey, (currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE(
                "SELECT * FROM (SELECT CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images,goods.id,goods.name,goods.CCY,goods.price,goods.type,goods.origin_type,COALESCE(support.id,factory.id) AS origin_id,COALESCE(support.name,factory.name) AS origin_name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',store.id,'\"'),CONCAT(',\"name\":\"',store.`name`,'\"'),CONCAT(',\"count\":\"',good_store.count,'\"}')),']') AS store FROM goods LEFT JOIN factory ON factory.id = goods.origin_id LEFT JOIN support ON support.id = goods.origin_id JOIN good_store ON goods.id = good_store.goodID JOIN store ON store.id = good_store.storeID JOIN image ON image.goodID = goods.id GROUP BY goods.id) as g where name like ?",
                [Ekey]).then(countResult => {
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
        mysql.EXECUTE("SELECT CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images,goods.id,goods.name,goods.type,goods.CCY,goods.price,goods.origin_type,COALESCE(support.id,factory.id) AS origin_id,COALESCE(support.name,factory.name) AS origin_name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',store.id,'\"'),CONCAT(',\"name\":\"',store.`name`,'\"'),CONCAT(',\"count\":\"',good_store.count,'\"}')),']') AS store FROM goods LEFT JOIN factory ON factory.id = goods.origin_id LEFT JOIN support ON support.id = goods.origin_id JOIN good_store ON goods.id = good_store.goodID JOIN store ON store.id = good_store.storeID JOIN image ON image.goodID = goods.id GROUP BY goods.id limit ?, ?", [(currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE("SELECT COUNT(id) as count FROM (SELECT CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images,goods.type,goods.id,goods.name,goods.CCY,goods.price,goods.origin_type,COALESCE(support.id,factory.id) AS origin_id,COALESCE(support.name,factory.name) AS origin_name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',store.id,'\"'),CONCAT(',\"name\":\"',store.`name`,'\"'),CONCAT(',\"count\":\"',good_store.count,'\"}')),']') AS store FROM goods LEFT JOIN factory ON factory.id = goods.origin_id LEFT JOIN support ON support.id = goods.origin_id JOIN good_store ON goods.id = good_store.goodID JOIN store ON store.id = good_store.storeID JOIN image ON image.goodID = goods.id GROUP BY goods.id) as new").then(countResult => {
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

router.get('/GetTableDataByType', function(req, res, next) {
    const key = req.query.key
    mysql.EXECUTE("SELECT * FROM (SELECT CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images,goods.id,goods.name,goods.CCY,goods.price,goods.type,goods.origin_type,COALESCE(support.id,factory.id) AS origin_id,COALESCE(support.name,factory.name) AS origin_name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',store.id,'\"'),CONCAT(',\"name\":\"',store.`name`,'\"'),CONCAT(',\"count\":\"',good_store.count,'\"}')),']') AS store FROM goods LEFT JOIN factory ON factory.id = goods.origin_id LEFT JOIN support ON support.id = goods.origin_id JOIN good_store ON goods.id = good_store.goodID JOIN store ON store.id = good_store.storeID JOIN image ON image.goodID = goods.id GROUP BY goods.id) as g WHERE type = ?", [key]).then(result => {
        res.json(new Result({
            data: result
        }))
    })
});

router.post('/Save', function (req, res, next) {
    const name = req.body.name
    const price = req.body.price
    const CCY = req.body.CCY
    const origin_type = req.body.origin_type
    const origin_id = req.body.origin_id
    const store = req.body.store
    const images = req.body.images
    const type = req.body.type
    mysql.EXECUTE("INSERT INTO `goods` ( name, price, CCY, origin_id, origin_type, type ) VALUES (?, ?, ?, ?, ?, ?)",
        [name, price, CCY, origin_id, origin_type, type]).then(result => {
        if (result.affectedRows < 1){
            res.json(new Result({
                code: 0,
                msg: '操作失败'
            }))
        }
        mysql.EXECUTE("SELECT MAX(id) as newID FROM goods").then(NEWGOOD => {
            const goodID = NEWGOOD[0].newID
            if (!goodID) {
                res.json(new Result({
                    code: 0,
                    msg: '操作失败'
                }))
            }
            async.map(store, function (item, callback) {
                mysql.EXECUTE("INSERT INTO `good_store` ( goodID, storeID, count ) VALUES (? ,? ,?)",[goodID, item.id, item.count]).then(result => {
                    if (result.affectedRows < 1) {
                        res.json(new Result({
                            code: 0,
                            msg: '操作失败'
                        }))
                    }
                    callback(null, result)
                })
            },function (err, results) {
                console.log(results)
            })
            async.map(images, function (item, callback) {
                mysql.EXECUTE("INSERT INTO `image` ( goodID, url ) VALUES (? ,?)",[goodID, item]).then(result => {
                    if (result.affectedRows < 1) {
                        res.json(new Result({
                            code: 0,
                            msg: '操作失败'
                        }))
                    }
                    callback(null, result)
                })
            },function (err, results) {
                res.json(new Result({
                    code: 1,
                    msg: '操作成功'
                }))
            })
        })
    })
})

router.post('/Update', function (req, res, next) {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const CCY = req.body.CCY
    const origin_type = req.body.origin_type
    const origin_id = req.body.origin_id
    const store = req.body.store
    const images = req.body.images
    const type = req.body.type
    mysql.EXECUTE("UPDATE `goods` SET name = ?, price = ?, CCY = ?, origin_type = ?, origin_id = ?, type = ? WHERE id = ?",
        [name, price, CCY, origin_type, origin_id, type, id]).then(() => {
        mysql.EXECUTE("DELETE FROM good_store WHERE goodID = ?", [id]).then(() => {
            async.map(store, function (item, callback) {
                mysql.EXECUTE("INSERT INTO `good_store` ( goodID, storeID, count ) VALUES (? ,? ,?)", [id, item.id, item.count]).then(result => {
                    if (result.affectedRows < 1) {
                        res.json(new Result({
                            code: 0,
                            msg: '操作失败'
                        }))
                    }
                    callback(null, result)
                })
            },function (err, results) {
                console.log(results)
            })
        })
        mysql.EXECUTE("DELETE FROM image WHERE goodID = ?", [id]).then(() => {
            async.map(images, function (item, callback) {
                mysql.EXECUTE("INSERT INTO `image` ( goodID, url ) VALUES (? ,?)", [id, item]).then(result => {
                    if (result.affectedRows < 1) {
                        res.json(new Result({
                            code: 0,
                            msg: '操作失败'
                        }))
                    }
                    callback(null, result)
                })
            },function (err, results) {
                res.json(new Result({
                    code: 1,
                    msg: '操作成功'
                }))
            })
        })
    })
})

router.post('/Delete', function (req, res, next) {
    const id = req.body.id
    mysql.EXECUTE("DELETE FROM `goods` WHERE id = ?", [id]).then(result => {
        console.log(result)
        if (result.affectedRows === 1){
            res.json(new Result({
                code: 1,
                msg: '操作成功'
            }))
        }else{
            res.json(new Result({
                code: 0,
                msg: '操作失败',
            }))
        }
    })
})

router.get('/Map', function (req ,res,next) {
    mysql.EXECUTE('SELECT place as name,count(id) as value FROM `customers` GROUP BY place').then(result => {
        res.json(new Result({
            code: 1,
            msg: '操作成功',
            data: result
        }))
    })
})

module.exports = router;
