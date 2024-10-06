const mongoose = require('../db/conn'); // Certifique-se de que está apontando para o arquivo correto
const { Schema } = mongoose; // Desestruturação correta

// Definindo o modelo User
const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    favorites: [{
      type: Schema.Types.ObjectId, // Isso deve funcionar se a importação estiver correta
      ref: 'Favorite'
    }]
  }, { timestamps: true })
);

module.exports = User;
