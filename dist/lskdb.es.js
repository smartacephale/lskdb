class LSKDB {
  constructor(prefix = "lsm-", lockKey = "lsmngr-lock") {
    this.prefix = prefix;
    this.lockKey = lockKey;
  }
  getAllKeys() {
    const res = [];
    for (const key in localStorage) {
      if (key.startsWith(this.prefix)) {
        res.push(key);
      }
    }
    return res.map((r) => r.slice(this.prefix.length));
  }
  getKeys(n = 12, remove = true) {
    const res = [];
    for (const key in localStorage) {
      if (res.length >= n) break;
      if (key.startsWith(this.prefix)) {
        res.push(key);
      }
    }
    if (remove) res.forEach((k) => localStorage.removeItem(k));
    return res.map((r) => r.slice(this.prefix.length));
  }
  hasKey(key) {
    return Object.hasOwn(localStorage, `${this.prefix}${key}`);
  }
  removeKey(key) {
    localStorage.removeItem(`${this.prefix}${key}`);
  }
  setKey(key) {
    localStorage.setItem(`${this.prefix}${key}`, "");
  }
  isLocked() {
    const lock = parseInt(localStorage.getItem(this.lockKey));
    const locktime = 5 * 60 * 1e3;
    return !(!lock || Date.now() - lock > locktime);
  }
  lock(value) {
    if (value) {
      localStorage.setItem(this.lockKey, JSON.stringify(Date.now()));
    } else {
      localStorage.removeItem(this.lockKey);
    }
  }
}
export {
  LSKDB
};
//# sourceMappingURL=lskdb.es.js.map
