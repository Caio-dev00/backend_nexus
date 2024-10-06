const mongoose = require('mongoose')


async function main() {
  await mongoose.connect("mongodb+srv://nexus:nexus@cluster0.oida7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  console.log("Conectou ao Mongoose")
}

main().catch((err) => console.log(err))

module.exports = mongoose