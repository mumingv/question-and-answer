/**
 * 异步处理方式：Generator函数，
 */

var readFilePromise = require('fs-readfile-promise');

// generator()是一个生成器函数
function* generator() {
    yield readFilePromise('Jay.txt', 'utf8');
    yield readFilePromise('Angela.txt', 'utf8');
    yield readFilePromise('Henry.txt', 'utf8');
}

let gen = generator();  // gen是一个生成器对象

gen.next().value.then(function(data) {
	console.log(data);
	gen.next().value.then(function(data) {
		console.log(data);
		gen.next().value.then(function(data) {
			console.log(data);
			gen.next();  // 返回：{ value: undefined, done: true }，表示生成器函数执行完成
		});
	});
});

console.log("finish");
