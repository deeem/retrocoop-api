const asyncHandler = require('../middlewares/asyncHandler')
const Game = require('../models/game')
const Platform = require('../models/platform')

exports.index = asyncHandler(async (req, res, next) => {
  const games = await res.modelQuery.populate({
    path: 'platform',
    model: Platform,
    select: 'title slug'
  })

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
  res.json({ success: true, data: 'in show action' })
})

exports.update = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in update action' })
})

exports.destroy = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in destroy action' })
})
