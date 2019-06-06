
// 测试：用 setTimeout 模拟耗时的异步操作

function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

takeLongTime().then(v => {
    console.log("got", "abc", v);  // got abc long_time_value
});

