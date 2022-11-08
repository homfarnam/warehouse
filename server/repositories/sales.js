const config = require('../.apprc.json')
const sqlite3 = require('sqlite3').verbose()
const { v4: uuidv4 } = require('uuid')
const { DateTime } = require('luxon')

exports.list = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `select
                  id, created_at as createdAt, product_id as productId, amount_sold as amountSold
                from
                  sales`

    db.all(sql, [], (error, sales) => (error ? reject(error) : resolve(sales)))

    db.close()
  })
}

exports.add = (sale) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `insert into sales (
                  id, created_at, product_id, amount_sold
                ) values (
                  ?, ?, ?, ?
                )`

    const id = uuidv4()
    const createdAt = DateTime.utc().toISO({ includeOffset: false })

    db.run(sql, [id, createdAt, sale.productId, sale.amountSold], (error) =>
      error ? reject(error) : resolve({ id: id, createdAt: createdAt, ...sale }),
    )

    db.close()
  })
}

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `select
                  id, created_at as createdAt, product_id as productId, amount_sold as amountSold
                from
                  sales
                where
                  id = ?`

    db.get(sql, [id], (error, sale) => (error ? reject(error) : resolve(sale)))

    db.close()
  })
}

exports.update = (sale) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `update sales
                  set amount_sold = ?
                where
                  id = ?`

    db.run(sql, [sale.amountSold, sale.id], (error) => (error ? reject(error) : resolve(sale)))

    db.close()
  })
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(config['databaseLocation'])

    const sql = `delete from
                  sales
                where
                  id = ?`

    db.run(sql, [id], (error) => (error ? reject(error) : resolve()))

    db.close()
  })
}
