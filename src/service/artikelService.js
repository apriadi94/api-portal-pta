const Models = require('../models')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.getArtikel = async (parentId) => {
    return new Promise((resolve, reject) => {
        Models.sequelize.query(`
            SELECT a.id, a.title, a.introtext
            FROM ydfui_content a
            LEFT JOIN ydfui_assets b ON a.asset_id = b.id
            WHERE b.parent_id = ${parentId}
            ORDER BY a.id DESC
            limit 25
        `).then(async result => {
            const data = JSON.stringify(result[0], null, 2)
            const artikelToJson = JSON.parse(data)
            const artikel = await Promise.all(artikelToJson.map(async item => {
                return { 
                    id: item.id, 
                    title: item.title,
                    image: await getImage(item.introtext)
                }
            }))
            resolve(artikel)
        }).catch(err => {
            reject(err)
        })
    })
}

const getImage = (str) => {
    return new Promise(resolve => {
        const dom = new JSDOM(str, { includeNodeLocations: true });
        const img = dom.window.document.querySelector("img")
        if(img){
            resolve(img.getAttribute('src'))
        }else{
            resolve('')
        }
    })
        
}