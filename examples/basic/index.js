'use strict'

module.exports = function (opts) {
  const {worker} = opts
  console.log(`Hello I'm worker #${worker}`)
}
