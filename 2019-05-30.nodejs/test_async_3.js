
// 测试async函数没有返回值的情况

async function testAsync() {
    return;
}

const result = testAsync();
console.log(result);  // Promise { undefined }

