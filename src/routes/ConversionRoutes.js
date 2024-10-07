const router = require('express').Router()
const ConversionController = require('../controllers/ConversionController')
const verifyToken = require('../helpers/verify-token')


router.post('/convert', verifyToken, ConversionController.convert)

module.exports = router