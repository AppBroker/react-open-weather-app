const express = require('express')
const next = require('next')
const compression = require('compression')
const mcache = require('memory-cache')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()
const appPort = dev ? 3000 : process.env.PORT

// Memory Cache Control
const cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    }
    res.sendResponse = res.send
    res.send = (body) => {
      mcache.put(key, body, duration * 1000)
      res.sendResponse(body)
    }
    next()
  }
}

app
  .prepare()
  .then(() => {
    const server = express()
    if (!dev) {
      server.use(compression())
    }

    // Browser Cache Control
    server.use((req, res, next) => {
      res.header('Cache-Control', 'max-age=2592000')
      next()
    })

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post'
      const queryParams = { slug: req.params.slug, apiRoute: 'post' }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/page/:slug', (req, res) => {
      const actualPage = '/post'
      const queryParams = { slug: req.params.slug, apiRoute: 'page' }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/special/:slug', (req, res) => {
      const actualPage = '/special'
      const queryParams = { slug: req.params.slug, apiRoute: 'special' }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/_preview/:id/:wpnonce', (req, res) => {
      const actualPage = '/preview'
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', cache(600), (req, res) => {
      return handle(req, res)
    })

    server.listen(appPort, err => {
      if (err) {
        throw err
      }
      console.log('> Ready on port ' + appPort)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
