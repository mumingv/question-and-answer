// index必须使用如下方式访问：/api/home
exports.indexAction = {
    middlewares: [],
    handler(req, res) {
        res.send('HOME')
    }
};