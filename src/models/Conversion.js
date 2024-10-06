const mongoose = require('mongoose')
const {Schema} = mongoose;

const Conversion = mongoose.model(
  'Conversion',
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cryptocurrencyId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    convertedBrl: {
      type: Number,
      required: true,
    },
    convertedUsd: {
      type: Number,
      required: true,
    },
    priceInBrl: {
      type: Number,
      required: true,
    },
    priceInUsd: {
      type: Number,
      required: true,
    },
  }, { timestamps: true })
)

module.exports = Conversion