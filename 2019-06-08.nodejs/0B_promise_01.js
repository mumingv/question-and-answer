/**
 * 异步处理方式：Promise，串行读取三个文件
 */

var readFilePromise = require('fs-readfile-promise');

readFilePromise('Jay.txt', 'utf8')
	.then(function(data) {
	    console.log(data);
	})
	.then(function() {
	    return readFilePromise('Angela.txt', 'utf8');
	})
	.then(function(data) {
	    console.log(data);
	})
	.then(function() {
	    return readFilePromise('Henry.txt', 'utf8');
	})
	.then(function(data) {
	    console.log(data);
	})
	.catch(function(err) {
	    console.log(err);
	});

console.log("finish");
