// 【重要函数】
// os.platform() - 返回平台名称字符串，如："linux"、"darwin"、"win32"
// glob.sync()

// 【其他】
// 1、在命令提示符直接查看模块函数的方法示例：
// > require('os');
// 
// 2、

// 【问题】
// 1、glob是什么库？文档里没有：http://nodejs.cn/api/os.html
// 2、

const glob = require('glob');
const os = require('os');
const path = require('path');
const _ = require('underscore');
const compose = require('./lib/compose');
const METHOD_ENUM = ['get', 'post', 'put', 'delete', 'patch'];

function trimUrl(url) {
    return os.platform() === 'win32' ? url.replace(/\\/ig, '/') : url;
}

/**
 * 参数说明：
 * - app为express的实例化对象；
 * - urlRoot为用户指定的一级路由；
 * - root为用户指定的controllers目录的绝对路径；
 */
function loadRouter(app, urlRoot, root) {
    console.log('route:', root);  // route: /Users/muming/git/mumingv/question-and-answer/2019-07-16.nodejs.源码分析.express-autoload-router/demo_self/app/controllers

    const opt = {};
    glob.sync(`${root}/**/*_controller.js`).forEach(function(file) {
        console.log('file:', file);
        const realRoot = os.platform() === 'win32' ? root.replace(/\\/ig, '/') : root;
        const filePath = file.replace(/\.[^.]*$/, '');
        console.log('filePath:', filePath);
        const controller = require(filePath);
        const urlPrefix = filePath.replace(realRoot, '').replace(/_controller$/, '').replace(/\/index$/, '');
        console.log('urlPrefix:', urlPrefix);
        const methods = Object.keys(controller);
        console.log('method:', methods);

        function applyMethod(name, methodName, methodBody) {
            console.log('name:%s methodName:%s', name, methodName);
            const body = methodBody;
            let modifiedUrl = `${urlPrefix}${name === 'index' ? '' : `/${name}`}`;
            console.log('modifyedUrl:', modifiedUrl);
            let middlewares = [];
            let methods = ['get'];
            let handler;
            switch (typeof body) {
                case 'object':
                    {
                        middlewares = body.middlewares || [];
                        handler = body.handler;
                        if (body.method != null && body.method != undefined) {
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
            console.log('result:' + methods + ' ' + modifiedUrl);
            methods.forEach(function(method) {
                if (METHOD_ENUM.indexOf(method) !== -1) {
                    if (!handler) {
                        throw Error('[load-router]: no handler for method: ', method);
                    }
                    let urlPatten = '';
                    if (urlRoot) {
                        urlPatten = urlRoot;
                    }
                    let url = trimUrl(path.join(urlRoot, modifiedUrl + '$'));
                    console.log('url:', url);
                    app[method](url, compose(middlewares, modifiedUrl), handler);
                } else {
                    throw Error('[load-router]: invalid method: ', method);
                }
            });
        }

        methods.forEach((method) => {
            const methodName = method;
            if (!methodName.match(/Action$/g)) {
                console.log('method %s not api', methodName);
                return;
            }
            const methodBody = controller[method];
            if (Array.isArray(methodBody)) {
                methodBody.forEach((m) => {
                    applyMethod(methodName, m);
                });
            } else {
                applyMethod(method.replace(/Action$/, ''), methodName, methodBody);
            }
        });
    });
}
module.exports = loadRouter;