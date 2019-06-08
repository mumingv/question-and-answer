/**
 * 异步处理方式：Promise
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
