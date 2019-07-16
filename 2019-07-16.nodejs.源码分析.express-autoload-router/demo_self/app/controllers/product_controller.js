/**
 * 函数方式
 */
module.exports.listAction = function(req, res) {
    return res.send("product list action");
};

// module.exports和exports等价
exports.getAction = function(req, res) {
    return res.send("product get action");
}

/**
 * 对象方式
 */
module.exports.buyAction = {
    method: ["GET", "POST"],
    middlewares: [],
    handler: function(req, res) {
        return res.send("product buy action");
    }
};

// handler的另一种写法
exports.sellAction = {
    method: ["GET", "POST"],
    middlewares: [],
    handler(req, res) {
        return res.send("product sell action");
    }
};

// 中间件
module.exports.lookAction = {
    method: ["GET", "POST"],
    middlewares: [
        function(req, res, next) {
            console.log("middlewares 1");
            next();
        },
        function(req, res, next) {
            console.log("middlewares 2");
            next();
        }
    ],
    handler: function(req, res) {
        return res.send("product look action");
    }
};