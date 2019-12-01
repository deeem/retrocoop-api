const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/user')

exports.index = asyncHandler(async (req, res, next) => {
  const users = await User.find()

  res.json({ success: true, count: users.length, data: users })
})

exports.store = asyncHandler(async (req, res, next) => {
  await User.create(req.body)

  res.json({ success: true })
})

exports.show = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.params.id)

  if (!data) {
    next(new ErrorResponse('No resource found'))
  }

  res.json({ success: true, data })
})

exports.update = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body)

  res.json({ success: true })
})

exports.destroy = asyncHandler(async (req, res, next) => {
  res.json({ success: true, data: 'in destroy action' })
})
