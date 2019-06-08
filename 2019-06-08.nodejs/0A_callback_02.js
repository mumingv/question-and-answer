/**
 * 异步处理方式：回调函数，并行读取三个文件
 */

const fs = require('fs');

fs.readFile('Jay.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
});

fs.readFile('Angela.txt', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
});

fs.readFile('Henry.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
});

console.log("finish");
