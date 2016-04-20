# restify-pino-logger&nbsp;&nbsp;[![Build Status](https://travis-ci.org/davidmarkclements/restify-pino-logger.svg)](https://travis-ci.org/davidmarkclements/restify-pino-logger)

[pino](https://github.com/mcollina/pino) logging [restify](http://npm.im/restify) middleware

To our knowledge, `restify-pino-logger` is the [fastest](#benchmarks) [restify](http://npm.im/restify) logger in town.

* [Installation](#install)
* [Usage](#usage)
* [Benchmarks](#benchmarks)
* [API](#api)
* [Acknowledgements](#acknowledgements)
* [License](#license)

## Benchmarks

Benchmarks log each request/response pair while returning
`'hello world'`, using
[autocannon](https://github.com/mcollina/autocannon) with 100
connections and 10 pipelined requests (`autocannon -c 100 -p 10 http://localhost:3000`).

* `restify.auditLogger` + `bunyan`: 5483.82 req/sec
* `restify-bunyan-logger`: 6306.73 req/sec
* `restify-logger`: 7485.28 req/sec
* `restify-pino-logger`: 8207.46 req/sec
* `restify-pino-logger` (extreme): 8789.28 req/sec
* `restify-pino-logger` (without restify): 22240.73 req/seq
* `restify-pino-logger` (without restify and extreme): 25536 req/sec

All benchmarks where taken on a Macbook Pro 2013 (2.6GHZ i7, 16GB of RAM). 

Whilst we're comparing `restify-pino-logger` against [`restify-logger`](http://npm.im/restify-logger) this isn't really a fair contest. 

`restify-logger` sits on top of [morgan](http://npm.im/morgan).

Morgan doesn't support logging arbitrary data, nor does it output JSON. Further Morgan [uses a form of `eval`](https://github.com/restifyjs/morgan/blob/5da5ff1f5446e3f3ff29d29a2d6582712612bf89/index.js#L383) to achieve high speed logging. Whilst probably safe, using `eval` at all tends to cause concern, particular when it comes to server-side JavaScript.

The fact that `restify-pino-logger` achieves higher throughput with JSON logging **and** arbitrary data, without using `eval`, serves to emphasise the high-speed capabilities of `restify-pino-logger`. 

With `restify-pino-logger` you can have features, safety **and** speed. 

## Install

```
npm i restify-pino-logger --save
```

## Example

```js
'use strict'

var restify = require('restify')
var server = restify.createServer({name: 'app'})

server.use(require('./')())

server.get('/', function (req, res) {
  req.log.info('something else')
  res.send('hello world')
})

server.listen(3000)
```

```
$ node example.js | pino
[2016-04-20T20:50:01.260Z] INFO (11809 on MacBook-Pro-4.local): something else
    req: {
      "id": 1,
      "method": "GET",
      "url": "/",
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*"
      },
      "remoteAddress": "::1",
      "remotePort": 55295
    }
[2016-04-20T20:50:01.267Z] INFO (11809 on MacBook-Pro-4.local): request completed
    res: {
      "statusCode": 200,
      "header": "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: 13\r\nDate: Wed, 20 Apr 2016 20:50:01 GMT\r\nConnection: keep-alive\r\n\r\n"
    }
    responseTime: 8
    req: {
      "id": 1,
      "method": "GET",
      "url": "/",
      "headers": {
        "host": "localhost:3000",
        "user-agent": "curl/7.43.0",
        "accept": "*/*"
      },
      "remoteAddress": "::1",
      "remotePort": 55295
    }
```

## API

`restify-pino-logger` has the same options of
[pino](http://npm.im/pino), look at them there.
`restify-pino-logger` attaches some listeners to the request, so that
it will log when the request is completed.

## License

MIT
