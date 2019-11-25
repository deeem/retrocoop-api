const filter = (model, req) => {
  const requestQuery = { ...req.query }

  // fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']

  removeFields.forEach(param => delete requestQuery[param])

  let queryStr = JSON.stringify(requestQuery)

  // create operators ($gt, $lt, ..etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  return model.find(JSON.parse(queryStr))
}

const select = (query, req) => {
  return req.query.select
    ? query.select(req.query.select.split(',').join(' '))
    : query
}

const sort = (query, req) => {
  return req.query.sort
    ? query.sort(req.query.sort.split(',').join(' '))
    : query.sort('-createdAt')
}

const modelQuery = model => (req, res, next) => {
  let query
  query = filter(model, req)
  query = select(query, req)
  query = sort(query, req)

  res.modelQuery = query
  next()
}

module.exports = modelQuery
