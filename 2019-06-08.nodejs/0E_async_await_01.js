/**
 * 异步处理方式：async...await
 */

var readFilePromise = require('fs-readfile-promise');

async function asyncReadFile() {
    let data = await readFilePromise('Jay.txt', 'utf8');
    console.log(data);

    data = await readFilePromise('Angela.txt', 'utf8');
    console.log(data);

    data = await readFilePromise('Henry.txt', 'utf8');
    console.log(data);

    return "Async function is finished!"
}

asyncReadFile().then(function(data) {
    console.log(data);
});

console.log("finish");
