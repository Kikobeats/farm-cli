'use strict'

const { whilst } = require('async')
const mutexify = require('mutexify')

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

const lock = mutexify()
let index = 0

module.exports = function (opts, exit) {
  const { isMaster, worker, memo, n } = opts
  const fn = memo ? fibonacciMemo : fibonacci

  if (!n) {
    if (isMaster) {
      console.log('Ops! You need to specify the number of iteration with `--n`')
    }
    return exit()
  }

  whilst(
    () => index < n,
    done =>
      lock(release => {
        const value = fn(++index)
        console.log(`#${worker} fibonacci value=${index} result=${value}`)
        return release(done)
      }),
    exit
  )
}
