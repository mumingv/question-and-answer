// 【内置对象函数】
// String.prototype.replace() - 字符串替换（普通&正则）
// String.prototype.match() - 字符串匹配正则表达式的结果：匹配返回数组；不匹配返回null
// Array.isArray() - 静态方法，判断是否为数组
// Array.prototype.indexOf() - 查找元素第一次出现的索引：没找到返回-1

// 【标准库函数】在文档里：http://nodejs.cn/api/os.html
// os.platform() - 返回平台名称字符串，如："linux"、"darwin"、"win32"

// 【第三方库函数】
/**
 * glob库：使用模式模式匹配文件
 */
// glob.sync() - 遍历/递归遍历文件夹下的所有文件，返回一个匹配文件路径数组

// 【其他】
// 1、在命令提示符直接查看模块函数的方法示例：
// > require('os');


const glob = require('glob');
const os = require('os');
const path = require('path');
const _ = require('underscore');
const compose = require('./lib/compose');

// 支持的HTTP_METHOD
const METHOD_ENUM = ['get', 'post', 'put', 'delete', 'patch'];

function trimUrl(url) {
    return os.platform() === 'win32' ? url.replace(/\\/ig, '/') : url;
}

/**
 * 参数说明：
 * - app为express的实例化对象；
 * 示例：const app = express();
 *
 * - urlRoot为用户指定的一级路由；
 * 示例：/demo
 * 
 * - root为用户指定的controllers目录的绝对路径；
 * 示例：/Users/muming/git/mumingv/question-and-answer/2019-07-16.nodejs.源码分析.express-autoload-router/demo_self/app/controllers
 */
