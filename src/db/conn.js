const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente

const mongoURI = process.env.MONGODB_URI; // Substitua pelo seu URI

// Conectando ao MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Exportando a instância do mongoose
module.exports = mongoose;