const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const Request = require('../models/request')
const User = require('../models/user')
const Game = require('../models/game')
const Platform = require('../models/platform')

const populateFields = [
  {
    path: 'platform',
    model: Platform
  },
  {
    path: 'game',
    model: Game,
    select: 'title description images'
  },
  {
    path: 'player1',
    model: User,
    select: 'name'
  },
  {
    path: 'player2',
    model: User,
    select: 'name'
  }
]

exports.index = asyncHandler(async (req, res, next) => {
  const requests = await Request.find().populate(populateFields)

  res.json({ success: true, count: requests.length, data: requests })
})

exports.store = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in store action' })
})

exports.show = asyncHandler(async (req, res, next) => {
  const data = await Request.findById(req.params.id).populate(populateFields)

  if (!data) {
    next(new ErrorResponse('No resource found'))
  }

  res.json({ success: true, data })
})

exports.update = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in update action' })
})

exports.destroy = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in destroy action' })
})
