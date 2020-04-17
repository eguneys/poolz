# poolf
Pool objects with this simple library

`yarn install poolf`

### Usage

```
import Pool from 'poolf';


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

`pool.alives()` return alive object count.

`pool.total()` return total object count alive and dead.

`pool.toString()` return a pretty formatted string

`pool.acquire(onInit)` acquire a new item from the pool, reusing a dead one or creating a new one. Takes an optional `onInit` function that is called with the newly acquired item.

`pool.acquireLimit(onInit, limit)` acquire `limit` number of items at once.

`pool.release(item)` release an item.


`pool.releaseAll()` release all items.

`pool.releaseIf(p, onRelease)` release all items where the given predicate `p` is true. Predicate `p` is called with each item and returns a boolean. `onRelease` is called with the released items as argument.

`pool.reduce(f)` reduce alive items.

`pool.map(f)` map each alive item.

`pool.flatMap(f)` flatMap each alive item.

`pool.each(f)` call function f with each alive item passed as argument.

`pool.find(p)` find an item where predicate `p` is true.

`pool.filter(p)` filter items with predicate `p`.
