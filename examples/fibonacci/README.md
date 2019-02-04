# Fibonacci

This example use many workers in the same core for calculate fibonacci values.

```bash
$ DEBUG=farm farm --processes=1 --threads=5 --delay 0 examples/fibonacci --n=20
```

Notes you need to specify the number of values to get using `--n`.

Additionally, you can pass `--memo` for use a memoize implementation.
