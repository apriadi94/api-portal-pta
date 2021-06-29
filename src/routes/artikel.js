const router = require('express').Router()
const artikelController = require('../controllers/artikelController')

router.route('/:parentId')
    .get(artikelController.getArtikel)
    

module.exports = router
