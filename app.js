const Joi = require('joi')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const uri = require('./config');
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log("Connected to DB")
})

const movieRouter = require('./routes/movieData')
app.use('/movieData', movieRouter)

const historyRouter = require('./routes/history/index')
app.use('/history', historyRouter)

module.exports = app