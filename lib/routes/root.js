module.exports = {
  index: (req, res, next) => {
    if (req.method !== 'GET') {
      res.header('Location', req.url)
      res.send(303)
    } else {
      res.send({
        name: 'node emailer',
        version: '0.0.1'
      })
      return next()
    }
  }
}
