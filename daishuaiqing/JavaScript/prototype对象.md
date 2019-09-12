# Prototype原型
## 一·什么是原型
## 二.显式原型，隐式原型
## 三.原型链
## 四.原型链属性的问题

### 不管是内置函数还是定义函数,都是new Function实现的
```
var a = new Function()
var b = new Function()
console.log(a.__proto__ === b.__proto__) //true
```

### 实例函数的隐式原型等于定义函数的显示原型
```
function C(){}
var c = new C()
console.log(c.__proto__ === C.prototype) //true
```

###函数的显式原型指向的对象默认是空Object实例对象(Object除外)

所有函数都是Function的实例(包括Function自己)
```
console.log(Function.__proto__ === Function.prototype) //true
//Object的原型对象是原型链的尽头
console.log(Object.prototype.__proto__) //null
//原型链属性问题
var x = function(){}
x.prototype.a = '123'
var xx1 = new x()
console.log(x.prototype === xx1.__proto__)//函数x的原型就是实例xx1的隐式原型
xx1.a = '456'
var xx2 = new x()
console.log(xx1.a,xx2.a) //456 123,xx1的值修改了,但是xx2没有被修改,说x的实例对象的隐式原型中的a没有被改变,xx1设置的值会直接设置在当前的实例对象
```

### a instanceof A  判断左边的对象是不是右边类型的实例
```
function Fn(){}
var fn = new Fn()
console.log(fn instanceof Fn) //true
console.log(fn instanceof Object) //true
```
