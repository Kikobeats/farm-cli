#!/usr/bin/env node

'use strict'

const pkg = require('../../package.json')
require('update-notifier')({pkg}).notify()
const debug = require('debug')(pkg.name)

const workerFarm = require('worker-farm')
const minimist = require('minimist')
const series = require('run-series')
const path = require('path')

const getNumWorkers = require('../get-num-workers')
const getWorkerArgs = require('../get-worker-args')
const getFarmArgs = require('../get-farm-args')
const parseArgs = require('../parse-args')

const processArgv = process.argv.slice(2)
const argv = parseArgs(processArgv)
const cli = getFarmArgs(argv.farm)

const [filename] = cli.input
if (!filename) cli.showHelp()

const {file: fileOpts} = argv
const {flags: farmOpts} = cli

const {delayBetweenWorkers} = farmOpts
const numWorkers = getNumWorkers(farmOpts)
const workersRange = [...Array(numWorkers).keys()]
const spawnWorkers = workersRange.map(spawnWorker)

function spawnWorker (id) {
  const workerArgs = getWorkerArgs(fileOpts, id)
  const parsedArgs = minimist(workerArgs)

  function worker (cb) {
    debug('creating %o', parsedArgs)
    farm(parsedArgs, process.exit)
    return setTimeout(cb, delayBetweenWorkers)
  }

  return worker
}

const filePath = path.resolve(filename)
debug('initializing %O', farmOpts)
const farm = workerFarm(farmOpts, filePath)

series(spawnWorkers, function () {
  workerFarm.end(farm)
  debug('finished')
})
