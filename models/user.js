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

module.exports = mongoose.model('User', UserSchema)
