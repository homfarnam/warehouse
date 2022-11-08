const express = require('express')
const router = express.Router()
const _ = require('lodash')

const { ApplicationError } = require('../utils')
const repository = require('../repositories/sales')

router.get('/', async (req, res, next) => {
  try {
    const sales = await repository.list()
    res.status(200).json(sales)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sale = await repository.add(req.body)
    res.status(201).json(sale)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const sale = await repository.get(req.params.id)

    if (!_.isObject(sale)) {
      return next(new ApplicationError(404, 'Sale not found'))
    }

    res.status(200).json(sale)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const sale = await repository.get(req.params.id)

    if (!_.isObject(sale)) {
      return next(new ApplicationError(404, 'Sale not found'))
    }

    if (!_.isUndefined(req.body.amountSold)) {
      sale.amountSold = req.body.amountSold
    }

    res.status(200).json(await repository.update(sale))
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const sale = await repository.get(req.params.id)

    if (!_.isObject(sale)) {
      return next(new ApplicationError(404, 'Sale not found'))
    }

    await repository.remove(sale.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
