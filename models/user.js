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

UserSchema.statics.random = async function() {
  const count = await this.countDocuments()
  const rand = Math.floor(Math.random() * count)
  const randomDoc = await this.findOne().skip(rand)

  return randomDoc
}

module.exports = mongoose.model('User', UserSchema)
