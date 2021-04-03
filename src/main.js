const http = require('http')
const path = require('path')
const Url = require('url-parse')
const { /* existsSync: exists, */ readFile } = require('fs')
var version = '1.0.0'
try { version = require(path.join(__dirname, '..', 'package.json')).version || '1.0.0' } catch {}
// const showErrorPage = require('./showErrorPage')
const show404 = require('./show404')
const getContentType = require('./getContentType')
const execGinger = require('./execGinger')
const execPhp = require('./execPhp')

module.exports = ($dir = '', port = 80, DEBUG = true, showErrors = true) => {
  const debug = (...something) => { if (DEBUG) console.log(...something) }

  const cwd = process.cwd()
  const dir = path.join(cwd, $dir)

  http.createServer((req, res) => {
    const url = new Url(req.url)
    let $path = path.join(dir, url.pathname)

    if (url.pathname.startsWith('/.ginger')) {
      res.writeHead(308, { Location: '/', server: `ginger v${version}` })
      return res.end()
    }

    readFile($path, (err, data) => {
      if (err) {
        $path = $path.endsWith('/') ? $path.substr(0, $path.length - 1) : $path
        readFile(`${$path}/index.ginger`, (err, data) => {
          if (err) {
            readFile(`${$path}/index.html`, (err, data) => {
              if (err) {
                readFile(`${$path}.ginger`, (err, data) => {
                  if (err) {
                    readFile(`${$path}.html`, (err, data) => {
                      if (err) {
                        readFile(`${$path}.php`, (err, data) => {
                          if (err) {
                            show404(dir, url.pathname, (data) => {
                              res.writeHead(404, { 'Content-Type': 'text/html', server: `ginger v${version}` })
                              res.write(data)
                              res.end()
                            })
                          } else {
                            execPhp(req, res, url, `${$path}.php`, version)
                          }
                        })
                      } else {
                        res.writeHead(200, { 'Content-Type': 'text/html', server: `ginger v${version}` })
                        res.write(data)
                        res.end()
                      }
                    })
                  } else {
                    // res.writeHead(200, { 'Content-Type': 'text/html', server: `ginger v${version}` })
                    // res.write(data)
                    // res.end()
                    execGinger(req, res, url, `${$path}.ginger`, data.toString('utf-8'))
                  }
                })
              } else {
                res.writeHead(200, { 'Content-Type': 'text/html', server: `ginger v${version}` })
                res.write(data)
                res.end()
              }
            })
          } else {
            // res.writeHead(200, { 'Content-Type': 'text/html', server: `ginger v${version}` })
            // res.write(data)
            // res.end()
            execGinger(req, res, url, `${$path}/index.ginger`, data.toString('utf-8'))
          }
        })
      } else {
        if (path.parse($path).ext === '.ginger') {
          execGinger(req, res, url, `${$path}`, data.toString('utf-8'))
        } else if (path.parse($path).ext === '.php') {
          execPhp(req, res, url, `${$path}`, version)
        } else {
          res.writeHead(200, { 'Content-Type': getContentType(path.parse($path).ext), server: `ginger v${version}` })
          res.write(data)
          res.end()
        }
      }
    })
  }).listen(port)
  debug(`Server is listening on ${port}`)
}

// ERR PAGE EXAMPLE
/*
showErrorPage({ err, $path, version, __dirname, dir }, (errPage) => {
  res.writeHead(500, { 'Content-Type': 'text/html', server: `ginger v${version}` })
  res.end(errPage)
})
*/
