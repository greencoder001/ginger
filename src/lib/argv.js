class Argv {
  constructor (_rawArgv) {
    this.setRawArgv(_rawArgv)
    this.setBasic()
  }

  setBasic () {
    this.settings = {}
    this.executable = this.rawArgv[0] || 'node'
    this.script = this.rawArgv[1] || 'unknown-script.js'
    this.__realArgs = this.rawArgv.slice(2)

    this.setFlags()
    this.setSettings()
  }

  getArgs () {
    return this.__realArgs
  }

  setSettings () {
    let currentKey = null

    for (const _arg of this.__realArgs) {
      if (currentKey !== null) {
        this.settings[currentKey.substr(1)] = _arg.trim()
        currentKey = null
      }

      if (this.isFlag(_arg)) continue
      if (!(_arg.trim().startsWith('-'))) continue

      if (_arg.trim().includes('=')) {
        this.settings[_arg.substr(1).split('=')[0]] = _arg.substr(1).split('=')[1]
      }

      currentKey = _arg.trim()
    }
  }

  get (key) {
    if (typeof key === 'number') return this.__realArgs[key]
    return this.settings[key]
  }

  isFlag (arg) {
    return arg.trim().startsWith('--')
  }

  setFlags () {
    const flags = this.__realArgs.filter(flag => {
      return this.isFlag(flag)
    })

    flags.forEach((flag, i) => {
      flags[i] = flag.substr(2)
    })

    this.flags = flags
  }

  setRawArgv (rawArgv = this.getDefaultRawArgv()) {
    this.rawArgv = rawArgv
  }

  hasFlag (flag) {
    return this.__inOperatorForArray(flag, this.flags)
  }

  __inOperatorForArray (elem, arr) {
    for (const _elem of arr) {
      if (_elem === elem) return true
    }

    return false
  }

  getDefaultRawArgv () {
    try {
      if (process.argv) return process.argv
    } catch { return ['node', 'unknown-script.js'] }
  }
}

module.exports = Argv
