
// 查看async函数的返回值是什么

async function testAsync() {
    return "hello async";  // 返回值是个字面量时，会返回 Promise.resolve(字面量)
}

const result = testAsync();  // async函数可以直接调用
console.log(result);  // Promise { 'hello async' }

