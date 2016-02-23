'use strict'

var fs = require('fs')
var path = require('path')
var existFile = require('exists-file')
var trimNewlinesPath = path.join(__dirname, '..', 'node_modules', 'meow', 'node_modules', 'trim-newlines')
var trimNewlines = require(trimNewlinesPath)
var isDirectory = require('is-directory').sync

var FILENAME = 'worker-farm.opts'

function readConfig () {
  var yargs = process.argv.slice(2)
  if (yargs.length !== 1) return yargs

  var filepath = path.resolve(yargs[0])
  if (!isDirectory(filepath)) filepath = path.join(filepath, '..')
  filepath = path.join(filepath, FILENAME)

  if (!existFile(filepath)) return yargs

  var config = fs.readFileSync(filepath, 'utf8')
  config = trimNewlines(config).split('\n')

  return config.concat(yargs)
}

module.exports = readConfig()
