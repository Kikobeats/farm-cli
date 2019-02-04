# throw-error

If the process throw an error, then the child worker will spawned again.

```bash
$ DEBUG=farm farm -w 1 -n 1 -d 0 examples/throw-error --your-file-flags foo=bar
```
