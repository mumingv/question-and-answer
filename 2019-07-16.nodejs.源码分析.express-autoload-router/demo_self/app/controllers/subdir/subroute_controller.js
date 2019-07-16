// 目录也是路由的一部分：/demo/subdir/subroute/list
module.exports.listAction = function(req, res) {
    return res.send("subdir/subroute list action");
};