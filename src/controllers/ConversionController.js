const Conversion = require("../models/Conversion");
const axios = require('axios');
const mongoose = require('mongoose');

module.exports = class ConversionController {
  static async convert(req, res) {
    try {
      const { cryptocurrencyId, amount } = req.body;
      let userId = null;

      // Se o usuário estiver logado, adiciona o `userId`
      if (req.user && req.user.id) {
        userId = req.user.id;

        // Verifica se o ID do usuário é válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: 'ID de usuário inválido' });
        }
      }

      // Verifica se a quantidade de criptomoeda é válida
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Valor de conversão inválido' });
      }

      // URL da API para buscar os preços da criptomoeda
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrencyId}&vs_currencies=brl,usd`;

      // Faz a requisição para a API externa
      const response = await axios.get(apiUrl);

      // Verifica se a API respondeu corretamente
      if (response.status === 200 && response.data[cryptocurrencyId]) {
        const priceInBrl = response.data[cryptocurrencyId].brl;
        const priceInUsd = response.data[cryptocurrencyId].usd;

        const convertedBrl = priceInBrl * amount;
        const convertedUsd = priceInUsd * amount;

        // Cria o objeto de conversão
        const conversionData = {
          cryptocurrencyId,
          amount,
          convertedBrl,
          convertedUsd,
          priceInBrl,
          priceInUsd,
        };

        // Se o usuário estiver logado, associa a conversão ao usuário
        if (userId) {
          conversionData.user = userId;
          const conversion = new Conversion(conversionData);
          await conversion.save();
        }

        // Retorna os dados da conversão
        return res.status(200).json(conversionData);
      } else {
        return res.status(404).json({ message: 'Criptomoeda não encontrada' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao converter criptomoeda', error: error.message });
    }
  }
};
