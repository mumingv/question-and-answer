/**
 * Generator函数：数据交换
 */

function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
console.log(g);  // Object [Generator] {}

let data = g.next();
console.log(data);  // { value: 3, done: false }

data = g.next(2);   // 向Genenator函数内部传递数据，改变当前yield后面表达式的返回值
console.log(data);  // { value: 2, done: true }

console.log("finish");

