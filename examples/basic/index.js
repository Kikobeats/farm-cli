'use strict'

const shared = []

module.exports = function (opts, cb) {
  const {
    isMaster,
    worker,
    maxConcurrentCallsPerWorker,
    maxConcurrentWorkers
  } = opts
  const total = maxConcurrentCallsPerWorker * maxConcurrentWorkers
  console.log('-----------------------------')
  console.log(`Hello I'm worker #${worker} ${isMaster ? '(master)' : ''}`)
  const printSharedWorkers = shared.join(' ') || 'none'
  console.log(`The shared variable was visited by ${printSharedWorkers}`)
  shared.push(`#${worker}`)
  console.log('-----------------------------\n')
  if (total === worker + 1) return cb()
}
