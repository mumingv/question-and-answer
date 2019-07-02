// 使用函数的方式定义类

var People = function(id, name) {
	this.id = id;
	this.name = name;
}

var a = new People("3", "Henry");
var b = new People("3", "Henry");
var c = a;

console.log(`a和b相等？` + (a == b));
console.log(`a和c相等？` + (a == c));
console.log(`a和c恒等？` + (a === c));
