const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    starts_at: Date,
    ends_at: Date,
    use_mic: Boolean,
    platform: String,
    game: String,
    skill: String, // ['not played before', 'I know this game', 'I can beat this game']
    player1: String,
    player2: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = mongoose.model('Request', RequestSchema)
