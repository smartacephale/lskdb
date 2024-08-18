export class LSKDB {
  constructor(private prefix = 'lsm-', private lockKey = 'lsmngr-lock') { }

  getAllKeys() {
    const res = [];
    for (const key in localStorage) {
      if (key.startsWith(this.prefix)) {
        res.push(key);
      }
    }
    return res.map(r => r.slice(this.prefix.length));
  }

  getKeys(n = 12, remove = true) {
    const res = [];
    for (const key in localStorage) {
      if (res.length >= n) break;
      if (key.startsWith(this.prefix)) {
        res.push(key);
      }
    }
    if (remove) res.forEach(k => localStorage.removeItem(k));
    return res.map(r => r.slice(this.prefix.length));
  }

  hasKey(key: string) {
    return Object.hasOwn(localStorage, `${this.prefix}${key}`);
  }

  removeKey(key: string | number) {
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  setKey(key: string | number) {
    localStorage.setItem(`${this.prefix}${key}`, '');
  }

  isLocked() {
    const lock = parseInt(localStorage.getItem(this.lockKey) as string);
    const locktime = 5 * 60 * 1000;
    return !(!lock || Date.now() - lock > locktime);
  }

  lock(value: boolean) {
    if (value) {
      localStorage.setItem(this.lockKey, JSON.stringify(Date.now()));
    } else {
      localStorage.removeItem(this.lockKey);
    }
  }
}