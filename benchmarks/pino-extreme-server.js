'use strict'

var app = require('restify').createServer({name: 'app'})

app.use(require('../')({
  extreme: true
}))

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)
