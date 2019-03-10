# farm-cli

![Last version](https://img.shields.io/github/tag/Kikobeats/farm-cli.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/farm-cli/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/farm-cli)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/farm-cli.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/farm-cli)
[![Dependency status](https://img.shields.io/david/Kikobeats/farm-cli.svg?style=flat-square)](https://david-dm.org/Kikobeats/farm-cli)
[![NPM Status](https://img.shields.io/npm/dm/farm-cli.svg?style=flat-square)](https://www.npmjs.org/package/farm-cli)

![](https://i.imgur.com/BKQqOy4.png)

`farm` allows allows you to create a resilient multi-process architecture from your CLI. It's based on [worker-farm](https://github.com/rvagg/node-worker-farm).

> **Note**: See [examples](/examples) for common user case.

## Installation

First, install the library globally:

```bash
$ npm install farm-cli --global
```

Additionally, you can invoke it using `npx`:

```bash
$ npx farm-cli
```

## Getting Started

### Basic Usage

You need to specify a file and export a main method as entry point.

```js
const createLog = n => (...args) => console.log(`[#${n}] ${args}`)

module.exports = function (opts, exit) {
  const { isMaster, maxWorkers, worker } = opts
  const log = createLog(worker)
  log(`I'm worker ${worker + 1} of ${maxWorkers} ${isMaster ? '(master)' : ''}`)
}
```

Finally, invoke the file using `farm`:

```bash
$ farm examples/basic

[#0] Hello I'm worker 1 of 4 (master)
[#1] Hello I'm worker 2 of 4
[#2] Hello I'm worker 3 of 4
[#3] Hello I'm worker 4 of 4
```

###  Creating Your Own Farm

By default, the library will create as many processes as number of CPUs in the machine and a thread per process.

Let's use the same example but this time specifying multiple threads per process

```bash
$ farm examples/basic --threads=2

[#0] Hello I'm worker 1 of 8 (master)
[#1] Hello I'm worker 2 of 8
[#2] Hello I'm worker 3 of 8
[#4] Hello I'm worker 4 of 8
[#5] Hello I'm worker 5 of 8
[#6] Hello I'm worker 6 of 8
[#7] Hello I'm worker 7 of 8
[#8] Hello I'm worker 8 of 8
```

This time the farm has 2 threads per process (2 threads * 4 cores = 8 workers).

Type `farm --help` to know more.

### Passing File Arguments

The parameters passed after the filename will used as file arguments:

```
$ farm examples/fiboniacci --memoize
[#0] Enable memoize mode!
```

### Load Configuration File

The same things passed to `farm` from a `.farmrc` file created in the same directory.

```bash
$ ls -al examples/load-config

-rw-r--r--@ 1  50 Jan 21  2017 .farmrc
-rw-r--r--@ 1 105 Nov 26  2017 README.md
-rw-r--r--@ 1  50 Jan 21  2017 index.js
```

### Resilient Errors

If a process unexpectedly dies for any reason, it automagically re-enter.

This can be adjusted using `--retries` flag.

Type `farm --help` to know more.

### Finishing the Execution

When you want to finish, call the second argument:

```js
module.exports = function (opts, exit) {
  const { worker } = opts

  setTimeout(() => {
    console.log(`[#${worker}] bye bye!`)
    exit()
  })
}
```

It will finish gracefully when all the threads exit.

### Debug Mode

If you need to debug, enable it passing `DEBUG=farm` as environment variable

```
DEBUG=farm examples/fiboniacci --memoize
```

## License

**farm-cli** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/farm-cli/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/farm-cli/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
