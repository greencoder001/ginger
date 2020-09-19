// Modules:
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')

// Ginger Modules:
const Server = require('./http-engine.js')

// Constantes:
const dir = process.cwd()
const config = (() => {
  var raw = ''
  var conf = ''

  try {
    raw = fs.readFileSync('.gingerrc') || '{}'
  } catch {
    throw new Error(`Cannot find file: ${path.join(dir, '.gingerrc')}`)
  }

  try {
    conf = JSON.parse(raw) || {}
  } catch {
    throw new Error(`File ${path.join(dir, '.gingerrc')} is not in valid JSON`)
  }

  return conf
})()

// Init Servers:
for (const server of config.servers) {
  console.log(new Server(server, dir).listen())
}
