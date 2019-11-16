const mongoose = require('mongoose')

const GamesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Game Title is required']
    },
    description: String,
    images: Array,
    platform: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = mongoose.model('Game', GamesSchema)
