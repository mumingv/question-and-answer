/**
 * 对象方式，多个路由放在一起
 */
module.exports = {
    listAction: {
        method: ["GET"],
        middlewares: [],
        handler: function(req, res) {
            return res.send("user list action");
        }
    },
    getAction: {
        method: ["GET"],
        middlewares: [],
        handler: function(req, res) {
            return res.send("user get action");
        }
    }
};