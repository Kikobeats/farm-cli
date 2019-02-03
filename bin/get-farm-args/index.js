'use strict'

const path = require('path')
const meow = require('meow')
const fs = require('fs')

const helpPath = path.resolve(__dirname, '../cli/help.txt')
const loadConfig = require('../load-config')
const pkg = require('../../package.json')
const defaults = require('./default')
const flags = require('./flags')

function readInput (argv) {
  return meow({
    argv,
    pkg,
    help: fs.readFileSync(helpPath, 'utf8'),
    flags
  })
}

function getFile (cli) {
  return cli.input[0]
}

function getFarmArgs (argv) {
  const cli = readInput(argv)
  const file = getFile(cli)
  const config = loadConfig(file)
  const flags = Object.assign({}, defaults, config, cli.flags)

  return Object.assign(cli, { flags })
}

module.exports = getFarmArgs
