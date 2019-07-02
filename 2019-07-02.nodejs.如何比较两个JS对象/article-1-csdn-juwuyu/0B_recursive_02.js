/**
 * 检查新修改的数据是否和已提交修改的数据存在冲突（即：有相同的叶子节点），并返回冲突的路径
 */
function isCoreConflict(newData, target, conflictPath) {
    // 整体基于newData进行判断
    // 当newData是普通类型，且和target类型相同时，表示存在冲突

    if (typeof(target) === "undefined") {
        return false;
    }

    if ((typeof(newData) === "object")) {
        for (let key of Object.keys(newData)) {
            if (isCoreConflict(newData[key], target[key], conflictPath)) {
                conflictPath.unshift(key);
                return true;
            }
        }
    }

    if ((typeof(newData) === "boolean") || (typeof(newData) === "number") || (typeof(newData) === "string")) {
        return typeof(newData) === typeof(target);
    }

    return false;
}

let newData = {
    "id": 3,
    "detail": {
        "name": "Henry",
        "age": 6
    }
}

let target = {
    "detail": {
        "name": "Henry"
    }
}

let conflictPath = [];
let ret = isCoreConflict(newData, target, conflictPath);
console.log(ret); // true
console.log(conflictPath); // [ 'detail', 'name' ]
console.log(conflictPath.join("->")); // detail->name
