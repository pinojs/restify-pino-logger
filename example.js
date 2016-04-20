'use strict'

var restify = require('restify')
var server = restify.createServer({name: 'app'})

server.use(require('./')())

server.get('/', function (req, res) {
  req.log.info('something else')
  res.send('hello world')
})

server.listen(3000)
