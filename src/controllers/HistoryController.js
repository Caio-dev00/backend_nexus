const Conversion = require('../models/Conversion');

const HistoryController = {
  getHistory: async (req, res) => {
    const userId = req.user.id;

    try {
      const history = await Conversion.find({ user: userId }).populate('cryptocurrencyId');

      if (!history || history.length === 0) {
        return res.status(404).json({ message: 'Nenhuma conversão encontrada.' });
      }

      return res.status(200).json(history);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar histórico de conversões.' });
    }
  },
};

module.exports = HistoryController;