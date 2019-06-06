/**
 * Generator函数：传递异常
 */

function* gen(x) {
    try {
        var y = yield x + 2;
    } catch(e) {
        console.log(e);
    }
    return y;
}

var g = gen(1);
console.log(g);  // Object [Generator] {}

let data = g.next();
console.log(data);  // { value: 3, done: false }

data = g.throw('出错了');   // 向Genenator函数内部传递异常
console.log(data);  // { value: undefined, done: true }

console.log("finish");

