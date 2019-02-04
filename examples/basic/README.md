# Shared memory

An example to illustrate how to shared memory between workers in the same core.

```bash
$ DEBUG=farm farm -n 1 -w 5 -d 0 examples/basic --your-file-flags foo=bar
```
