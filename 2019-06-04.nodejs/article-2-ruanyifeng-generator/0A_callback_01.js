/**
 * 回调函数
 */

const fs = require('fs');

fs.readFile('/etc/passwd', function (err, data) {
  if (err) throw err;
  console.log(data);
});
console.log("finish");

