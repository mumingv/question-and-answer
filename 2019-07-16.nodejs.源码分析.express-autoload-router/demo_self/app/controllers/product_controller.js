/**
 * 函数方式
 */

// 默认路由，访问方式：/demo/product
module.exports.indexAction = function(req, res) {
    return res.send("product index action");
};

// 普通路由，访问方式：/demo/product/list
module.exports.listAction = function(req, res) {
    return res.send("product list action");
};

// module.exports和exports等价
exports.getAction = function(req, res) {
    return res.send("product get action");
}

// 简化函数：function 改成 =>
module.exports.simpleAction = (req, res) => {
    return res.send("product simple action");
};

// 更简化函数：function 改成 =>，省略大括号
// URL使用大小写均可：/demo/product/moreSimple 或 /demo/product/moresimple
module.exports.moreSimpleAction = (req, res) => res.send("product moreSimple action");

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
            console.log("middlewares 1 end");
        },
        function(req, res, next) {
            console.log("middlewares 2");
            next();
            console.log("middlewares 2 end");
        }
    ],
    handler: function(req, res) {
        console.log("product look action");
        return res.send("product look action");
    }
};