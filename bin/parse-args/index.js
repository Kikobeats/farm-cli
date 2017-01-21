'use strict'

const isDirectory = require('is-directory').sync
const isFile = require('is-file')

function getFarmArgs (args, fileIndex) {
  const start = 0
  const end = fileIndex + 1
  return args.slice(start, end)
}

function getFileArgs (args, fileIndex) {
  const start = fileIndex + 1
  const end = args[args.length]
  return args.slice(start, end)
}

function parseArgs (args) {
  const fileIndex = args.findIndex(arg => isFile(arg) || isDirectory(arg))

  return {
    farm: getFarmArgs(args, fileIndex),
    file: getFileArgs(args, fileIndex)
  }
}

module.exports = parseArgs
