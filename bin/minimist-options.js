'use strict'

var numCPUs = require('os').cpus().length

module.exports = {
  alias: {
    n: 'cores',
    w: 'workers',
    r: 'retry',
    d: 'delay'
  },

  default: {
    n: numCPUs,
    w: 1,
    r: Infinity,
    d: 1000
  }
}
