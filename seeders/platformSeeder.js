const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config({ path: './config/.env' })

const Platform = require('../models/platform')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const deleteData = async () => {
  try {
    await Platform.deleteMany()

    console.log('DATA DELETED...'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(error.red)
  }
}

const importData = async () => {
  try {
    await Platform.create([
      {
        title: 'ZX-Spectrum',
        slug: 'zx'
      },
      {
        title: 'Nintendo Entertainment System',
        slug: 'nes'
      },
      {
        title: 'Super Nintendo',
        slug: 'snes'
      },
      {
        title: 'Sega Mega Drive',
        slug: 'smd'
      }
    ])

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
