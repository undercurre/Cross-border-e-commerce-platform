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
    mysql.EXECUTE("select * from `customers` where name like ? limit ?, ?", [Ekey, (currentPage - 1) * size, size]).then(result => {
      mysql.EXECUTE("SELECT COUNT(id) FROM ( select * from `customers` where name like ? ) as newSearch", [Ekey]).then(countResult => {
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
    mysql.EXECUTE("SELECT *,date_format(date, '%Y-%m-%d %H:%i:%s') as date FROM `customers` limit ?, ?", [(currentPage - 1) * size, size]).then(result => {
      mysql.EXECUTE("SELECT count(id) as count FROM `customers`").then(countResult => {
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
  const name = req.body.name
  const type = req.body.type
  const place = req.body.place
  const level = req.body.level
  const phone = req.body.phone
  mysql.EXECUTE("INSERT INTO `customers` ( name, level, phone,  type, place ) VALUES ( ?, ?, ?, ?, ? )", [name, level, phone, type, place]).then(result => {
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
  const type = req.body.type
  const place = req.body.place
  const level = req.body.level
  const phone = req.body.phone
  mysql.EXECUTE("UPDATE `customers` SET name = ?, level = ?, phone = ?, place = ?, type = ? WHERE id = ?", [name, level, phone, place, type, id]).then(result => {
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
  mysql.EXECUTE("DELETE FROM `customers` WHERE id = ?", [id]).then(result => {
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
  mysql.EXECUTE('SELECT place as name,count(id) as value FROM `customers` GROUP BY place').then(result => {
    res.json(new Result({
      code: 1,
      msg: '操作成功',
      data: result
    }))
  })
})

module.exports = router;
