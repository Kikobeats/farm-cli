'use strict'

const path = require('path')
const meow = require('meow')
const fs = require('fs')

const helpPath = path.resolve(__dirname, '../cli/help.txt')
const pkg = require('../../package.json')
const defaults = require('./default')
const alias = require('./alias')

function getFarmArgs (argv) {
  const cli = meow({
    argv,
    pkg,
    help: fs.readFileSync(helpPath, 'utf8')
  }, {
    alias
  })

  const flags = Object.assign({}, defaults, cli.flags)
  return Object.assign({}, cli, {flags})
}

module.exports = getFarmArgs
