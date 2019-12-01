const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const Platform = require('../models/platform')

exports.index = asyncHandler(async (req, res, next) => {
  const platforms = await Platform.find()

  res.json({ success: true, count: platforms.length, data: platforms })
})

exports.store = asyncHandler(async (req, res, next) => {
  await Platform.create(req.body)

  res.json({ success: true })
})

exports.show = asyncHandler(async (req, res, next) => {
  const data = await Platform.findById(req.params.id)

  if (!data) {
    next(new ErrorResponse('No resource found'))
  }

  res.json({ success: true, data })
})

exports.update = asyncHandler(async (req, res, next) => {
  await Platform.findByIdAndUpdate(req.params.id, req.body)

  res.json({ success: true })
})

exports.destroy = asyncHandler(async (req, res, next) => {
  const platform = await Platform.findById(req.params.id)

  if (!platform) {
    return next(new ErrorResponse('No resource found'))
  }

  platform.remove()

  res.json({ success: true })
})
