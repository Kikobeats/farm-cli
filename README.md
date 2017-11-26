# farm-cli

![Last version](https://img.shields.io/github/tag/Kikobeats/farm-cli.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/farm-cli/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/farm-cli)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/farm-cli.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/farm-cli)
[![Dependency status](https://img.shields.io/david/Kikobeats/farm-cli.svg?style=flat-square)](https://david-dm.org/Kikobeats/farm-cli)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/farm-cli.svg?style=flat-square)](https://david-dm.org/Kikobeats/farm-cli#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/farm-cli.svg?style=flat-square)](https://www.npmjs.org/package/farm-cli)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

![](https://i.imgur.com/BKQqOy4.png)

> Launch a farm of worker from the CLI. Based on [worker-farm](https://github.com/rvagg/node-worker-farm).

## Install

```bash
$ npm install farm-cli --global
```

## Usage

```
Usage
  $ farm [options] <file>

Options
  -n, --cores   [default=numCPUs] Cores to use for spawn workers.

  -w, --workers [default=1] Workers to spawn per each core.

  -d, --delay   [default=1000ms] Waiting time between spawning workers.

  -r, --retries [default=Infinity] Max number of call requeues after unexpected worker termination.

It's possible to load [options] from file, creating '.farmrc' JSON file on the path of <file>.

Examples
  $ farm process
  $ farm -w 1 -n 1 process
  $ farm -w 1 -n 1 process foo=bar
```

See more at [examples](/examples).

## License

MIT © [Kiko Beats](http://kikobeats.com)
