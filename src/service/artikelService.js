const Models = require('../models')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const moment = require('moment')
require('moment/locale/id');
const { logger } = require('../utils/logger')


exports.getArtikel = async (parentId, page) => {
    return new Promise((resolve, reject) => {
        const offset =  10 * (Number(page) - 1)
        const limit = Number(page) * 10

        Models.sequelize.query(`
            SELECT a.id, a.title, a.introtext, c.username, a.hits, a.created
            FROM ydfui_content a
            LEFT JOIN ydfui_assets b ON a.asset_id = b.id
            LEFT JOIN ydfui_users c on a.created_by = c.id
            WHERE b.parent_id = ${parentId}
            ORDER BY a.id DESC
            limit ${ offset }, ${ limit }
        `).then(async result => {
            const data = JSON.stringify(result[0], null, 2)
            const artikelToJson = JSON.parse(data)
            const artikel = await Promise.all(artikelToJson.map(async item => {
                return { 
                    id: item.id, 
                    title: item.title,
                    username: item.username,
                    klik: item.hits,
                    image: await getImage(item.introtext),
                    intro: await getText(item.introtext),
                    tanggal: moment(item.created).format('dddd, DD MMMM YYYY')
                }
            }))
            resolve(artikel)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.getArtikelById = (contentId) => {
    return new Promise(resolve => {
        Models.sequelize.query(`
            select a.title, a.introtext, b.username from ydfui_content a
            left join ydfui_users b on a.created_by = b.id
            where a.id = ${contentId}
        `).then(async result => {
            logger.error('tes')
            const data = JSON.stringify(result[0], null, 2)
            const artikelToJson = JSON.parse(data)
            resolve(artikelToJson)
        })
    })
}

const getImage = (str) => {
    return new Promise(resolve => {
        const dom = new JSDOM(str, { includeNodeLocations: true });
        const img = dom.window.document.querySelector("img")
        if(img){
            let image
            if(img.getAttribute('src').includes("http:")){
                image = img.getAttribute('src')
            }else{
                image = `https://www.pta-banjarmasin.go.id/${img.getAttribute('src')}`
            }
            resolve(image)
        }else{
            resolve('https://upload.wikimedia.org/wikipedia/id/6/65/Logo_pta_banjarmasin.jpg')
        }
    })
}

const getText = (str) => {
    return new Promise(resolve => {
        const dom = new JSDOM(str, { includeNodeLocations: true });
        const text = dom.window.document.querySelector("p").textContent
        resolve(text)
    })
}