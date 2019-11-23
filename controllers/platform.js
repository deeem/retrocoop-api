const Platform = require('../models/platform')
const asyncHandler = require('../middlewares/asyncHandler')

exports.index = asyncHandler(async (req, res, next) => {
  const platforms = await Platform.find()

  res.json({ success: true, count: platforms.length, data: platforms })
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
