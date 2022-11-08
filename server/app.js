/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const _ = require('lodash')

const utils = require('./utils')
utils.initDatabase()

const indexController = require('./controllers/index')
const articlesController = require('./controllers/articles')
const productsController = require('./controllers/products')
const salesController = require('./controllers/sales')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use(utils.instabilityMiddleware)

app.use('/', indexController)
app.use('/articles', articlesController)
app.use('/products', productsController)
app.use('/sales', salesController)

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  const code = _.isEqual(error.name, 'ApplicationError') ? error.code : 500
  res.status(code).json({
    message: error.message,
  })
})

module.exports = app
