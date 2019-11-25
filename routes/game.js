const express = require('express')

const { index, store, show, update, destroy } = require('../controllers/game')

const router = express.Router()
const modelQuery = require('../middlewares/modelQuery')
const Game = require('../models/game')

router
  .route('/')
  .get(modelQuery(Game), index)
  .post(store)

router
  .route('/:id')
  .get(show)
  .put(update)
  .delete(destroy)

module.exports = router
