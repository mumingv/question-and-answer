/**
 * 异步处理方式：co函数库
 */

var co = require('co');
var readFilePromise = require('fs-readfile-promise');

// generator()是一个生成器函数
function* generator() {
    let data = yield readFilePromise('Jay.txt', 'utf8');
    console.log(data);

    data = yield readFilePromise('Angela.txt', 'utf8');
    console.log(data);

    data = yield readFilePromise('Henry.txt', 'utf8');
    console.log(data);
}

let gen = generator();  // gen是一个生成器对象
co(generator()).then(function() {
	console.log('Generator function is finished!');
});

console.log("finish");
