'use strict'

var fs = require('fs')
var path = require('path')
var findIndex = require('lodash.findindex')
var loadOpts = require('load-opts')
var farmConfig = loadOpts('worker-farm')
var isDirectory = require('is-directory').sync

function findFileIndex (arr) {
  return findIndex(arr, function (param) {
    try {
      return fs.statSync(param)
    } catch(err) {}
  })
}

function getFileName (filepath) {
  if (!isDirectory(filepath)) filepath = path.join(filepath, '..')
  return path.basename(filepath)
}

module.exports = function () {
  var yargs = process.argv.slice(2)
  var fileIndex = findFileIndex(yargs)

  var farmArgs = yargs.slice(0, fileIndex + 1)
  farmArgs = farmConfig(farmArgs)

  var filename = getFileName(yargs[fileIndex])
  var fileConfig = loadOpts(filename)

  var fileArgs = yargs.slice(fileIndex).reverse()
  fileArgs = fileConfig(fileArgs)
  fileArgs.reverse().shift()

  return {
    farmArgs: farmArgs,
    fileArgs: fileArgs
  }
}
