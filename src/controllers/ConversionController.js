const Conversion = require("../models/Conversion");
const User = require('../models/User')
const mongoose = require('mongoose')
const axios = require('axios')

module.exports = class ConversionController {
  static async convert(req, res) {
    try {
      const { cryptocurrencyId, amount } = req.body;
      const userId = req.user.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID de usuário inválido' });
      }

      if(!amount || amount <= 0) {
        return res.status(400).json({ message: 'Valor de conversão inválido' })
      }

      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrencyId}&vs_currencies=brl,usd`

      const response = await axios.get(apiUrl)

      if (response.status === 200 && response.data[cryptocurrencyId]) {
        const priceInBrl = response.data[cryptocurrencyId].brl;
        const priceInUsd = response.data[cryptocurrencyId].usd;

        const convertedBrl = priceInBrl * amount;
        const convertedUsd = priceInUsd * amount;

        const conversion = new Conversion({
          user: userId,
          cryptocurrencyId,
          amount,
          convertedBrl,
          convertedUsd,
          priceInBrl,
          priceInUsd
        })

        await conversion.save()

        return res.status(200).json({
          userId,
          cryptocurrencyId,
          amount,
          convertedBrl,
          convertedUsd,
          priceInBrl,
          priceInUsd
        })
      } else {
        return res.status(404).json({ message: 'Criptomeda não encontrada' })
      }
    } 
    catch(error) {
      console.log(error)
      return res.status(500).json({ message: 'Erro ao converter criptomoeda', error: error.message });
    }
  }
}