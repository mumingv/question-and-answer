/**
 * Promise：回调函数的改进（Promise对应的语法是.then）
 */

var readFilePromise = require('fs-readfile-promise');

// 依次读取并处理三个文件，代码纵向扩展，解决回调函数横向扩展无法阅读和管理的问题
readFilePromise('/etc/passwd')
.then(function(data) {
    console.log(data.toString());
})
.then(function() {
    return readFilePromise('/etc/profile');
})
.then(function(data) {
    console.log(data.toString());
})
.then(function() {
    return readFilePromise('/etc/ttys');
})
.then(function(data) {
    console.log(data.toString());
})
.catch(function(err) {
    console.log(err);
});

console.log("finish");

