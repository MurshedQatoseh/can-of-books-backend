'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())

// ----- mongoose configs -----//

mongoose.connect('mongodb://localhost:27017/Books', { useNewUrlParser: true, useUnifiedTopology: true })

const booksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
})

const book = mongoose.model('books', booksSchema)

// Seed data
async function seedData () {
  const firstBook = new book({
    title: 'The Prince',
    description: 'The Prince is a 16th-century political treatise written by Italian diplomat and political theorist Niccolò Machiavelli as an instruction guide for new princes and royals.',
    status: 'Available'
  })

  const secondBook = new book({
    title: 'The Art of War',
    description: 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters.',
    status: 'Available'
  })

  const thirdBook = new book({
    title: 'the kite runner',
    description: 'it tells the story of Amir, a young boy from the Wazir Akbar Khan district of Kabul..',
    status: 'Available'
  })

  await firstBook.save()
  await secondBook.save()
  await thirdBook.save()
}
// seedData();

const PORT = process.env.PORT

app.get('/', homeRouteHandler)

function homeRouteHandler (req, res) {
  res.send('Welcome to the home route')
}

app.get('/books', booksRouteHandler)

function booksRouteHandler (req, res) {
  book.find({}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

app.get('/test', (req, res) => {
  res.send('test request received')
})

app.get('*', errorRouteHandler)

function errorRouteHandler (req, res) {
  res.send('404 PAGE NOT FOUND!')
}

app.listen(PORT, () => console.log(`listening on ${PORT}`))
