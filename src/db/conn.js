const mongoose = require('mongoose');

// Usando a variável de ambiente definida no Heroku
const uri = process.env.MONGODB_URI;

async function main() {
  try {
    if (!uri) {
      throw new Error('MongoDB URI não definida nas variáveis de ambiente');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro de conexão:", error);
  }
}

main();
