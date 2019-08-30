//异步函数a
var a = function () {
    return new Promise((resolve, reject) => {
        //console.log('inner',a)
        setTimeout(() => {
            resolve('a')
        }, 1000)
    })
}
//异步函数b
var b = function () {
    return new Promise((resolve, reject) => {
        //console.log('inner',b)
        setTimeout(() => {
            resolve('b')
        }, 1000)
    })
}
//异步函数c
var c = function () {
    return new Promise((resolve, reject) => {
        //console.log('inner',c)
        setTimeout(() => {
            resolve('c')
        }, 1000)
    })
}

async function queue(arr) {
    let data = []
    for (let promise of arr) {
        let res = await promise()
        data.push(res)
    }
    return data
}

queue([a, b, c])
    .then(data => {
        console.log(data)
    });

// async function myfn(arr) {
//     let res = await a()
//     console.log(res)
//     res = await b()
//     console.log(res)
//     res = await c()
//     console.log(res)
// }

// myfn([a, b, c])