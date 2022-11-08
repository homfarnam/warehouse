const express = require('express')
const router = express.Router()
const _ = require('lodash')

const { ApplicationError } = require('../utils')
const repository = require('../repositories/products')

router.get('/', async (req, res, next) => {
  try {
    const products = await repository.list()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await repository.add(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await repository.get(req.params.id)

    if (!_.isObject(product)) {
      return next(new ApplicationError(404, 'Product not found'))
    }

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const product = await repository.get(req.params.id)

    if (!_.isObject(product)) {
      return next(new ApplicationError(404, 'Product not found'))
    }

    if (!_.isUndefined(req.body.name)) {
      product.name = req.body.name
    }

    if (!_.isEmpty(req.body.articles)) {
      product.articles = req.body.articles
    }

    res.status(200).json(await repository.update(product))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await repository.get(req.params.id)

    if (!_.isObject(product)) {
      return next(new ApplicationError(404, 'Product not found'))
    }

    await repository.remove(product.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
