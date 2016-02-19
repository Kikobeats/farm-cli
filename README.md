# worker-farm-cli

![Last version](https://img.shields.io/github/tag/Kikobeats/worker-farm-cli.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/worker-farm-cli/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/worker-farm-cli)
[![Dependency status](http://img.shields.io/david/Kikobeats/worker-farm-cli.svg?style=flat-square)](https://david-dm.org/Kikobeats/worker-farm-cli)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/worker-farm-cli.svg?style=flat-square)](https://david-dm.org/Kikobeats/worker-farm-cli#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/worker-farm-cli.svg?style=flat-square)](https://www.npmjs.org/package/worker-farm-cli)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Launch a farm of worker from the CLI. Based on [worker-farm](https://github.com/rvagg/node-worker-farm).

## Install

```bash
$ npm install worker-farm-cli --global
```

## Usage

```bash
$ worker-farm --help

  Launch a farm of worker from the CLI.

  Usage
    $ worker-farm [options] <file>

  Options
    -n, --cores   [default=numCPUs] Cores to use for spawn workers.

    -w, --workers [default=1] Workers to spawn per each core.

    -d, --delay   [default=1000ms] Waiting time between spawning workers.

    -r, --retry   [default=Infinity] Max number of call requeues after unexpected worker termination.

  Examples
    $ worker-farm process.js
    $ worker-farm -w 1 -n 1 process.js
```

## License

MIT © [Kiko Beats](http://kikobeats.com)
