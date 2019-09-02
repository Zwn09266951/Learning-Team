const ejs = require('ejs');
const path = require('path');
var fs = require("fs")
let data = {
    username:'张三',
    colums:[
        {
            name:'abbily',
            age:19,
            sex:2
        },
        {
            name:'boob',
            age:29,
            sex:1
        },
        {
            name:'hello',
            age:14,
            sex:2
        },
        {
            name:'pasco',
            age:32,
            sex:2
        }
    ]
}
ejs.renderFile(path.join(__dirname, 'index.tpl'), data, (err, str) => {
  console.log(str);
  fs.writeFile("index.html", str, function(err) {
      if(err){
          console.log("写入失败！")
      }
  })
});