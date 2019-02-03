# Shared memory

An example for illustrating that the memory can be shared between workers in the same core.

```bash
$ DEBUG=farm-cli farm -n 1 -w 5 -d 0 examples/basic --your-file-flags foo=bar
```
