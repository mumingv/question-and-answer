/**
 * 协程（协程对应的语法是yield）(！！！无法执行！！！)
 *
 * 协程的处理步骤（下面的协程A就是一个异步任务）：
 * 第一步，协程A开始执行。
 * 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
 * 第三步，（一段时间后）协程B交还执行权。
 * 第四步，协程A恢复执行。
 */

const fs = require('fs');
var readFile = require('fs-readfile-promise');

// 依次读取并处理三个文件
function asyncJob() {
    var data = yield fs.readFile('/etc/passwd');
    // var data = yield readFile('/etc/passwd');
    console.log(data);
}

// fs.readFile('/etc/passwd', function (err, data) {
//     if (err) throw err;
//     console.log(data);
//     fs.readFile('/etc/profile', function (err, data) {
//         if (err) throw err;
//         console.log(data);
//         fs.readFile('/etc/ttys', function (err, data) {
//             if (err) throw err;
//             console.log(data);
//         });
//     });
// });
console.log("finish");

