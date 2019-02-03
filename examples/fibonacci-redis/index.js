'use strict'

const { ensureAsync, waterfall, during } = require('async')
const redis = require('redis').createClient()
const pify = require('pify')
const memo = [0, 1]

const fibonacciMemo = function (n) {
  var result = memo[n]
  if (typeof result === 'number') return result
  result = fibonacciMemo(n - 1) + fibonacciMemo(n - 2)
  memo[n] = result
  return result
}

const fibonacci = num =>
  num <= 1 ? 1 : fibonacci(num - 1) + fibonacci(num - 2)
const REDIS_KEY = 'fibonacci'

module.exports = async function (opts, cb) {
  const { worker: workerNum, memo, n, isMaster } = opts
  const fn = memo ? fibonacciMemo : fibonacci
  if (isMaster) await pify(redis.set(REDIS_KEY, 0))

  during(
    next => redis.get(REDIS_KEY, (err, num) => next(err, num < n)),
    done =>
      waterfall(
        [
          next => redis.incr(REDIS_KEY, (err, n) => next(err, n)),
          ensureAsync((n, next) => {
            const result = fn(n)
            console.log(`#${workerNum} fibonacci n=${n} result=${result}`)
            return next()
          })
        ],
        done
      ),
    cb
  )
}
