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
        mysql.EXECUTE("SELECT * FROM(SELECT DATE_FORMAT(orders.createTime,'%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(orders.endTime,'%Y-%m-%d %H:%i:%s') as end_time,orders.*,status,customers.name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',goods.id,'\"'),CONCAT(',\"name\":\"',goods.`name`,'\"'),CONCAT(',\"images\":\',images,'\'),CONCAT(',\"count\":\"',order_good.count,'\"}')),']') AS goodList FROM `orders` JOIN (SELECT * FROM order_process JOIN (SELECT MAX(processID) as newest FROM order_process GROUP BY orderID) as newPro ON newPro.newest = order_process.processID) as new_process ON new_process.orderID = orders.id JOIN customers ON orders.customerID = customers.id LEFT JOIN order_good ON order_good.orderID = orders.id LEFT JOIN (SELECT *,CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images FROM goods JOIN image ON image.goodID = goods.id GROUP BY goodID) as goods ON goods.id = order_good.goodID GROUP BY orders.id) as new where id like ? limit ?, ?", [Ekey, (currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE( "SELECT COUNT(id) as count  FROM (SELECT * FROM(SELECT DATE_FORMAT(orders.createTime,'%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(orders.endTime,'%Y-%m-%d %H:%i:%s') as end_time,orders.*,status,customers.name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',goods.id,'\"'),CONCAT(',\"name\":\"',goods.`name`,'\"'),CONCAT(',\"images\":\',images,'\'),CONCAT(',\"count\":\"',order_good.count,'\"}')),']') AS goodList FROM `orders` JOIN (SELECT * FROM order_process JOIN (SELECT MAX(processID) as newest FROM order_process GROUP BY orderID) as newPro ON newPro.newest = order_process.processID) as new_process ON new_process.orderID = orders.id JOIN customers ON orders.customerID = customers.id LEFT JOIN order_good ON order_good.orderID = orders.id LEFT JOIN (SELECT *,CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images FROM goods JOIN image ON image.goodID = goods.id GROUP BY goodID) as goods ON goods.id = order_good.goodID GROUP BY orders.id) as new where id like ? ) as search", [Ekey]).then(countResult => {
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
        mysql.EXECUTE("SELECT * FROM(SELECT DATE_FORMAT(orders.createTime,'%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(orders.endTime,'%Y-%m-%d %H:%i:%s') as end_time,orders.*,status,customers.name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',goods.id,'\"'),CONCAT(',\"name\":\"',goods.`name`,'\"'),CONCAT(',\"images\":\',images,'\'),CONCAT(',\"count\":\"',order_good.count,'\"}')),']') AS goodList FROM `orders` JOIN (SELECT * FROM order_process JOIN (SELECT MAX(processID) as newest FROM order_process GROUP BY orderID) as newPro ON newPro.newest = order_process.processID) as new_process ON new_process.orderID = orders.id JOIN customers ON orders.customerID = customers.id LEFT JOIN order_good ON order_good.orderID = orders.id LEFT JOIN (SELECT *,CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images FROM goods JOIN image ON image.goodID = goods.id GROUP BY goodID) as goods ON goods.id = order_good.goodID GROUP BY orders.id) as new limit ?, ?", [(currentPage - 1) * size, size]).then(result => {
            mysql.EXECUTE(" SELECT COUNT(id) as count  FROM (SELECT * FROM(SELECT DATE_FORMAT(orders.createTime,'%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(orders.endTime,'%Y-%m-%d %H:%i:%s') as end_time,orders.*,status,customers.name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',goods.id,'\"'),CONCAT(',\"name\":\"',goods.`name`,'\"'),CONCAT(',\"images\":\',images,'\'),CONCAT(',\"count\":\"',order_good.count,'\"}')),']') AS goodList FROM `orders` JOIN (SELECT * FROM order_process JOIN (SELECT MAX(processID) as newest FROM order_process GROUP BY orderID) as newPro ON newPro.newest = order_process.processID) as new_process ON new_process.orderID = orders.id JOIN customers ON orders.customerID = customers.id LEFT JOIN order_good ON order_good.orderID = orders.id LEFT JOIN (SELECT *,CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images FROM goods JOIN image ON image.goodID = goods.id GROUP BY goodID) as goods ON goods.id = order_good.goodID GROUP BY orders.id) as new)  as newSearch").then(countResult => {
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

router.get('/GetTableDataByCustomer', function(req, res, next) {
    const key = req.query.key
    const Ekey = '%' + key + '%'
        mysql.EXECUTE("SELECT * FROM(SELECT DATE_FORMAT(orders.createTime,'%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(orders.endTime,'%Y-%m-%d %H:%i:%s') as end_time,orders.*,status,customers.name,CONCAT('[',GROUP_CONCAT(CONCAT('{\"id\":\"',goods.id,'\"'),CONCAT(',\"name\":\"',goods.`name`,'\"'),CONCAT(',\"images\":\',images,'\'),CONCAT(',\"count\":\"',order_good.count,'\"}')),']') AS goodList FROM `orders` JOIN (SELECT * FROM order_process JOIN (SELECT MAX(processID) as newest FROM order_process GROUP BY orderID) as newPro ON newPro.newest = order_process.processID) as new_process ON new_process.orderID = orders.id JOIN customers ON orders.customerID = customers.id LEFT JOIN order_good ON order_good.orderID = orders.id LEFT JOIN (SELECT *,CONCAT('[',GROUP_CONCAT(CONCAT('\"',url,'\"')),']') as images FROM goods JOIN image ON image.goodID = goods.id GROUP BY goodID) as goods ON goods.id = order_good.goodID GROUP BY orders.id) as new where customerId like ?", [Ekey]).then(result => {
                res.json(new Result({
                    data: result
                }))
        })
});


router.post('/Save', function (req, res, next) {
    const customerId = req.body.customerId
    const address = req.body.address
    const place = req.body.place
    const goods = req.body.goodList
    const status = req.body.status
    mysql.EXECUTE("INSERT INTO `orders` ( customerId, address, place ) VALUES (?, ?, ?)",
                    [customerId, address, place]).then( insertOrderResult => {
                        if (insertOrderResult.affectedRows < 1) {
                            return res.json(new Result({
                                code: 0,
                                msg: '操作失败'
                            }))
                        }
        mysql.EXECUTE("SELECT MAX(id) as newID FROM orders").then(getIdResult => {
            const orderID = getIdResult[0].newID
            if (!orderID) {
                return res.json(new Result({
                    code: 0,
                    msg: '操作失败'
                }))
            }
            mysql.EXECUTE("INSERT INTO `order_process` ( orderID, status ) VALUES (?, ?)", [orderID, status]).then(insertProcess => {
                if (insertProcess.affectedRows < 1) {
                    return res.json(new Result({
                        code: 0,
                        msg: '操作失败'
                    }))
                }
                async.map(goods, function (item, callback) {
                    mysql.EXECUTE("INSERT INTO `order_good` ( orderID, goodID, count ) VALUES (? ,? ,?)", [orderID, item.id, item.count]).then(result => {
                        if (result.affectedRows < 1) {
                            return res.json(new Result({
                                code: 0,
                                msg: '操作失败'
                            }))
                        }
                        callback(null, result)
                    })
                },function (err, results) {
                    res.json(new Result({
                        code: 1,
                        data: results,
                        msg: '操作成功'
                    }))
                })
            })
        })
    })
})

router.post('/Update', function (req, res, next) {
    const address = req.body.address
    const customerId = req.body.customerId
    const goodList = req.body.goodList
    const place = req.body.place
    const status = req.body.status
    const id = req.body.id
    mysql.EXECUTE("UPDATE `orders` SET address = ?, customerId = ?, place = ? WHERE id = ?", [address, customerId, place, id]).then(result => {
        mysql.EXECUTE("DELETE FROM order_good WHERE orderID = ?", [id]).then(() => {
            mysql.EXECUTE("INSERT INTO `order_process` ( orderID, status ) VALUES (?, ?)",[id, status]).then(processResult => {
                if (processResult.affectedRows < 1){
                    return res.json(new Result({
                        code: 0,
                        msg: '操作失败'
                    }))
                }
                goodList.forEach(item => {
                    mysql.EXECUTE("INSERT INTO `order_good` ( orderID, goodID, count ) VALUES (? ,? ,?)", [id, item.id, item.count]).then(affect => {
                        if (affect.affectedRows < 1) {
                            return res.json(new Result({
                                code: 0,
                                msg: '操作失败'
                            }))
                        }
                        res.json(new Result({
                            code: 1,
                            msg: '操作成功'
                        }))
                    })
                })
            })
        })
    })
})

router.post('/Delete', function (req, res, next) {
    const id = req.body.id
    mysql.EXECUTE("DELETE FROM `orders` WHERE id = ?", [id]).then(result => {
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
    mysql.EXECUTE('SELECT place as name,count(id) as value FROM `orders` GROUP BY place').then(result => {
        res.json(new Result({
            code: 1,
            msg: '操作成功',
            data: result
        }))
    })
})

module.exports = router;
