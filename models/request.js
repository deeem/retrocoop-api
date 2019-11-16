const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    starts_at: Date,
    ends_at: Date,
    use_mic: Boolean,
    platform: {
      type: String,
      enum: ['zx', 'nes', 'snes', 'smd']
    },
    game: String,
    skill: String, // ['not played before', 'I know this game', 'I can beat this game']
    user: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = mongoose.model('Request', RequestSchema)
