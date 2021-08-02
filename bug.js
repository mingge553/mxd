const http = require("./utils/http")
const cheerio = require('cheerio')
const ip = require('./ip')
const data = require('./data')

async function getLevel() {
    let body = await http.handleRequestByPromise( ip + '/tw/p/strategy-monster' )
    let $ = cheerio.load(body)
    const levelList = $('.DBceyBJa > li > strong > a')

    // 获取怪物图鉴地址
    const levelUrl = []
    data.monster = [ ]
    for( const obj of levelList ){
        // https://maple.yampiz.com/tw/p/strategy-monster&Lev=00
        const address = ip + obj.attribs.href
        // console.log( address )
        levelUrl.push(address)
        // 获取怪物图鉴
        await getMonsterMsg(levelUrl[0])
    }


}

/**
 * 打开怪物图鉴
 * @param {*} url 
 */
async function getMonsterMsg( url ){
    let body = await http.handleRequestByPromise( url )
    let $ = cheerio.load(body)
    const tables = $('div[data-id="boxContent"] a[title="archiveBegin"] ~ div > table')
    
    for( const obj of tables ){
        // 获取数据行
        const trs = obj.children[0].children

        for( let i = 0; i < trs.length; i++ ){
            if( i == 0 ){
                continue
            }
            const tds = trs[i].children

            // 怪物名字、等级、图片
            //getMsg( tds[0] )

            // 怪物属性
            const td2 = tds[1]

            // console.log(1)

        }
    }

}

/**
 * 获取怪物信息
 * @param {*} td 
 */
async function getMsg(td){
    const monsterObjs = td.children[0].children
    data.monster.push( { name : monsterObjs[2].children[0].data, level : monsterObjs[4].data } )
}



async function init() {
    await getLevel()

    console.log( data )
}

init()