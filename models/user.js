const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

UserSchema.virtual('requests_player1', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'player1',
  justOne: false
})

UserSchema.virtual('requests_player2', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'player2',
  justOne: false
})

UserSchema.statics.random = async function() {
  const count = await this.countDocuments()
  const rand = Math.floor(Math.random() * count)
  const randomDoc = await this.findOne().skip(rand)

  return randomDoc
}

module.exports = mongoose.model('User', UserSchema)
