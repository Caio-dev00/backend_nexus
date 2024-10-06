const mongoose = require('mongoose')
const { Schema } = mongoose;

const Favorite = mongoose.model(
  'Favorite',
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    cryptocurrencyId: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    }
  }, { timestamps: true })
)


module.exports = Favorite