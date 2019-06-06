
// 测试：await运算符可以等待async函数，也可以等待普通函数

function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}

// await运算符必须放在async函数中
async function test() {
    const v1 = await getSomething();  // await运算符可以等待普通函数
    // !!! async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。
    const v2 = await testAsync();     // await运算符也可以等待async函数（其实等待的是一个Promise对象
    console.log(v1, v2);
}

test();  // async函数可以直接调用！！！

