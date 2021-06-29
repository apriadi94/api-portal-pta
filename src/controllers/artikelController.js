const artikelService = require('../service/artikelService')

exports.getArtikel = async (req, res) => {
    const { parentId } = req.params
    const artikel = await artikelService.getArtikel(parentId)
    res.send({
        data: artikel
    })
}