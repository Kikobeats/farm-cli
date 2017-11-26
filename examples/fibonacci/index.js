'use strict'

const {ensureAsync, waterfall, whilst} = require('async')
const mutexify = require('mutexify')

const memo = [0, 1]

const fibonacciMemo = function (n) {
  var result = memo[n]
  if (typeof result === 'number') return result
  result = fibonacciMemo(n - 1) + fibonacciMemo(n - 2)
  memo[n] = result
  return result
}

const fibonacci = num => num <= 1 ? 1 : fibonacci(num - 1) + fibonacci(num - 2)

const lock = mutexify()
let index = 0

module.exports = function (opts, cb) {
  const {worker: workerNum, memo, n} = opts
  const fn = memo ? fibonacciMemo : fibonacci

  whilst(
    () => index < n,
    done => waterfall([
      next => lock(release => release(next(null, ++index))),
      ensureAsync((num, next) => {
        const value = fn(num)
        console.log(`#${workerNum} fibonacci value=${index} result=${value}`)
        return next()
      })
    ], done),
    cb
  )
}
