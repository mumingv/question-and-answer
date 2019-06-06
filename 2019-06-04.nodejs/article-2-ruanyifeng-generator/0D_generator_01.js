/**
 * Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
 */

// *表示Generator函数可以放弃控制权
function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
console.log(g);  // Object [Generator] {}

let data = g.next();
console.log(data);  // { value: 3, done: false }

data = g.next();
console.log(data);  // { value: undefined, done: true }

console.log("finish");

