'use strict'

const env = require('dotenv')
const restify = require('restify')
const routes = require('./routes')
const cookieParser = require('restify-cookies')
const logger = require('./services/logger')('index')

const bootstrapper = require('./bootstrapper')

env.config()
bootstrapper.checkConfiguration()

const app = restify.createServer({})
app.pre(restify.pre.sanitizePath())
app.use(restify.CORS())
app.use(restify.bodyParser())
app.use(restify.queryParser())
app.use(cookieParser.parse)

routes.add(app)

function unknownMethodHandler (req, res) {
  if (req.method.toLowerCase() === 'options') {
    const allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With'] // added Origin & X-Requested-With

    if (res.methods.indexOf('OPTIONS') === -1) {
      res.methods.push('OPTIONS')
    }

    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '))
    res.header('Access-Control-Allow-Methods', res.methods.join(', '))
    res.header('Access-Control-Allow-Origin', req.headers.origin)

    return res.send(204)
  } else {
    return res.send(new restify.MethodNotAllowedError())
  }
}

app.on('MethodNotAllowed', unknownMethodHandler)

const port = process.env.PORT || 4000

app.listen(port, () => {
  logger.info('listening on port', port)
})

app.on('error', err => logger.error(err, err.stack))
app.on('uncaughtException', err => logger.error(err, err.stack))
