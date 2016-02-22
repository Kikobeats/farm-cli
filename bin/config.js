'use strict'

var fs = require('fs')
var path = require('path')
var existFile = require('exists-file')

var minimistPath = path.join(__dirname, '..', 'node_modules', 'meow', 'node_modules', 'minimist')
var minimist = require(minimistPath)

var trimNewlinesPath = path.join(__dirname, '..', 'node_modules', 'meow', 'node_modules', 'trim-newlines')
var trimNewlines = require(trimNewlinesPath)

var FILENAME = 'worker-farm.opts'

function readConfig (filepath) {
  var yargs = process.argv.slice(2)
  if (yargs.length > 1) return yargs

  var filepath = path.resolve(yargs[0], FILENAME)
  if (!existFile(filepath)) return yargs

  var config = fs.readFileSync(filepath, 'utf8')
  config = trimNewlines(config).split('\n')

  return config.concat(yargs)
}

module.exports = readConfig()
