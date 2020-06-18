const express = require('express')
const app = express()

const gradeRouter = require("./routes/routes.js")
app.use(express.json())
app.use("/", gradeRouter)

global.fileName = "./src/data/grades.json"

app.listen(3000, () => console.log("API started"))