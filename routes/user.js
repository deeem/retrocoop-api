const express = require('express')

const { index, store, show, update, destroy } = require('../controllers/user')

const router = express.Router()

router
  .route('/')
  .get(index)
  .post(store)

router
  .route('/:id')
  .get(show)
  .put(update)
  .delete(destroy)

module.exports = router
