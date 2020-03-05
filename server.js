const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const dotenv = require('dotenv'); dotenv.config()
const normalizePort = require('normalize-port')

const { createBundleRenderer } = require('vue-server-renderer')

const serverBundle = require('./dist/bundles/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/bundles/vue-ssr-client-manifest.json')
const template = fs.readFileSync('./src/index.template.html', 'utf-8')

const isProd = process.env.APP_ENV === 'production'

const app = express()

const setStatic = (path, cache) => express.static(path, {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use('/dist', setStatic(path.resolve(__dirname, './dist'), true))

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest,
  runInNewContext: false,
  basedir: path.resolve(__dirname, './dist'),
  cache: LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15
  })
})

const serve = (path, cache) => express.static(path, {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.get('*', (request, response) => {
  response.setHeader('Content-Type', 'text/html')

  const context = { url: request.url, cookies: request.cookies, response }

  renderer.renderToString(context, (error, html) => {
    if (error) {
      console.log('[server] err: ', error)

      if (error.url) {
        response.redirect(error.url)
      } else if (error.code === 404) {
        response.status(404).send('404 | Page Not Found')
      } else {
        response.status(500).send('500 | Internal Server Error')
      }
    }

    response.end(html)
  })
})

const port = normalizePort(process.env.APP_PORT || 9999)
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
