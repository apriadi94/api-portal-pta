const artikelService = require('../service/artikelService')

exports.getArtikel = async (req, res) => {
    const { parentId, page } = req.params
    const artikel = await artikelService.getArtikel(parentId, page)
    res.send({
        data: artikel
    })
}