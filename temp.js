const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config/.env' })

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const Request = require('./models/request')
const Game = require('./models/game')
const User = require('./models/user')
const Platform = require('./models/platform')

const main = async () => {
  // res = await User.find().select('id').exec()
  res2 = await User.findById('5dd15da9fa600e67025418f6')
  .populate('requests_player1')
  .populate('requests_player2')

  // res = await Platform.fsind().exec()
//   res = await Platform.findById('5dd92164077584064fbce007').populate('games')

//   res = await Game.findById('5dd956ce122ef432a5aafec0')
//     .populate('requests')

  console.log(res)

  process.exit()
}

main()
