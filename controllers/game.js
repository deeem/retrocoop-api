const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const Game = require('../models/game')
const Platform = require('../models/platform')

const populateFields = {
  path: 'platform',
  model: Platform,
  select: 'title slug'
}

exports.index = asyncHandler(async (req, res, next) => {
  const games = await res.modelQuery.populate(populateFields)

  res.json({
    success: true,
    count: games.length,
    data: games,
    pagination: res.pagination
  })
})

exports.store = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in store action' })
})

exports.show = asyncHandler(async (req, res, next) => {
  const data = await Game.findById(req.params.id).populate(populateFields)

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
