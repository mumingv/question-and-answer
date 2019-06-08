/**
 * 异步处理方式：Promise，串行读取三个文件（期间有一个失败就不会往下继续执行）(精简版)
 */

var readFilePromise = require('fs-readfile-promise');

readFilePromise('Jay.txt', 'utf8')
	.then(function(data) {
	    console.log(data);
	    return readFilePromise('Angela.txt', 'utf8');
	})
	.then(function(data) {
		console.log(data);
	    return readFilePromise('Henry.txt', 'utf8');
	})
	.then(function(data) {
	    console.log(data);
	})
	.catch(function(err) {
	    console.log(err);
	});

console.log("finish");
