const mongoose = require('mongoose')

const PlatformSchema = new mongoose.Schema(
  {
    title: String,
    slug: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = mongoose.model('Platform', PlatformSchema)
