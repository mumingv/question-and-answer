// 【语法】
// 数组迭代新方法：for...of... 
// 神奇函数：(function iterate() {})();

// 【内置对象函数】
// Function.prototype.bind() - 创建一个新函数，该函数是当前函数的一个拷贝

/**
 * Compose middlewares
 *
 * @param middlewares
 * @param path
 *
 * @returns {Function}
 */

/**
 * 作用：将多个中间件函数包装成一个中间件函数
 * 注意：第二个参数path未使用！
 */
function compose(middlewares, path) {
    if (!Array.isArray(middlewares)) {
        throw new Error(`middlewares ${JSON.stringify(middlewares)} should be an Array of functions.`);
    }
    if (middlewares.length) {
        for (const fn of middlewares) {
            if (typeof fn !== 'function') {
                throw new Error(`middleware ${path} - ${JSON.stringify(fn)} should be a function, ignored.`);
            }
        }
    }
    return (req, res, next) => {
        (function iterate(i, max) {
            if (i === max) {
                return next();
            }
            middlewares[i](req, res, iterate.bind(this, i + 1, max));
        })(0, middlewares.length);
    }
}
module.exports = compose;