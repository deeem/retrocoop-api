const express = require('express')
const Joi = require('@hapi/joi');

const validate = require('../middlewares/validate')
const { index, store, show, update, destroy } = require('../controllers/coop')

const router = express.Router()

const storeValidationSchema = Joi.object({
  game: Joi.string().required(),
  platform: Joi.number().required(),
  starts_at: Joi.date().required(),
  ends_at: Joi.date().required(),
})


router
  .route('/')
  .get(index)
  .post(validate(storeValidationSchema), store)

router
  .route('/:id')
  .get(show)
  .put(update)
  .delete(destroy)

module.exports = router
