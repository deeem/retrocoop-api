const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const Coop = require('../models/coop')
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
  const data = await Coop.find().populate(populateFields)

  res.json({ success: true, count: data.length, data })
})

exports.store = asyncHandler(async (req, res, next) => {
  await Coop.create(req.body)

  res.json({ success: true })
})

exports.show = asyncHandler(async (req, res, next) => {
  const data = await Coop.findById(req.params.id).populate(populateFields)

  if (!data) {
    next(new ErrorResponse('No resource found'))
  }

  res.json({ success: true, data })
})

exports.update = asyncHandler(async (req, res, next) => {
  await Coop.findByIdAndUpdate(req.params.id, req.body)

  res.json({ success: true })
})

exports.destroy = asyncHandler(async (req, res, next) => {
  const coop = await Coop.findById(req.params.id)

  if (!coop) {
    return next(new ErrorResponse('No resource found'))
  }

  coop.remove()

  res.json({ success: true })
})
