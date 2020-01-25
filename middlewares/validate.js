const validate = schema => async (req, res, next) => {
  const { error } = schema.validate(req.body)

  if (error) {
    const errors = error.details.reduce(
      (acc, item) => ({ ...acc, [item.context.key]: item.message }),
      {}
    )

    return res.status(422).json({ errors })
  }

  next()
}

module.exports = validate
