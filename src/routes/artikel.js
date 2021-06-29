const router = require('express').Router()
const artikelController = require('../controllers/artikelController')

router.route('/:parentId/:page')
    .get(artikelController.getArtikel)
    
module.exports = router
