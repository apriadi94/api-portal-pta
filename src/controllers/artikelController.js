const artikelService = require('../service/artikelService')

exports.getArtikelById = async (req, res) => {
    const { contentId } = req.params
    const berita = await artikelService.getArtikelById(contentId)
    const arrBerita = berita[0]
    arrBerita.introtext = arrBerita.introtext.replaceAll('src="images', 'src="https://pta-banjarmasin.go.id/images')
    res.send({
        data: arrBerita
    })
}

exports.getArtikel = async (req, res) => {
    const { parentId, page } = req.params
    const artikel = await artikelService.getArtikel(parentId, page)
    res.send({
        data: artikel
    })
}