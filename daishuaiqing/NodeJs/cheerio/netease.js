const agent = require('superagent');
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
//0表示男歌手，1表示女歌手，2表示组合
exec(1,1,20)

async function exec(sex, startPage, endPage){
    let starList = await get_start_batch(sex, startPage, endPage)
    console.log('获取明星列表完成！')
    for(let i=0;i<starList.length;i++){
        await get_star_info(starList[i].singer_mid)
    }
    connection.end()
    console.log("complate!")
}


//获取一个范围页数的歌手列表数据
async function get_start_batch(sex, startPage, endPage) {
    let data = []
    for(let i=startPage;i<=endPage;i++){
        let res = await get_star_list(sex,i)
        data.push(...res)
    }
    return data
}


//获取1页歌手列表
function get_star_list(sex, page) {
    return new Promise((resolve, reject) => {
        let sin = (page-1)*80
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
                        "sex":-100,
                        "genre":-100,
                        "index":-100,
                        "sin":${sin},
                        "cur_page":${page}
                    }
                }
            }`
            })
            .then(res => {
                let data = JSON.parse(res.text)
                let singerList = data.singerList.data.singerlist
                resolve(singerList)
            })
    })
}

function get_star_info(singermid) {
    return new Promise(function (resolve, reject) {
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
                xmlreader.read(res.text, (errors, response) => {
                    if (null !== errors) {
                        return;
                    }
                    if(!response.result.data.info || !response.result.data.info.basic || !response.result.data.info.basic.item || !response.result.data.info.basic.item.array){
                        return resolve('goto')
                    }
                    let arrInfo = response.result.data.info.basic.item.array;
                    var arr = []
                    for (let k = 0; k < arrInfo.length; k++) {
                        switch (arrInfo[k].key.text()) {
                            case '中文名':
                                arr[0] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '外文名':
                                arr[1] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '别名':
                                arr[2] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '国籍':
                                arr[3] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '出生地':
                                arr[4] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '出生日期':
                                arr[5] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '职业':
                                arr[6] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '星座':
                                arr[7] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '毕业学校':
                                arr[8] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '语言':
                                arr[9] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '代表作品':
                                arr[10] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '经纪公司':
                                arr[11] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                            case '唱片公司':
                                arr[12] = arrInfo[k].value.text!==undefined?arrInfo[k].value.text():''
                                break;
                        }
                    }
                    var addSqlParams = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10], arr[11], arr[12]];
                    console.log(JSON.stringify(addSqlParams))
                    connection.query(addSql, addSqlParams, function (err, result) {
                        if (err) {
                            return reject(err)
                        }
                        return resolve(result)
                    });
                });
            })
    })
}

