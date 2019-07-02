/**
 * 比较两个对象是否相等
 */
function compare(source, target) {
    // 整体基于source进行判断

    /**
     * source是普通类型
     */
    if (typeof(source) !== "object") {
        return source === target;
    }

    /**
     * source是对象类型
     */

    // target是普通类型
    if (typeof(target) !== "object") {
        return false;
    }

    // target是对象类型
    for (let key of Object.keys(source)) {
        if (!compare(source[key], target[key])) {
            return false;
        }
    }

    return true;
}

let source = {
    "id": 3,
    "name": "Henry",
    "age": 6
}

let target = {
    "id": 3,
    "name": "Henry",
    "age": 6
}

let ret = compare(source, target);
console.log(ret);
