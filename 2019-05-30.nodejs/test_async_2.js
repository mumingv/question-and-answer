
// async函数的正确调用方式

async function testAsync() {
    return "hello async";
}

testAsync().then(v => {
    console.log(v);    // 输出：hello async
});

