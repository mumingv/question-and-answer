// 创建连接：socket方式
const Sequelize = require('sequelize');
const sequelize = new Sequelize('books', 'root', '12345678', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/tmp/mysql.sock'
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// 原始查询, Promise方式
let sql = "SELECT * FROM `customers` WHERE 1";
sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then((list) => {
        console.log(list);
}).catch(function(err) {
        console.log(err);
});

