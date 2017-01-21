'use strict'

const isDirectory = require('is-directory').sync
const existsFile = require('exists-file').sync
const alias = require('../get-farm-args/alias')
const path = require('path')
const fs = require('fs')

function getLasDirectory (filename) {
  const filepath = path.resolve(filename)
  if (isDirectory(filepath)) return filepath
  return path.join(filepath, '..')
}

function getConfigPath (folder) {
  return path.resolve(folder, '.farm')
}

function readConfig (filepath) {
  const data = fs.readFileSync(filepath, 'utf8')
  try {
    return JSON.parse(data)
  } catch (err) {
    return {}
  }
}

function resolveAlias (config) {
  return Object.keys(config).reduce(function (acc, key) {
    const value = config[key]
    acc[key] = value
    const keyAlias = alias[key]
    if (keyAlias) acc[keyAlias] = value
    return acc
  }, {})
}

function loadConfig (filename) {
  if (!filename) return {}

  const filepath = path.resolve(filename)
  const folder = getLasDirectory(filepath)
  const configpath = getConfigPath(folder)

  if (!existsFile(configpath)) return {}

  const config = readConfig(configpath)
  return resolveAlias(config)
}

module.exports = loadConfig
