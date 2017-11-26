'use strict'

const {ensureAsync, waterfall, whilst} = require('async')
const mutexify = require('mutexify')

const memo = [1, 1]

function factorial (n) {
  var result = memo[n]
  if (typeof result === 'number') return result
  result = factorial(n - 1) * n
  memo[n] = result
  return result
}

const lock = mutexify()
let index = 0

module.exports = function (opts, cb) {
  const {worker: workerNum, n} = opts

  whilst(
    () => index < n,
    done => waterfall([
      next => lock(release => release(next(null, ++index))),
      ensureAsync((num, next) => {
        const value = factorial(num)
        console.log(`#${workerNum} factorial value=${index} result=${value}`)
        return next()
      })
    ], done),
    cb
  )
}
