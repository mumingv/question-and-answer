var express = require("express");

var app = express();

/**
 * 路由方法
 */

// all方法用于执行中间件函数，必须放在具体的路由之前，否则该中间件函数就无法得到执行
app.all("/secret", function(req, res, next) {
    console.log("Accessing the secret section ...");
    next();
});

app.get("/secret", function(req, res) {
    console.log("GET request to the secret");
    res.send("GET request to the secret");
});

/**
 * 路由路径
 */

// 基于字符串的匹配
app.get("/", function(req, res) {
    res.send('GET request to the homepage');
});

app.post("/", function(req, res) {
    res.send('POST request to the homepage');
});

app.get('/about', function(req, res) {
    res.send('about');
});

app.get('/random.text', function(req, res) {
    res.send('random.text');
});

// 基于字符串模式的匹配
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});

app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
});

app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});

app.get('/ab(cd)?e', function(req, res) {
    res.send('ab(cd)?e');
});

// 基于正则表达式的匹配
// app.get(/a/, function(req, res) {
//   res.send('/a/');
// });

app.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
});

/**
 * 路由处理程序
 */

// 单个独立回调函数
app.get('/example/a', function(req, res) {
    res.send('Hello from A!');
});

// 两个独立回调函数
app.get('/example/b2', function(req, res, next) {
    console.log('the response will be sent by the next function ... b1');
    next();
}, function(req, res) {
    res.send('Hello from B2!');
});

// 三个独立回调函数
app.get('/example/b3', function(req, res, next) {
    console.log('the response will be sent by the next function ... b1');
    next();
}, function(req, res, next) {
    console.log('the response will be sent by the next function ... b2');
    next();
}, function(req, res) {
    res.send('Hello from B3!');
});

// 更多个独立回调函数
// ...

// 一组回调函数
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// 一组回调函数与独立回调函数的组合
var cb3 = function (req, res, next) {
  console.log('CB3');
  next();
}

var cb4 = function (req, res, next) {
  console.log('CB4');
  next();
}

app.get('/example/d', [cb3, cb4], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

// 链式路由处理程序
app.route('/book')
    .get(function(req, res) {
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    });


app.listen(3000, function() {
    console.log("Listening on port 3000!");
});
