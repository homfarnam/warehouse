const express = require('express')
const router = express.Router()
const _ = require('lodash')

const { ApplicationError } = require('../utils')
const repository = require('../repositories/articles')

router.get('/', async (req, res, next) => {
  try {
    const articles = await repository.list()
    res.status(200).json(articles)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const article = await repository.add(req.body)
    res.status(201).json(article)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const article = await repository.get(req.params.id)

    if (!_.isObject(article)) {
      return next(new ApplicationError(404, 'Article not found'))
    }

    res.status(200).json(article)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const article = await repository.get(req.params.id)

    if (!_.isObject(article)) {
      throw new ApplicationError(404, 'Article not found')
    }

    const patchedArticle = applyPatches(article, req.body)
    res.status(200).json(await repository.update(patchedArticle))
  } catch (error) {
    next(error)
  }
})

router.patch('/', async (req, res, next) => {
  try {
    const patchedArticles = await Promise.all(
      _.map(req.body, async (patchedArticle) => {
        const article = await repository.get(patchedArticle.id)

        if (!_.isObject(article)) {
          throw new ApplicationError(404, 'Article not found')
        }

        return applyPatches(article, patchedArticle)
      }),
    )

    await Promise.all(_.map(patchedArticles, async (patchedArticle) => await repository.update(patchedArticle)))
    res.status(200).json(patchedArticles)
  } catch (error) {
    next(error)
  }
})

const applyPatches = (article, patchedArticle) => {
  if (!_.isUndefined(patchedArticle.amountInStock) && !_.isUndefined(patchedArticle.amountToSubtract)) {
    throw new ApplicationError(
      400,
      `Either "amountInStock" or "amountToSubtract" should be provided, not both [Article ID: ${article.id}]`,
    )
  }

  if (!_.isUndefined(patchedArticle.name)) {
    article.name = patchedArticle.name
  }

  if (!_.isUndefined(patchedArticle.amountInStock)) {
    if (!_.isInteger(patchedArticle.amountInStock) || _.lt(patchedArticle.amountInStock, 0)) {
      throw new ApplicationError(400, '"amountInStock" must be a positive integer or 0')
    }

    article.amountInStock = patchedArticle.amountInStock
  }

  if (!_.isUndefined(patchedArticle.amountToSubtract)) {
    if (!_.isInteger(patchedArticle.amountToSubtract) || _.lte(patchedArticle.amountToSubtract, 0)) {
      throw new ApplicationError(400, '"amountToSubtract" must be a positive integer')
    }

    if (_.gt(patchedArticle.amountToSubtract, article.amountInStock)) {
      throw new ApplicationError(400, `Not enough in stock: ${article.amountInStock} [Article ID: ${article.id}]`)
    }

    article.amountInStock -= patchedArticle.amountToSubtract
  }

  return article
}

router.delete('/:id', async (req, res, next) => {
  try {
    const article = await repository.get(req.params.id)

    if (!_.isObject(article)) {
      return next(new ApplicationError(404, 'Article not found'))
    }

    await repository.remove(article.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
