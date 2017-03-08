'use strict'

const {whilst} = require('async')
const minDelay = require('min-delay')(500)

function fibonacci (num) {
  if (num <= 1) return 1
  return fibonacci(num - 1) + fibonacci(num - 2)
}

module.exports = function (opts, done) {
  const {worker} = opts
  const condition = () => true

  function log () {
    const args = [`#${worker}`].concat(...arguments)
    console.log(...args)
  }

  whilst(
    condition,
    function (next) {
      const fn = () => {
        const result = fibonacci(worker)
        log(`fibonacci result is ${result}`)
        next()
      }
      minDelay(fn)
    },
    process.exit
  )
}
