'use strict'

var bunyan = require('bunyan')
var restifyBunyanLogger = require('restify-bunyan-logger')
var restify = require('restify')
var app = restify.createServer({
  log: bunyan.createLogger({
    name: 'app'
  })
})
app.on('after', restifyBunyanLogger())

app.use(restify.requestLogger())

app.get('/', function (req, res, next) {
  res.send('hello world')
  next()
})

app.listen(3000)
