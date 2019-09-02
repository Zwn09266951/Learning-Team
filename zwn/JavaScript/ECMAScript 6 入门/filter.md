今天又详细的学习了一下filter

filter用于对数组进行过滤。
它创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

``` JavaScript
Array.filter(function(currentValue, indedx, arr), thisValue)

let data = [1,2,3,4,5]

data.filter((item)=> {
    return item > 3
})

// (2) [4, 5]
```
你可以在里面写你所要的条件，从而来得到你想要的参数

``` JavaScript
let userList = [
    {id:1, vip: false},
    {id:2,vip: true},
    {id:3,vip: true},
    {id:4,vip: false},
    {id:5,vip: true}
]
```

上面的数组在业务场景中会存在这种情况，筛选出是vip的用户


``` JavaScript
let vipuser = userList.filter((item) => {
    return item.vip
})

console.log(vipuser)
0: {id: 2, vip: true}
1: {id: 3, vip: true}
2: {id: 5, vip: true}
```
所以对数组进行条件筛选的时候，filter就可以满足大部分的要求了