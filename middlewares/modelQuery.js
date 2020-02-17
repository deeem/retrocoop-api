const escapeStringRegexp = require('escape-string-regexp');

const filterLike = (query, req) => {
  for (let key in req.query) {
    let item = req.query[key]

    if (typeof item === 'object' && item.hasOwnProperty('like')) {
      query.find({ [key]: { $regex: escapeStringRegexp(item.like), $options: 'i' } })
      delete req.query[key]
    }
  }
}

const filter = (query, req) => {
  const requestQuery = { ...req.query }

  // fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']
  removeFields.forEach(param => delete requestQuery[param])

  // create operators ($gt, $lt, ..etc)
  let queryStr = JSON.stringify(requestQuery)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  return query.find(JSON.parse(queryStr))
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
  let query = model.find({})
  let request = req

  filterLike(query, request)
  filter(query, request)
  select(query, request)
  sort(query, request)

  pagination = await paginate(model, query, request)

  res.modelQuery = query
  res.pagination = pagination
  next()
}

module.exports = modelQuery