function loadRouter(app, urlRoot, root) {
    console.log('route:', root); // /Users/muming/git/mumingv/question-and-answer/2019-07-16.nodejs.源码分析.express-autoload-router/demo_self/app/controllers

    // 无效代码
    const opt = {};

    // 数组使用forEach遍历其中的元素
    glob.sync(`${root}/**/*_controller.js`).forEach(function(file) {
        console.log('file:', file); // /Users/yinjie05/git/mumingv/question-and-answer/2019-07-16.nodejs.源码分析.express-autoload-router/demo_self/app/controllers/product_controller.js

        // win32系统运行的话，需要将 \ 转换成 /
        const realRoot = os.platform() === 'win32' ? root.replace(/\\/ig, '/') : root;
        console.log('realRoot', realRoot); // /Users/yinjie05/git/mumingv/question-and-answer/2019-07-16.nodejs.源码分析.express-autoload-router/demo_self/app/controllers

        // 去除file完整路径中的尾缀 .js
        const filePath = file.replace(/\.[^.]*$/, '');
        console.log('filePath:', filePath); // /Users/yinjie05/git/mumingv/question-and-answer/2019-07-16.nodejs.源码分析.express-autoload-router/demo_self/app/controllers/product_controller

        // 控制器文件product_controller.js当中，由module.exports导出的由各Action（method）组成的对象
        const controller = require(filePath);
        console.log(controller);
        // {
        //     indexAction: [Function],
        //     listAction: [Function],
        //     getAction: [Function],
        //     simpleAction: [Function],
        //     moreSimpleAction: [Function],
        //     buyAction: {
        //         method: ['GET', 'POST'],
        //         middlewares: [],
        //         handler: [Function: handler]
        //     },
        //     sellAction: {
        //         method: ['GET', 'POST'],
        //         middlewares: [],
        //         handler: [Function: handler]
        //     },
        //     lookAction: {
        //         method: ['GET', 'POST'],
        //         middlewares: [
        //             [Function],
        //             [Function]
        //         ],
        //         handler: [Function: handler]
        //     }
        // }


        // 从filePath中提取控制器名称
        const urlPrefix = filePath.replace(realRoot, '').replace(/_controller$/, '').replace(/\/index$/, '');
        console.log('urlPrefix:', urlPrefix); // /product

        // 从控制器文件中通过module.exports导出的对象总中，提取各Action函数名称
        const methods = Object.keys(controller);

        console.log('method:', methods);
        // [
        //     'indexAction',
        //     'listAction',
        //     'getAction',
        //     'simpleAction',
        //     'moreSimpleAction',
        //     'buyAction',
        //     'sellAction',
        //     'lookAction'
        // ]

        /**
         * 将方法注册到express对象app（函数内部定义的函数）
         * 参数说明：
         * - name：Action名称，如：list
         * - methodName：Action函数名称，如：listAction
         * - methodBody：Action对应的函数或对象
         */
        function applyMethod(name, methodName, methodBody) {
            console.log('name:%s methodName:%s', name, methodName);
            const body = methodBody;

            // 关于``的使用：
            // 1、``可以嵌套；
            // 2、${}当中可以使用变量，也可以使用表达式；
            let modifiedUrl = `${urlPrefix}${name === 'index' ? '' : `/${name}`}`;
            console.log('modifyedUrl:', modifiedUrl); // 普通：/product/list，特殊（针对indexAction）：/product

            let middlewares = [];
            let methods = ['get'];
            let handler;

            // typeof的那些事：
            // 1、typeof是一个运算符，不是一个函数，但是可以当成函数使用（在格式上）；
            // 2、typeof的运算结果可以为："number"、"string"、"boolean"、"function"、"object"、"undefined"、"symbol"，没有"array"!!!
            // 2、typeof(Array())是"object"；
            switch (typeof body) {
                case 'object':
                    {
                        middlewares = body.middlewares || [];
                        handler = body.handler;
                        if (body.method != null && body.method != undefined) {
                            // 又是一段无用垃圾代码！！！
                            let arr = body.method;
                            if (!_.isArray(arr)) {
                                arr = [arr];
                            }

                            methods = [];
                            body.method.forEach(function(item) {
                                if (typeof item === 'string') {
                                    methods.push(item.toLowerCase());
                                }
                            });
                        }
                    }
                    break;
                case 'function':
                    {
                        handler = body;
                    }
                    break;
                default:
                    {
                        return;
                    }
            }
            console.log('result:' + methods + ' ' + modifiedUrl); // get /product/list

            methods.forEach(function(method) {
                if (METHOD_ENUM.indexOf(method) !== -1) {
                    if (!handler) {
                        throw Error('[load-router]: no handler for method: ', method);
                    }

                    // urlRoot是用户指定的URI前缀，可以是空字符串""，也可以入本例所示的"/demo"
                    let urlPatten = '';
                    if (urlRoot) {
                        urlPatten = urlRoot;
                    }

                    // 拼装URI：/demo + /product/list => /demo/product/list
                    // Window版本URL适配："\"转换成"/"
                    let url = trimUrl(path.join(urlRoot, modifiedUrl + '$'));
                    console.log('url:', url); // /demo/product/list$

                    app[method](url, compose(middlewares, modifiedUrl), handler);
                } else {
                    throw Error('[load-router]: invalid method: ', method);
                }
            });
        }

        // 遍历控制器中的各个方法，如果合法就进行注册
        methods.forEach((method) => {
            const methodName = method;

            console.log(methodName); // listAction
            console.log(methodName.match(/Action$/g)); // 匹配返回：[ 'Action' ]，不匹配返回：null

            // 校验Action函数名称的合法性，必须是xxxAction格式
            if (!methodName.match(/Action$/g)) {
                console.log('method %s not api', methodName);
                return;
            }

            // xxxAction支持函数、对象、数组三种格式
            const methodBody = controller[method];
            if (Array.isArray(methodBody)) {
                methodBody.forEach((m) => {
                    // 数组支持的有问题！函数调用缺少一个参数！！！
                    applyMethod(methodName, m);
                });
            } else {
                // 从method中提取出Action名称，如：list
                applyMethod(method.replace(/Action$/, ''), methodName, methodBody);
            }
        });
    });
}
module.exports = loadRouter;