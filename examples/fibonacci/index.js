'use strict'

const {ensureAsync, waterfall, whilst} = require('async')
const mutexify = require('mutexify')

const memo = [0, 1]

const fibonacci = function (n) {
  var result = memo[n]
  if (typeof result === 'number') return result
  result = fibonacci(n - 1) + fibonacci(n - 2)
  memo[n] = result
  return result
}

const lock = mutexify()
let index = 0

module.exports = function (opts, cb) {
  const {worker: workerNum} = opts

  whilst(
    () => true,
    done => waterfall([
      next => lock(release => release(next(null, ++index))),
      ensureAsync((num, next) => {
        const value = fibonacci(num)
        console.log(`#${workerNum} fibonacci value=${index} result=${value}`)
        return next()
      })
    ], done)
  )
}
