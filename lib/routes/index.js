'use strict'

const root = handleErrors(require('./root'))
const email = handleErrors(require('./email'))

function handleErrors (mod) {
  Object.keys(mod)
    .filter(key => {
      return typeof mod[key] === 'function'
    })
    .forEach(key => {
      const fn = mod[key]
      mod[key] = (req, res, next) => {
        try {
          return fn(req, res, next)
        } catch (err) {
          return next(err)
        }
      }
    })
  return mod
}

exports.add = app => {
  app.get('/', root.index)
  app.post('/', email.send)
}
