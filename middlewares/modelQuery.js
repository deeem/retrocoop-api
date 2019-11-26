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

const paginate = async (model, query, req) => {
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const total = await model.count(query).exec()

  query = query.skip(startIndex).limit(limit)

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  return pagination
}

const modelQuery = model => async (req, res, next) => {
  let query = filter(model, req)
  select(query, req)
  sort(query, req)

  pagination = await paginate(model, query, req)

  res.modelQuery = query
  res.pagination = pagination
  next()
}

module.exports = modelQuery
