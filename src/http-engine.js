const path = require('path')

module.exports = class Server {
  constructor (temp = {}, mainDir) {
    this.port = parseInt(temp.port || 80) || 80
    this.serverType = temp.type || 'http'

    this.initDir(mainDir, temp)

    this.useHTTPS = this.isHTTPS()
  }

  initDir (mainDir, tmp) {
    if (path.isAbsolute(tmp.dir || mainDir)) {
      this.directory = tmp.dir || mainDir
    } else {
      this.directory = path.join(mainDir, tmp.dir || '')
    }
  }

  isHTTPS () {
    return this.serverType === 'https'
  }

  listen () {
    return this
  }
}
