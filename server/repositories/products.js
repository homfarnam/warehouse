const config = require('../.apprc.json')
const sqlite3 = require('sqlite3').verbose()
const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')

exports.list = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `select
                  id, name
                from
                  products`

    db.all(sql, [], async (error, products) => {
      if (error) {
        return reject(error)
      }

      await Promise.all(_.map(products, (product) => listArticles(db, product)))
      return resolve(products)
    })

    db.close()
  })
}

const listArticles = (db, product) => {
  return new Promise((resolve, reject) => {
    const sql = `select
                  article_id as id, amount_required as amountRequired
                from
                  products_articles
                where
                  product_id = ?`

    db.all(sql, [product.id], (error, articles) => {
      if (error) {
        return reject(error)
      }

      product.articles = articles
      return resolve()
    })
  })
}

exports.add = (product) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `insert into products (
                  id, name
                ) values (
                  ?, ?
                )`

    const id = uuidv4()

    db.run(sql, [id, product.name], (error) => {
      if (error) {
        return reject(error)
      }

      _.each(product.articles, (article) => {
        const sql = `insert into products_articles (
                      product_id, article_id, amount_required
                    ) values (
                      ?, ?, ?
                    )`

        db.run(sql, [id, article.id, article.amountRequired], (error) => {
          if (error) {
            return reject(error)
          }
        })
      })

      return resolve({ id: id, ...product })
    })

    db.close()
  })
}

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `select
                  id, name
                from
                  products
                where
                  id = ?`

    db.get(sql, [id], async (error, product) => {
      if (error) {
        return reject(error)
      }

      if (!_.isUndefined(product)) {
        await listArticles(db, product)
      }

      resolve(product)
    })

    db.close()
  })
}

exports.update = (product) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `update products
                  set name = ?
                where
                  id = ?`

    db.run(sql, [product.name, product.id], (error) => {
      if (error) {
        return reject(error)
      }

      const sql = `delete from
                    products_articles
                  where
                    product_id = ?`

      db.run(sql, [product.id], (error) => {
        if (error) {
          return reject(error)
        }
      })

      _.each(product.articles, (article) => {
        const sql = `insert into products_articles (
                      product_id, article_id, amount_required
                    ) values (
                      ?, ?, ?
                    )`

        db.run(sql, [product.id, article.id, article.amountRequired], (error) => {
          if (error) {
            return reject(error)
          }
        })
      })

      return resolve(product)
    })

    db.close()
  })
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `delete from
                  products
                where
                  id = ?`

    db.run(sql, [id], (error) => {
      if (error) {
        return reject(error)
      }

      const sql = `delete from
                    products_articles
                  where
                    product_id = ?`

      db.run(sql, [id], (error) => {
        if (error) {
          return reject(error)
        }
      })

      return resolve()
    })

    db.close()
  })
}
