const { readFile } = require('fs')
const path = require('path')

module.exports = function ({ err, $path, version, __dirname: dirname, dir }, _cb) {
  readFile(path.join(dir, '.ginger', '505.html'), (e, data) => {
    if (e) {
      _cb(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <title>500 - Internal Server Error</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        font-family: 'Open Sans', sans-serif;
      }

      .errbox {
        margin-top: 3vh;
        margin-bottom: 3vh;
        margin-left: 3vw;
        margin-right: 3vw;
        background: #afafaf;
        height: 88vh;
        width: 84vw;
        padding-top: 3vh;
        padding-left: 5vw;
        padding-right: 5vw;
        padding-bottom: 3vh;
        text-align: center;
        overflow: auto;
      }

      @media only screen and (prefers-color-scheme: dark) {
        body { color: #fff; background: #242424; }
        .errbox { background: #373737; }
      }
    </style>
  </head>
  <body>
    <div class="errbox">
      <h1>500 - Internal Server Error</h1>
      <p>An internal server error occurred. Please contact the administrator!</p>
      <p>${err.message}</p>

      <hr />

      <h2>Ginger v${version}</h2>
    </div>
  </body>
</html>`)
    } else {
      _cb(data.toString('utf-8').replace(/%g/g, `Ginger v${version}`).replace(/%v/g, version).replace(/%s/g, err.message).replace(/%c/g, `<style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          font-family: 'Open Sans', sans-serif;
        }

        .errbox {
          margin-top: 3vh;
          margin-bottom: 3vh;
          margin-left: 3vw;
          margin-right: 3vw;
          background: #afafaf;
          height: 88vh;
          width: 84vw;
          padding-top: 3vh;
          padding-left: 5vw;
          padding-right: 5vw;
          padding-bottom: 3vh;
          text-align: center;
          overflow: auto;
        }

        @media only screen and (prefers-color-scheme: dark) {
          body { color: #fff; background: #242424; }
          .errbox { background: #373737; }
        }
      </style>`).replace(/%e/g, `
        <div class="errbox">
          <h1>500 - Internal Server Error</h1>
          <p>An internal server error occurred. Please contact the administrator!</p>
          <p>${err.message}</p>

          <hr />

          <h2>Ginger v${version}</h2>
        </div>
      `))
    }
  })
}
