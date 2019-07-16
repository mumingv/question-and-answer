var i = 0;
// index必须使用如下方式访问：/api/product/detail
exports.indexAction = {    
    middlewares: [
        function(req, res, next) {
            console.log('Middleware 1');
            next();
        },
        function(req, res, next) {
            console.log('Middleware 2');
            next();
        },
    ],
    handler(req, res) {
        i ++;
        return res.send(`product detail ${i}`);
    },
};
module.exports.apiAction = (req, res) => {
    i ++;
    return res.send(`Product detail s api ${i}`);
};

module.exports.listAction = function(req, res) {
    i ++;
    return res.send('Product detail list api');
};

