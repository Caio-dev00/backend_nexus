const router = require('express').Router()
const favoriteController = require('../controllers/FavoriteController')
const verifyToken = require('../helpers/verify-token')

router.post('/add', verifyToken, favoriteController.addFavorite)
router.get('/', verifyToken, favoriteController.getFavorites)
router.delete('/delete', verifyToken, favoriteController.deleteFavorite)

module.exports = router;