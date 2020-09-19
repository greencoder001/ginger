const path = require('path')

const http = require('http')
const https = require('https')

const generateCredentials = require('./generateCredentials.js')

module.exports = class GingerServer {
  constructor (temp = {}, mainDir) {
    this.port = parseInt(temp.port || 80) || 80
    this.serverType = temp.type || 'http'
    this.debug = temp.debug || this.port

    this.initDir(mainDir, temp)

    this.useHTTPS = this.isHTTPS()

    // ########

    this.initDefaultNodeJsServer(temp, mainDir)
  }

  initDir (mainDir, tmp) {
    if (path.isAbsolute(tmp.dir || mainDir)) {
      this.directory = tmp.dir || mainDir
    } else {
      this.directory = path.join(mainDir, tmp.dir || '')
    }
  }

  cookies (request) {
    const cookies = {}
    request.headers.cookie.split(';').forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/)
      cookies[decodeURIComponent(parts[1]).trim()] = (decodeURIComponent(parts[2]) || '').trim()
    })
    return cookies
  }

  initDefaultNodeJsServer (temp, mainDir) {
    this.handler = (req, res) => {
      const { url, headers } = req

      console.log(`Request at server ${this.debug} with URL ${url}: ${headers['user-agent']}`)
      res.end()
    }

    if (this.useHTTPS) {
      this.raw = https.createServer(generateCredentials(temp, mainDir), this.handler)
    } else {
      this.raw = http.createServer(this.handler)
    }
  }

  isHTTPS () {
    return this.serverType === 'https'
  }

  listen () {
    this.raw.listen(this.port)
    return `Server ${this.debug} is running on port ${this.port}`
  }
}
