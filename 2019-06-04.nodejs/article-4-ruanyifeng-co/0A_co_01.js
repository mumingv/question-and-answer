//var fs = require('fs');
var readFilePromise = require('fs-readfile-promise');

var gen = function* (){
  var f1 = yield readFilePromise('/etc/passwd');
  var f2 = yield readFilePromise('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

var co = require('co');
var ret = co(gen);
console.log(ret);  // Promise { <pending> }

