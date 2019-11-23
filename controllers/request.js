const asyncHandler = require('../middlewares/asyncHandler')
const Request = require('../models/request')
const User = require('../models/user')
const Game = require('../models/game')
const Platform = require('../models/platform')

exports.index = asyncHandler(async (req, res, next) => {
  const requests = await Request.find()
    .populate({
      path: 'platform',
      model: Platform
    })
    .populate({
      path: 'game',
      model: Game,
      select: 'title description images'
    })
    .populate({
      path: 'player1',
      model: User,
      select: 'name'
    })
    .populate({
      path: 'player2',
      model: User,
      select: 'name'
    })

  res.json({ success: true, count: requests.length, data: requests })
})

exports.store = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in store action' })
})

exports.show = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in show action' })
})

exports.update = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in update action' })
})

exports.destroy = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in destroy action' })
})
