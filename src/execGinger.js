/* eslint no-new-func: 0 */

const path = require('path')
const random = require('randy')

function parseGingerCode (code, req, res, vars, selfDir) {
  var gOut = ''

  const gMain = new Function('__gout', '__vars', 'require', 'selfDir', 'random', `
    function echo (...data) {for (const _ of data) {__gout+=\`\${_}\\n\`}}

    ;try {${code}} catch (e) {
      echo('<span style="color:red">Error: ' + e.message + '</span>');
    };

    for (const [key, value] of Object.entries(global)) {
      if (key === 'global' || typeof key === 'function') continue;
      __vars[key] = value;
    }

    return [ __gout, __vars ];
  `)

  const gexecd = gMain(gOut, vars, require, selfDir, random)

  gOut = gexecd[0]
  vars = gexecd[1]

  return {
    out: gOut,
    vars
  }
}

module.exports = (req, res, url, $path, code) => {
  let vars = {}
  let parsed = code

  parsed = parsed.replace(/<%(.*?)%>/igs, (match, gingerCode) => {
    const pgco = parseGingerCode(gingerCode, req, res, vars, path.parse($path).dir)
    vars = pgco.vars
    const { out } = pgco
    return out
  })

  parsed = parsed.replace(/{{ (.*?) }}/ig, function (match, varKey) {
    return vars[varKey.trim()]
  })

  res.end(parsed)
}
