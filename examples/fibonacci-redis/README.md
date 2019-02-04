# Basic

You need to rung redis on local

```
$ redis-server
```

Then run the script:

```bash
$ DEBUG=farm farm --processes=2 --threads=1 --delay 0 examples/fibonacci-redis --n 40
```
