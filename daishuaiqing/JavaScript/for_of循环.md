## 什么是 for…of 循环
for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。

## 语法
for (variable of iterable) {
    statement
}
variable：每个迭代的属性值被分配给该变量。
iterable：一个具有可枚举属性并且可以迭代的对象。

## 用例
Arrays(数组)  
Arrays（数组）就是类列表（list-like）对象。数组原型上有各种方法，允许对其进行操作，比如修改和遍历等操作。下面在一个数组上进行的 for...of 操作：

``` // array-example.js
const iterable = ['mini', 'mani', 'mo'];
 
for (const value of iterable) {
  console.log(value);
}
 
// Output:
// mini
// mani
// mo
其结果就是打印出 iterable 数组中的每一个值。
```
Maps(映射)  
Map 对象就是保存 key-value(键值) 对。对象和原始值可以用作 key(键)或 value(值)。Map 对象根据其插入方式迭代元素。换句话说， for...of 循环将为每次迭代返回一个 key-value(键值) 数组。
```
// map-example.js
const iterable = new Map([['one', 1], ['two', 2]]);
 
for (const [key, value] of iterable) {
  console.log(`Key: ${key} and Value: ${value}`);
}
 
// Output:
// Key: one and Value: 1
// Key: two and Value: 2
```
Set(集合)  
Set(集合) 对象允许你存储任何类型的唯一值，这些值可以是原始值或对象。 Set(集合) 对象只是值的集合。 Set(集合) 元素的迭代基于其插入顺序。 Set(集合) 中的值只能发生一次。如果您创建一个具有多个相同元素的 Set(集合) ，那么它仍然被认为是单个元素。
```
// set-example.js
const iterable = new Set([1, 1, 2, 2, 1]);
 
for (const value of iterable) {
  console.log(value);
}
// Output:
// 1
// 2
尽管我们的 Set(集合) 有多个 1 和 2 ，但输出的只有 1 和 2 。
```
String(字符串)  
字符串用于以文本形式存储数据。
```
// string-example.js
const iterable = 'javascript';
 
for (const value of iterable) {
  console.log(value);
}
 
// Output:
// "j"
// "a"
// "v"
// "a"
// "s"
// "c"
// "r"
// "i"
// "p"
// "t"
这里，对字符串执行迭代，并打印出每个索引上的字符。
```
Arguments Object(参数对象)  
把一个参数对象看作是一个类数组(array-like)对象，并且对应于传递给函数的参数。这是一个用例：
```
// arguments-example.js
function args() {
  for (const arg of arguments) {
    console.log(arg);
  }
}
 
args('a', 'b', 'c');
// Output:
// a
// b
// c
你可能会想，发生了什么事?! 如前所述，当调用函数时，arguments 会接收传入 args() 函数的任何参数。所以，如果我们传递 20 个参数给 args() 函数，我们将打印出 20 个参数。
```
Generators(生成器)  
生成器是一个函数，它可以退出函数，稍后重新进入函数。
```
// generator-example.js
function* generator(){ 
  yield 1; 
  yield 2; 
  yield 3; 
}; 
 
for (const g of generator()) { 
  console.log(g); 
}
 
// Output:
// 1
// 2
// 3
function* 定义了一个生成器函数，该函数返回生成器对象(Generator object)。更多关于生成器相关的信息，可以点击这里。
```
## 退出迭代  
JavaScript 提供了四种已知的终止循环执行的方法：break、continue、return 和 throw。让我们来看一个例子：
```
const iterable = ['mini', 'mani', 'mo'];
 
for (const value of iterable) {
  console.log(value);
  break;
}
 
// Output:
// mini
在这个例子中，我们使用 break 关键字在一次执行后终止循环，所以只有 mini 被打印出来。
```
## 普通对象不可迭代  
for...of 循环仅适用于迭代。 而普通对象不可迭代。 我们来看一下：
```
const obj = { fname: 'foo', lname: 'bar' };
 
for (const value of obj) { // TypeError: obj[Symbol.iterator] is not a function
    console.log(value);
}
在这里，我们定义了一个普通对象 obj ，并且当我们尝试 for...of 对其进行操作时，会报错：TypeError: obj[Symbol.iterator] is not a function。
```
我们可以通过将类数组(array-like)对象转换为数组来绕过它。该对象将具有一个 length 属性，其元素必须可以被索引。我们来看一个例子：
```
// object-example.js
const obj = { length: 3, 0: 'foo', 1: 'bar', 2: 'baz' };
 
const array = Array.from(obj);
for (const value of array) { 
    console.log(value);
}
// Output:
// foo
// bar
// baz
Array.from() 方法可以让我通过类数组(array-like)或可迭代对象来创建一个新的 Array(数组) 实例。
```