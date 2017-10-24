'use strict'
const port = 3008

const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./config/cors')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

require('./config/routes')(server)

server.use(express.static(__dirname + '/frontend/public/'))
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'))
})

server.listen(port, () => {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server
