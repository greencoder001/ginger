const fs = require('fs')
const path = require('path')

module.exports = (tmp, mainDir) => {
  const encryptionBasic = tmp.encrypt || {}

  mainDir = path.join(mainDir, tmp.dir || '')

  const key = path.join(mainDir, encryptionBasic.key || 'key.pem')
  const cert = path.join(mainDir, encryptionBasic.cert || 'cert.pem')

  return {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert)
  }
}
