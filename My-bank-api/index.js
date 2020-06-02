const express = require('express')
const fs = require('fs').promises
const app = express()
const accountRouter = require('./routes/account')
const winston = require('winston')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc')
const cors = require('cors')

global.fileName = "account.json"

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}:${message}`
})
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" })
  ],
  format: combine(
    label({ label: "my-bank-api" }),
    timestamp(),
    myFormat
  )
})

app.use(express.json())
app.use(cors())
app.use("/account", accountRouter)
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, "utf8")
    logger.info("API started")
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    fs.writeFile(global.fileName, JSON.stringify(initialJson), err => { if (err) console.log(err) })
  }
})