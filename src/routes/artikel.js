const router = require('express').Router()
const artikelController = require('../controllers/artikelController')

router.route('/berita/:contentId')
    .get(artikelController.getArtikelById)

router.route('/list/:parentId/:page')
    .get(artikelController.getArtikel)
    
module.exports = router
