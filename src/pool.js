export default function Pool(makeItem, opts) {
  const defaults = () => ({
    name: 'pool',
    warnLeak: 400
  });

  opts = { ...defaults(), ...opts };

  const makeId = (() => {
    let n = 0;
    return () => n++;
  })();

  let alive = [],
      dead = [];

  this.name = () => opts.name;

  this.alives = () => alive.length;
  this.total = () => dead.length + alive.length;

  this.warnLeak = () => opts.warnLeak;

  this.toString = () => {
    return `[${this.name()} alives: ${this.alives()} deads: ${dead.length}]`;
  };

  this.acquire = (onInit = () => {}) => {
    let item;
    if (this.total() > this.warnLeak()) {
      console.warn(`possible pool leak at ${this.name()}.`);
      this.releaseLast();
    }
    if (dead.length > 0) {
      item = dead.pop();
    } else {
      item = makeItem(makeId());
    }
    onInit(item);
    alive.push(item);
    return item;

  };

  this.acquireLimit = (onInit, limit) => {
    while (this.alives() < limit) {
      this.acquire(onInit);
    }
  };

  this.release = (item) => {
    this.releaseIndex(alive.indexOf(item));
  };

  this.releaseIndex = (i) => {
    if (i > -1) {
      dead.push(alive.splice(i, 1)[0]);
    }
  };

  this.releaseLast = () => {
    this.releaseIndex(0);
  };

  this.releaseAll = () => {
    dead = [...dead, ...alive];
    alive = [];
  };

  this.releaseIf = (p, onRelease = () => {}) => {
    let release = [],
        keep = [];

    alive.forEach(_ => {
      if (p(_)) {
        onRelease(_);
        release.push(_);
      } else {
        keep.push(_);
      }
    });

    alive = keep;
    dead = [...release, ...dead];
  };

  this.reduce = (f, i) => alive.reduce(f, i);

  this.map = (f) => alive.map(f);

  this.flatMap = (f) => alive.flatMap(f);

  this.each = (f) => {
    alive.forEach(f);
  };

  this.find = p => {
    return alive.find(p);
  };

  this.filter = p => {
    return alive.filter(p);
  };

}
