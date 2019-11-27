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

PlatformSchema.virtual('requests', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'platform',
  justOne: false
})

PlatformSchema.virtual('games', {
  ref: 'Game',
  localField: '_id',
  foreignField: 'platform',
  justOne: false
})

module.exports = mongoose.model('Platform', PlatformSchema)
