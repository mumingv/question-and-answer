/**
 * 异步处理方式：Promise，串行读取三个文件（期间有失败也会往下继续执行）
 */

var readFilePromise = require('fs-readfile-promise');

readFilePromise('Jay.txt2', 'utf8')
	.then(function(data) {
	    console.log(data);
	}, function(err) {
		console.log(err);
	})
	.then(function() {
	    return readFilePromise('Angela.txt2', 'utf8');
	})
	.then(function(data) {
	    console.log(data);
	}, function(err) {
		console.log(err);
	})
	.then(function() {
	    return readFilePromise('Henry.txt2', 'utf8');
	})
	.then(function(data) {
	    console.log(data);
	}, function(err) {
		console.log(err);
	});

console.log("finish");
