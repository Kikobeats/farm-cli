'use strict'

const shared = []

const humanizeList = require('humanize-list')

const createLog = n => (...args) => console.log(`[#${n}] ${args}`)

module.exports = function (opts, exit) {
  const { isMaster, maxWorkers, worker } = opts
  const log = createLog(worker)

  log(
    `Hello I'm worker ${worker + 1} of ${maxWorkers} ${
      isMaster ? '(master)' : ''
    }`
  )

  shared.push(`#${worker}`)
  log("I' visiting the shared variable!")

  log(
    shared.length
      ? `The shared variable was visited by ${humanizeList(shared)}`
      : `The shared variable never was visited`
  )

  setTimeout(() => {
    log('bye!')
    exit()
  }, 3000)
}
