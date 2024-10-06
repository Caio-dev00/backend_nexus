require('dotenv').config();
const mongoose = require('mongoose')

async function main() {
  const uri = process.env.MONGODB_URI; // URL de conexão ao MongoDB
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to Mongoose");
}

main().catch((err) => console.log(err))

module.exports = mongoose