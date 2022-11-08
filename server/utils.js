const config = require('./.apprc.json')
const sqlite3 = require('sqlite3').verbose()

class ApplicationError extends Error {
  constructor(code = 500, message = '') {
    super(message)
    this.name = 'ApplicationError'
    this.code = code
  }
}

exports.ApplicationError = ApplicationError

exports.initDatabase = () => {
  const db = new sqlite3.Database(config['databaseLocation'])

  db.run(`create table if not exists articles (
            id text primary key,
            name text not null,
            amount_in_stock integer not null default 0
          )`)

  db.run(`create table if not exists products (
            id text primary key,
            name text not null
          )`)

  db.run(`create table if not exists products_articles (
            product_id text not null,
            article_id text not null,
            amount_required integer not null default 0,
            primary key (product_id, article_id)
          )`)

  db.run(`create table if not exists sales (
            id text primary key,
            product_id text not null,
            amount_sold integer not null default 0,
            created_at text not null
          )`)

  db.close()
}

exports.instabilityMiddleware = async (req, res, next) => {
  const n = rollADice(1, 6)

  await sleep(n * 1000)

  if (n == 6) {
    next(new ApplicationError(503, "Oops, something went wrong! This API isn't that reliable is it? :("))
  } else {
    next()
  }
}

const rollADice = (min, max) => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)

  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt)
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
