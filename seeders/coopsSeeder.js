const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const faker = require('faker')
const moment = require('moment')

dotenv.config({ path: './config/.env' })

const Coop = require('../models/coop')
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
    await Coop.deleteMany()
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

  let coops = []

  for (let dayCounter = 0; dayCounter < 30; dayCounter++) {
    for (let coopCounter = 0; coopCounter < 3; coopCounter++) {
      let startDate = moment()
        .add(dayCounter, 'd')
        .hour(1)
        .minute(0)
        .second(0)
        .add(faker.random.number(23), 'h')

      const player1 = await User.random()

      const coop = {
        player1: player1.id,
        starts_at: startDate.toDate(),
        ends_at: startDate.add(faker.random.number(5) + 1, 'h').toDate(),
        use_mic: faker.random.boolean(),
        skill: faker.random.arrayElement([1, 2, 3])
      }

      if (faker.random.boolean()) {
        coop.platform = faker.random.arrayElement(platforms)
      } else {
        const game = await Game.random()
        coop.game = game.id
      }

      if (faker.random.boolean()) {
        const player2 = await User.random()
        coop.player2 = player2.id
      }

      coops.push(coop)
    }
  }

  await Coop.create(coops)
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
