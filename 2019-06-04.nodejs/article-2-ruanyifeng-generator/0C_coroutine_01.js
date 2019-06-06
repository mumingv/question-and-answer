/**
 * 协程（协程对应的语法是yield）(！！！无法执行！！！)
 *
 * 协程的处理步骤（下面的协程A就是一个异步任务）：
 * 第一步，协程A开始执行。
 * 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
 * 第三步，（一段时间后）协程B交还执行权。
 * 第四步，协程A恢复执行。
 */

var readFile = require('fs-readfile-promise');

// 依次读取并处理三个文件
function* asyncJob() {
    var data = yield readFile('/etc/passwd');
    console.log('--- asyncJob /etc/passwd ---');
    console.log(data);

    data = yield readFile('/etc/profile');
    console.log('--- asyncJob /etc/profile ---');
    console.log(data);

    data = yield readFile('/etc/ttys');
    console.log('--- asyncJob /etc/ttys ---');
    console.log(data);
}

var g = asyncJob();
console.log(g);  // Object [Generator] {}

// 第1个文件：/etc/passwd
var resultFile1 = g.next();
console.log(resultFile1);  // { value: Promise { <pending> }, done: false }

resultFile1.value.then(function(data) {
    // console.log('-------');
    // console.log(data);  // <Buffer 23 23 0a 23 20 55 73 65 72 20 44 61 74 61 62 61 73 65 0a 23 20 0a 23 20 4e 6f 74 65 20 74 68 61 74 20 74 68 69 73 20 66 69 6c 65 20 69 73 20 63 6f 6e ... 6724 more bytes>
    // console.log(data.toString());  // 文件内容
    // console.log('-------');
    
    // 第2个文件
    var resultFile2 = g.next(data.toString());
    console.log(resultFile2);  // { value: Promise { <pending> }, done: false }
    resultFile2.value.then(function(data) {
        // 第3个文件
        var resultFile3 = g.next(data.toString());
        console.log(resultFile3);  // { value: Promise { <pending> }, done: false }
        resultFile3.value.then(function(data) {
            g.next(data.toString());
        });
    });
});

console.log("finish");

