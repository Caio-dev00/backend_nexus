const router = require('express').Router()
const ConversionController = require('../controllers/ConversionController')
const HistoryController = require('../controllers/HistoryController')
const verifyToken = require('../helpers/verify-token')


router.post('/convert', verifyToken, ConversionController.convert)
router.get('/history', verifyToken, HistoryController.getHistory)

module.exports = router