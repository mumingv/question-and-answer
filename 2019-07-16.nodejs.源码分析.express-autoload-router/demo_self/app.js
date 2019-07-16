const express = require("express");
const path = require('path');
const loadRouter = require('express-autoload-router');

const app = express();

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

loadRouter(app, "/demo", path.join(__dirname, "app/controllers"));

app.listen(3000, function() {
    console.log("Listening on port 3000!");
});
