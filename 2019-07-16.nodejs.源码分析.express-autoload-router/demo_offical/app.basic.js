// Module dependencies
const path = require('path');
const express = require('express');
const loadRouter = require('express-autoload-router');
const app = express();
loadRouter(app, '/api', path.join(__dirname, 'api'));

app.listen(4000);