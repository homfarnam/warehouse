const config = require('../.apprc.json')
const sqlite3 = require('sqlite3').verbose()
const { v4: uuidv4 } = require('uuid')

exports.list = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `select
                  id, name, amount_in_stock as amountInStock
                from
                  articles`

    db.all(sql, [], (error, articles) => (error ? reject(error) : resolve(articles)))

    db.close()
  })
}

exports.add = (article) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `insert into articles (
                  id, name, amount_in_stock
                ) values (
                  ?, ?, ?
                )`

    const id = uuidv4()

    db.run(sql, [id, article.name, article.amountInStock], (error) =>
      error ? reject(error) : resolve({ id: id, ...article }),
    )

    db.close()
  })
}

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `select
                  id, name, amount_in_stock as amountInStock
                from
                  articles
                where
                  id = ?`

    db.get(sql, [id], (error, article) => (error ? reject(error) : resolve(article)))

    db.close()
  })
}

exports.update = (article) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `update articles
                  set name = ?, amount_in_stock = ?
                where
                  id = ?`

    db.run(sql, [article.name, article.amountInStock, article.id], (error) =>
      error ? reject(error) : resolve(article),
    )

    db.close()
  })
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `delete from
                  articles
                where
                  id = ?`

    db.run(sql, [id], (error) => (error ? reject(error) : resolve()))

    db.close()
  })
}
