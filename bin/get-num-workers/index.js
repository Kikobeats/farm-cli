'use strict'

function getNumWorkers (flags) {
  return flags.maxConcurrentCallsPerWorker * flags.maxConcurrentWorkers
}

module.exports = getNumWorkers
