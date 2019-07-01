// toString()函数无法得到期望的字符串

const obj = {
	id: 0,
	name: "Henry",
	age: 6
};

const str = obj.toString();

console.log(str);  // [object Object]
