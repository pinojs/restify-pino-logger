'use strict'

var bunyan = require('bunyan')
var restify = require('restify')
var app = restify.createServer({name: 'app'})

app.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}))

app.get('/', function (req, res, next) {
  res.send('hello world')
  next()
})

app.listen(3000)
