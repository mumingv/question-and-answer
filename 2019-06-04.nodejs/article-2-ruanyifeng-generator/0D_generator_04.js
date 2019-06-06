/**
 * Generator函数：实际使用
 */

var fetch = require('node-fetch');

function* gen() {
    var url = 'https://api.github.com/users/github?access_token=acc17a2d9c425c6c9a6335527afab805248363ad';
    var result = yield fetch(url);
    console.log(result.bio);
}

var g = gen();
console.log(g); // Object [Generator] {}

var result = g.next();
console.log(result); // { value: Promise { <pending> }, done: false }

result.value.then(function(data) {
    return data.json();  // Promise { <pending> }
}).then(function(data) {
    g.next(data);  // JSON对象
});

console.log("finish");

