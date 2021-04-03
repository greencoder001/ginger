const mime = require('mime.json')

module.exports = ext => {
  var contentType = 'text/plain'

  switch (ext) {
    case '.htm':
      contentType = 'text/html'
      break
    case '.html':
      contentType = 'text/html'
      break
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
    case '.jpeg':
      contentType = 'image/jpg'
      break
    case '.wav':
      contentType = 'audio/wav'
      break
    case '.mp4':
      contentType = 'video/mp4'
      break
    case '.mp3':
      contentType = 'audio/mpef'
      break
    case '.ogg':
      contentType = 'audio/ogg'
      break
    case '.zip':
      contentType = 'application/zip'
      break
    case '.xml':
      contentType = 'application/xml'
      break
    case '.csv':
      contentType = 'text/comma-separated-value'
      break
    default:
      contentType = mime[ext.substr(1)] || 'text/plain'
  }

  return contentType
}
