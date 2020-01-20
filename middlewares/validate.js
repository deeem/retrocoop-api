const validate = schema => async (req, res, next) => {
  const { error, value } = schema.validate(req.body)

  if (error) {
    console.log(error)
    return res.json({ success: false, error: error })
  }

  next()
}

module.exports = validate
