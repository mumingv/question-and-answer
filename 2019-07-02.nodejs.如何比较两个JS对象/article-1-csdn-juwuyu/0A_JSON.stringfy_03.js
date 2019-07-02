// 使用JSON.stringify()得到期望的字符串

const obj = {
    id: 0,
    name: "Henry",
    age: 6
};

const str = JSON.stringify(obj);

console.log(str); // {"id":0,"name":"Henry","age":6}
