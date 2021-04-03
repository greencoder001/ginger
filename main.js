const main = require('./src/main')
const Argv = require('./src/lib/argv')
const argv = new Argv()

if (typeof require !== 'undefined' && require.main === module) {
  main(argv.get('dir'), argv.get('port'), argv.hasFlag('debug'), !argv.hasFlag('no-error-page'))
}
