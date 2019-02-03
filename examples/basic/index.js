'use strict'

const shared = []

module.exports = function (opts) {
  const { worker } = opts
  console.log('-----------------------------')
  console.log(`Hello I'm worker #${worker}`)
  const printSharedWorkers = shared.join(' ') || 'none'
  console.log(`The shared variable was visited by ${printSharedWorkers}`)
  shared.push(`#${worker}`)
  console.log('-----------------------------\n')
}
