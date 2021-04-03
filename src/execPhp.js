const { spawn } = require('child_process')

function parsePHPGet (req, url) {
  const query = url.query.substr(1)
  return query
}

module.exports = (req, res, url, $path, version) => {
  const child = spawn('php', ['-f', $path, '--', 'args', parsePHPGet(req, url)])

  child.on('exit', () => {
    res.end()
  })

  child.on('disconnect', () => {
    res.end()
  })

  child.on('close', () => {
    res.end()
  })

  child.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/plain', server: `ginger v${version}` })
    res.write('Sorry! An error occurred :(')
    res.end()
  })

  child.on('message', msg => {
    res.write(msg)
  })

  child.stdout.on('data', data => {
    res.write(data)
  })

  child.stderr.on('data', data => {
    res.write(data)
  })
}
