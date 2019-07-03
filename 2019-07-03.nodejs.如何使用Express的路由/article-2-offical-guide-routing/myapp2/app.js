var express = require("express");

var app = express();

/**
 * 模块化路由处理程序
 */

var birds = require('./birds');
app.use('/birds', birds);

app.listen(3000, function() {
    console.log("Listening on port 3000!");
});