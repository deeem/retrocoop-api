const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const faker = require('faker')
const moment = require('moment')

dotenv.config({ path: './config/.env' })

const Request = require('../models/request')
const Game = require('../models/game')
const User = require('../models/user')
const Platform = require('../models/platform')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const deleteData = async () => {
  try {
    await Request.deleteMany()
    console.log('DATA DELETED...'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(error.red)
  }
}

const fetchPlatformIds = async () => {
  const platforms = await Platform.find()

  return platforms.map(platform => platform.id)
}

const createData = async () => {

  const platforms = await fetchPlatformIds()

  let requests = []

  for (let dayCounter = 0; dayCounter < 3; dayCounter++) {
    for (let requestCounter = 0; requestCounter < 3; requestCounter++) {
      let startDate = moment()
        .add(dayCounter, 'd')
        .hour(1)
        .minute(0)
        .second(0)
        .add(faker.random.number(23), 'h')

      const player1 = await User.random()

      const request = {
        player1: player1.id,
        starts_at: startDate.toDate(),
        ends_at: startDate.add(faker.random.number(5) + 1, 'h').toDate(),
        use_mic: faker.random.boolean(),
        skill: faker.random.arrayElement([1, 2, 3])
      }

      if (faker.random.boolean()) {
        request.platform = faker.random.arrayElement(platforms)
      } else {
        const game = await Game.random()
        request.game = game.id
      }

      if (faker.random.boolean()) {
        const player2 = await User.random()
        request.player2 = player2.id
      }

      requests.push(request)
    }
  }

  await Request.create(requests)
}

const importData = async () => {
  try {
    await createData()

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
