const express = require("express");
const router = express.Router();
const fs = require("fs").promises

const readFile = async () => {
  try {
    let fileJson = await fs.readFile(global.fileName, 'utf8')
    fileJson = JSON.parse(fileJson)
    return fileJson
  } catch (err) {
    return err
  }
}

router.post('/grade', async (req, res) => {
  const { student, subject, type, value } = req.body
  try {
    let fileJson = await readFile()
    let data = {
      id: fileJson.nextId++,
      student: student,
      subject: subject,
      value: value,
      type: type,
      timestamp: new Date(),
    }
    fileJson.grades.push(data)
    fs.writeFile(global.fileName, JSON.stringify(fileJson))
    res.json({
      ok: true,
      message: "Success",
      grade: data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.put('/grade/:id', async (req, res) => {
  let { id } = req.params
  const { student, subject, type, value } = req.body
  try {
    let fileJson = await readFile()
    let index = fileJson.grades.findIndex(grade => parseInt(grade.id) === parseInt(id))
    if (index === -1)
      return res.status(404).json({ message: 'Grade not found' })
    else if (!student || !subject || !type || !value)
      return res.status(400).json({ message: 'Must informe student, subject, type and value to update a grade' })
    else {
      const timestamp = new Date();
      let updatedGrade = { id, student, subject, value, type, timestamp }
      fileJson.grades[index] = updatedGrade
    }
    await fs.writeFile(global.fileName, JSON.stringify(fileJson))
    res.json({
      ok: true,
      message: "Edited Success",
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.delete('/grade/:id', async (req, res) => {
  let { id } = req.params
  try {
    let fileJson = await readFile()
    let grades = fileJson.grades.filter(grade => parseInt(grade.id) !== parseInt(id))
    fileJson.grades = grades
    await fs.writeFile(global.fileName, JSON.stringify(fileJson))
    res.json({
      ok: true,
      message: "Removed Success",
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get('/grade', async (req, res) => {
  try {
    let fileJson = await readFile()
    res.json(fileJson.grades)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get('/grade/:id', async (req, res) => {
  let { id } = req.params
  try {
    let fileJson = await readFile()
    let index = fileJson.grades.findIndex(grade => parseInt(grade.id) === parseInt(id))
    if (index === -1)
      return res.status(404).json({ message: 'Grade not found' })
    else
      return res.json(fileJson.grades[index])
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get("/soma", async (req, res) => {
  const { student, subject } = req.query
  console.log(student, subject)
  try {
    let fileJson = await readFile()
    let studentName = fileJson.grades.filter(grade => grade.student === student)
    let sum = 0
    let subjectStudent = studentName.filter(student => {
      if (student.subject === subject) {
        return (sum += student.value)
      }
    })
    res.json({
      ok: true,
      subject: subjectStudent,
      result: `Soma das notas subject: ${subject} =  ${sum}`,
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get("/media", async (req, res) => {
  const { type, subject } = req.query
  try {
    let fileJson = await readFile()
    let typeParam = fileJson.grades.filter(grade => grade.type === type)
    let sum = 0
    let count = 0
    let subjectType = typeParam.filter((grade) => {
      if (grade.subject === subject) {
        count++;
        return (sum += grade.value)
      }
    })

    res.json({
      ok: true,
      subject: subjectType,
      result: `Média: ${subject} do tipo ${type}=  ${sum / count}`,
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.get("/melhores", async (req, res) => {
  const { type, subject } = req.query
  try {
    let fileJson = await readFile()

    let typeData = fileJson.grades.filter(grade => grade.type === type)

    let subjectData = typeData.filter(grade => grade.subject === subject)
    subjectData = subjectData.sort((a, b) => b.value - a.value)

    let initialID = 1
    let result = []
    subjectData.filter(grade => {
      if (initialID < 4) {
        result.push({ ...grade })
        initialID++
      }
    })

    res.json({
      ok: true,
      result: result,
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

module.exports = router