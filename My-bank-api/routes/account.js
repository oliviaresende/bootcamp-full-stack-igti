const express = require('express')
const router = express.Router()
const fs = require('fs').promises

router.post('/', async (req, res) => {
  let account = req.body
  try {
    let data = await fs.readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    account = { id: json.nextId++, ...account }
    json.accounts.push(account)
    await fs.writeFile(global.fileName, JSON.stringify(json))
    res.end()

    logger.info(`POST /account - ${JSON.stringify(account)}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`POST /account - ${err.message}`)
  }
})

router.get('/', async (_, res) => {
  try {
    let data = await fs.readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    delete json.nextId
    res.send(json)
    logger.info(`GET /account`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`GET /account - ${err.message}`)
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    let data = await fs.readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    res.send(json.accounts.find(account => account.id === id))
    logger.info(`GET /account/${id}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`GET /account/${id} - ${err.message}`)

  }
})

router.delete('/:id', async (req, res) => {
  let id = parseInt(req.params.id)
  try {
    let data = await fs.readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    let accounts = json.accounts.filter(account => account.id !== id)
    json.accounts = accounts
    await fs.writeFile(global.fileName, JSON.stringify(json))
    res.end()
    logger.info(`DELETE /account/${id}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`DELETE /account/${id} - ${err.message}`)
  }
})

router.put('/', async (req, res) => {
  let newAccount = req.body
  try {
    let data = await fs.readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    let oldIndex = json.accounts.findIndex(account => account.id === newAccount.id)
    json.accounts[oldIndex] = newAccount
    await fs.writeFile(global.fileName, JSON.stringify(json))
    res.send(json.accounts[oldIndex])
    logger.info(`PUT /account - ${JSON.stringify(newAccount)}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`PUT /account - ${err.message}`)
  }
})

router.post('/transaction', async (req, res) => {
  let params = req.body
  try {
    let data = await fs.readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    let index = json.accounts.findIndex(account => account.id === params.id)
    if (params.value < 0 && json.accounts[index].balance + params.value < 0) {
      throw new Error("Não há saldo suficiente.")
    }
    json.accounts[index].balance += params.value
    await fs.writeFile(global.fileName, JSON.stringify(json))
    res.send(json.accounts[index])
    logger.info(`POST /account/transaction - ${JSON.stringify(params)}`)
  } catch (err) {
    res.status(400).send({ err: err.message })
    logger.error(`POST /account/transaction - ${err.message}`)
  }
})

module.exports = router