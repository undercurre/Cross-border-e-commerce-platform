const configInfo = require('./config')

// 挂载mysql
const mysql  = require( 'mysql' );

// 配置连接池
const pool = mysql.createPool({
    connectionLimit: configInfo.connectionLimit,
    host: configInfo.host,
    user: configInfo.user,
    password: configInfo.password,
    database: configInfo.database,
    multipleStatements: configInfo.multipleStatements
});

const execute = (sql, params) => {
    return new Promise(function (resolve, reject) {
        // 使用连接池获取连接
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return
            } else {
                console.log('与MySQL数据库建立连接成功！');
                connection.query(sql, params, function (err, res) {
                    connection.release();
                    if (err) {
                        reject('sql执行失败')
                        return
                    }
                    resolve(res)
                })
            }
        })
    })
};

module.exports = {
    EXECUTE : execute
}


