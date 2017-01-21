# throw-error

If the process throw an error, then the child worker will spawned again.

```bash
$ DEBUG=worker-farm-cli worker-farm -w 1 -n 1 -d 0 example/throw-error --your-file-flags foo=bar
```
