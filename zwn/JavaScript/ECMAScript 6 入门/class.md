在以前js是没有类这个概念的，在ES6当中加入了class的类的概念，ES6 class 可以看做是ES5的语法糖，ES6可以实现的东西，ES5都可以实现。

封装一个工具类
```javaScript
class tool {
    // 求和
    sum(a,b) {
        return a+b
    }
    // 转成整型
    toNumber(value) {
        return Number(value)
    }
}

// 调用

let tools = new tool()

tool.sum(1,2) // 3
tool.toNumber('123') // 123
```