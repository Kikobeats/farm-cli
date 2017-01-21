'use strict'

function getWorkerArgs (fileOpts, worker) {
  const workerArgs = [`--worker=${worker}`]
  if (worker === 0) workerArgs.push('--isMaster')
  else workerArgs.push('--no-isMaster')
  return fileOpts.concat(workerArgs)
}

module.exports = getWorkerArgs
