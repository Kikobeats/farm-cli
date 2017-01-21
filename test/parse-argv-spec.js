'use strict'

const should = require('should')
const parseArgv = require('../bin/parse-args')

describe('parse args', function () {
  it('farm opts', function () {
    const argv = ['-w', '1', 'example/basic', '--test']
    const {farm: farmConfig} = parseArgv(argv)
    should(farmConfig).be.eql(['-w', '1', 'example/basic'])
  })

  it('file opts', function () {
    const argv = ['-w', '1', 'example/basic', '--test']
    const {file: fileConfig} = parseArgv(argv)
    should(fileConfig).be.eql(['--test'])
  })
})
