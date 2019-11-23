const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const faker = require('faker')

dotenv.config({ path: './config/.env' })

const Game = require('../models/game')
const Platform = require('../models/platform')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const games = JSON.parse(
  fs.readFileSync(`${__dirname}/../public/games.json`, 'utf-8')
)

const deleteData = async () => {
  try {
    await Game.deleteMany()
    console.log('DATA DELETED...'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(error.red)
  }
}

const createData = (games, platform) => {
  return games[platform.slug].map(item => {
    return {
      platform: platform._id,
      title: item.title,
      description: faker.lorem.paragraph(),
      images: item.images.map(image => {
        return process.env.HOST + ':' + process.env.PORT + '/' + image
      })
    }
  })
}

const importData = async () => {
  try {
    const platforms = await Platform.find()

    await Game.create(
      createData(
        games,
        platforms.find(platform => (platform.slug = 'zx'))
      )
    )
    await Game.create(
      createData(
        games,
        platforms.find(platform => (platform.slug = 'nes'))
      )
    )
    await Game.create(
      createData(
        games,
        platforms.find(platform => (platform.slug = 'snes'))
      )
    )
    await Game.create(
      createData(
        games,
        platforms.find(platform => (platform.slug = 'smd'))
      )
    )

    console.log('DATA IMPORTED...'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
