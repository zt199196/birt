/**
 * Created by Administrator on 2014/7/23.
 */
var mysql = require('mysql');
var config_db = require('../../config/config_db');

var connection = mysql.createConnection({
    host: config_db.url,
    user: config_db.user,
    password: config_db.pwd,
    database: config_db.name,
    port: config_db.port
});
//connection.connect();     //连接数据库时候 去掉注释
exports.connection = connection;

exports.psQuery = function (sql, values, fn) {
    connection.query(sql, values, function (err, rows) {
        if (err)throw err;
        if (fn)fn(rows);
    });
};

