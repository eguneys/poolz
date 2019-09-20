# poolz
Pool objects with this simple library

`yarn install poolz`

### Usage

```
import Pool from 'poolz';


let myPool = new Pool(() => new MyObject());

let newItem = myPool.acquire(item => item.onInit());

myPool.release(newItem);

```


### Constructor

`new Pool(makeItem, opts)` makeItem is a function that returns the object to create as new. It takes an `id` argument that's the assigned id of the new object. 

Optional constructor options are:

```
  {
    name: 'poolname', // give a name for debugging purposes
    warnLeak: 100 // warn after 100 allocations
  }
```

`pool.alives()` returns alive object count.

`pool.total()` returns total object count alive and dead.

`pool.toString()` returns a pretty formatted string

`pool.acquire(onInit)` acquires a new item from the pool, reusing a dead one or creating a new one. Takes an optional `onInit` function that is called with the newly acquired item.

`pool.acquireLimit(onInit, limit)` acquires `limit` number of items at once.

`pool.release(item)` releases an item.


`pool.releaseAll()` releases all items.

`pool.releaseIf(p, onRelease)` releases all items where the given predicate `p` is true. Predicate `p` is called with each item and returns a boolean. `onRelease` is called with the released items as argument.

`pool.each(f)` calls function f with each alive item passed as argument.

`pool.find(p)` finds an item where predicate `p` is true.
