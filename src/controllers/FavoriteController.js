const Favorite = require('../models/Favorite')
const User = require('../models/Favorite')
const axios = require('axios')
const mongoose = require('mongoose');


module.exports = class FavoriteController {
  static async addFavorite(req, res) {
    try {
      const { userId, cryptocurrencyId } = req.body;
      
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID de usuário inválido' });
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);

      const apiUrl = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyId}`;
      const response = await axios.get(apiUrl)

      if(response.status === 200) {
        const { id, symbol, name } = response.data;

        const existingFavorite = await Favorite.findOne({ user: userObjectId, cryptocurrencyId: id })
        if(existingFavorite) {
          return res.status(400).json({ message: `Criptomoeda ${name} já está nos favoritos`})
        }

        const newFavorite = new Favorite({
          user: userObjectId,
          cryptocurrencyId: id,
          symbol,
          name
        })

        await newFavorite.save()

        await User.findByIdAndUpdate(userId, { $push: {favorites: newFavorite._id}});
        return res.status(201).json(newFavorite)
      } else {
        res.status(404).json({message: 'Criptomoeda não encontrada na API'})
      }

    } catch(error) {
      res.status(500).json({ message: 'Erro ao adicionar favorito', error: error.message});
    }
  }

  static async deleteFavorite(req, res){
    try {
      const { userId, favoriteId } = req.body;

      if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID de usúario inválido'})
      }

      if(!mongoose.Types.ObjectId.isValid(favoriteId)) {
        return res.status(400).json({ message: 'ID de favorito inválido' })
      }

      const userObjectId = new mongoose.Types.ObjectId(userId)

      const favorite = await Favorite.findOne({_id: favoriteId, user: userObjectId });

      if(!favorite) {
        return res.status(404).json({ message: 'Favorito não encontrado '})
      }

      await Favorite.deleteOne({_id: favoriteId});

      await User.findByIdAndUpdate(userObjectId, { $push: {favorites: favoriteId}})

      res.status(200).json({ message: 'Favorito removido com sucesso '})

    }catch(err) {
      console.log(err)
      res.status(500).json({ message: 'Erro ao remover favorito', error: error.message });
    }
  }
}