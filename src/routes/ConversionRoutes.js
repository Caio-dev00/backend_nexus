const router = require('express').Router()
const ConversionController = require('../controllers/ConversionController')
const verifyToken = require('../helpers/verify-token')

router.get("/convert", (req, res) => {
  return res.json({ message: "Conversion"})
})
router.post('/convert', verifyToken, ConversionController.convert)

module.exports = router