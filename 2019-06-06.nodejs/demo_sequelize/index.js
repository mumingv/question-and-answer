// 创建连接
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:12345678@localhost:3306/books');

// 原始查询, Promise方式
let sql = "SELECT * FROM `customers` WHERE 1";
sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then((list) => {
        console.log(list);
}).catch(function(err) {
        console.log(err);
});

