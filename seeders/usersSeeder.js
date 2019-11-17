const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const faker = require('faker')

dotenv.config({ path: './config/.env' })

const User = require('../models/user')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const deleteData = async () => {
  try {
    await User.deleteMany()

    console.log('DATA DELETED...'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(error.red)
  }
}

const importData = async () => {
  try {
    const users = []
    for (let i = 0; i < 5; i++) {
      users.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    }

    await User.create(users)

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
