/**
 * 回调函数：嵌套（回调函数噩梦 'callback hell'）
 */

const fs = require('fs');

// 依次读取并处理三个文件，代码横向扩展，无法阅读和管理
fs.readFile('/etc/passwd', function (err, data) {
    if (err) throw err;
    console.log(data);
    fs.readFile('/etc/profile', function (err, data) {
        if (err) throw err;
        console.log(data);
        fs.readFile('/etc/ttys', function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    });
});
console.log("finish");

