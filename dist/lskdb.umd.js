(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.lskdb = {}));
})(this, function(exports2) {
  "use strict";
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
  exports2.LSKDB = LSKDB;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=lskdb.umd.js.map
