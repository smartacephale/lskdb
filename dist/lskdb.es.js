class LSKDB {
  constructor(prefix = "lsm-", lockKey = "lsmngr-lock") {
    this.prefix = prefix;
    this.lockKey = lockKey;
  }
  prefixedKey(key) {
    return `${this.prefix}${key}`;
  }
  getAllKeys() {
    const res = [];
    for (const key in localStorage) {
      if (key.startsWith(this.prefix)) {
        res.push(key.slice(this.prefix.length));
      }
    }
    return res;
  }
  getKeys(n = 12, remove = true) {
    const res = [];
    for (const key in localStorage) {
      if (res.length >= n) break;
      if (key.startsWith(this.prefix)) {
        res.push(key.slice(this.prefix.length));
      }
    }
    if (remove) {
      res.forEach((k) => this.removeKey(k));
    }
    return res;
  }
  hasKey(key) {
    return localStorage.getItem(this.prefixedKey(key)) !== null;
  }
  removeKey(key) {
    localStorage.removeItem(this.prefixedKey(key));
  }
  setKey(key) {
    localStorage.setItem(this.prefixedKey(key), "");
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
