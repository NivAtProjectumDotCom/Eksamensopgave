const { Router } = require('express')
const express = require('express')
const app = express()
var Connection = require('tedious').Connection;
var Request = require('tedious').Request
const connection = require('./Database/db_connect')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







