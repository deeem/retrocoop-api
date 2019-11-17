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

GamesSchema.statics.random = async function() {
  const count = await this.countDocuments();
  const rand = Math.floor(Math.random() * count);
  const randomDoc = await this.findOne().skip(rand);

  return randomDoc;
}

module.exports = mongoose.model('Game', GamesSchema)
