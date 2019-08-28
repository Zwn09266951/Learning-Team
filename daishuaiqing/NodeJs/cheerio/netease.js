const agent = require('superagent');
const cheerio = require('cheerio');
const xmlreader = require("xmlreader");
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
});
connection.connect();
var addSql = 'INSERT INTO star_info(name_cn,name_en,name_alis,nationality,birth_addr,birth_date,vocation,constellation,graduation,language,opus,broker,emi) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
//男歌手列表
let sex = 2//0表示男歌手，1表示女歌手，2表示组合
let number = 0;
for (let i = 1; i <= 5; i++) {
    agent.get(`https://u.y.qq.com/cgi-bin/musicu.fcg`)
        .query({
            '-': 'getUCGI26493168119466826',
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0,
            data: `{
            "comm":{
                "ct":24,
                "cv":0
            },
            "singerList":{
                "module":"Music.SingerListServer",
                "method":"get_singer_list",
                "param":{
                    "area":-100,
                    "sex":${sex},
                    "genre":-100,
                    "index":-100,
                    "sin":0,
                    "cur_page":${i}
                }
            }
        }`
        })
        .then(res => {
            let data = JSON.parse(res.text)
            //console.log(data.singerList.data.singerlist)
            //console.log(data.singerList.data.total)
            let singerList = data.singerList.data.singerlist
            for (var j = 0; j < singerList.length; j++) {
                get_star_info(singerList[j].singer_mid)
                number++;
                console.log(number)
            }
        })
}
// connection.end();
function get_star_info(singermid) {
    agent
        .get(`https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg`)
        .set('Referer', 'https://c.y.qq.com/xhr_proxy_utf8.html')
        .query({
            singermid: singermid,
            utf8: 1,
            outCharset: 'utf-8',
            format: 'xml',
            r: Date.now()
        })
        .then(res => {
            xmlreader.read(res.text, function (errors, response) {
                if (null !== errors) {
                    return;
                }
                let arrInfo = response.result.data.info.basic.item.array;
                // console.log(arrInfo.item.array.length)
                // for(let ha=0;ha<arrInfo.item.array.length;ha++){
                //     console.log(arrInfo.item.array[ha].key.text())
                // }
                var arr = []

                for (let k = 0; k < arrInfo.length; k++) {
                    //console.log(arrInfo[k].key.text())
                    //console.log(arrInfo.length)
                    switch (arrInfo[k].key.text()) {
                        case '中文名':
                            arr[0] = arrInfo[k].value.text()
                            break;
                        case '外文名':
                            arr[1] = arrInfo[k].value.text()
                            break;
                        case '别名':
                            arr[2] = arrInfo[k].value.text()
                            break;
                        case '国籍':
                            arr[3] = arrInfo[k].value.text()
                            break;
                        case '出生地':
                            arr[4] = arrInfo[k].value.text()
                            break;
                        case '出生日期':
                            arr[5] = arrInfo[k].value.text()
                            break;
                        case '职业':
                            arr[6] = arrInfo[k].value.text()
                            break;
                        case '星座':
                            arr[7] = arrInfo[k].value.text()
                            break;
                        case '毕业学校':
                            arr[8] = arrInfo[k].value.text()
                            break;
                        case '语言':
                            arr[9] = arrInfo[k].value.text()
                            break;
                        case '代表作品':
                            arr[10] = arrInfo[k].value.text()
                            break;
                        case '经纪公司':
                            arr[11] = arrInfo[k].value.text()
                            break;
                        case '唱片公司':
                            arr[12] = arrInfo[k].value.text()
                            break;
                    }
                }
                //console.log(arr)
                var addSqlParams = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10],arr[11],arr[12]];
                connection.query(addSql, addSqlParams, function (err, result) {
                    if (err) {
                        //console.log('[INSERT ERROR] - ', err.message);
                        return;
                    }
                });
            });
        })
}

