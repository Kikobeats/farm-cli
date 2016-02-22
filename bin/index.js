#!/usr/bin/env node

'use strict'

var path = require('path')
var range = require('lodash.range')
var pkg = require('../package.json')
var eachAsync = require('each-async')
var workerFarm = require('worker-farm')
var minimistOptions = require('./minimist-options')

require('update-notifier')({pkg: pkg}).notify()

var cli = require('meow')({
  pkg: pkg,
  help: require('fs').readFileSync(path.join(__dirname, 'help.txt'), 'utf8'),
  argv: require('./config')
}, minimistOptions)

var filename = cli.input[0]
if (!filename) cli.showHelp()

var flags = cli.flags

var fileArgs = process.argv.slice(process.argv.indexOf(filename) + 1)
var workers = flags.workers * flags.cores

var farmOptions = {
  // Allows you to control the lifespan of your child processes.
  // A positive number will indicate that you only want each child to
  // accept that many calls before it is terminated.
  // This may be useful if you need to control memory leaks or similar in child processes.
  maxCallsPerWorker: Infinity,

  // Will set the number of child processes to maintain concurrently.
  // By default it is set to the number of CPUs available on the current system,
  // but it can be any reasonable number, including 1.
  maxConcurrentWorkers: flags.cores,

  // Allows you to control the concurrency of individual child processes.
  // Calls are placed into a queue and farmed out to child processes
  // according to the number of calls they are allowed to handle concurrently.
  // It is arbitrarily set to 10 by default so that calls are shared relatively
  // evenly across workers, however if your calls predictably take a similar
  // amount of time then you could set it to Infinity and Worker Farm won't queue
  // any calls but spread them evenly across child processes and let them go at it.
  // If your calls aren't I/O bound then it won't matter what value you use here as
  // the individual workers won't be able to execute more than a single call at a time.
  maxConcurrentCallsPerWorker: flags.workers,

  // Allows you to control the maximum number of calls in the queue—either actively
  // being processed or waiting for a worker to be processed.
  // Infinity indicates no limit but if you have conditions that may endlessly queue
  // jobs and you need to set a limit then provide a >0 value and any calls that push the
  // limit will return on their callback with a MaxConcurrentCallsError
  // error (check err.type == 'MaxConcurrentCallsError').
  maxConcurrentCalls: Infinity,

  // (use with caution, understand what this does before you use it!) When !== Infinity,
  // will cap a time, in milliseconds, that any single call can take to execute in a worker.
  // If this time limit is exceeded by just a single call then the worker running that call
  // will be killed and any calls running on that worker will have their callbacks returned
  // with a TimeoutError (check err.type == 'TimeoutError'). If you are running with
  // maxConcurrentCallsPerWorker value greater than 1 then all calls currently executing will
  // fail and will be automatically resubmitted uless you've changed the maxRetries option.
  // Use this if you have jobs that may potentially end in infinite loops that you can't
  // programatically end with your child code. Preferably run this with a
  // maxConcurrentCallsPerWorker so you don't interrupt other calls when you have a timeout.
  // This timeout operates on a per-call basis but will interrupt a whole worker.
  maxCallTime: Infinity,

  // Allows you to control the max number of call requeues after worker termination
  // (unexpected or timeout). By default this option is set to Infinity which means that
  // each call of each terminated worker will always be auto requeued.
  // When the number of retries exceeds maxRetries value, the job callback will be executed
  // with a ProcessTerminatedError. Note that if you are running with finite maxCallTime and
  // maxConcurrentCallsPerWorkers greater than 1 then any TimeoutError will increase the
  // retries counter for each concurrent call of the terminated worker.
  maxRetries: flags.retry,

  // When set to true will start the workers as early as possible. Use this when your
  // workers have to do expensive initialization. That way they'll be ready when
  // the first request comes through.
  autoStart: true
}

var workersRange = range(workers)
var spawnWorker = workerFarm(farmOptions, path.resolve(filename))

function spawnDelay (workerArgs, cb) {
  spawnWorker(workerArgs, process.exit)
  setTimeout(cb, flags.delay)
}

function closeFarm () {
  workerFarm.end(spawnWorker)
}

eachAsync(workersRange, function (worker, index, next) {
  var workerArgs = fileArgs.concat(['--worker=' + worker])
  return spawnDelay(workerArgs, next)
}, closeFarm)
