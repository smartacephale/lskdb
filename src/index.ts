export class LSKDB {
  constructor(private prefix = 'lsm-', private lockKey = 'lsmngr-lock') { }

  private prefixedKey(key: string | number): string {
    return `${this.prefix}${key}`;
  }

  getAllKeys(): string[] {
    const res: string[] = [];
    for (const key in localStorage) {
      if (key.startsWith(this.prefix)) {
        res.push(key.slice(this.prefix.length));
      }
    }
    return res;
  }

  getKeys(n = 12, remove = true): string[] {
    const res: string[] = [];
    for (const key in localStorage) {
      if (res.length >= n) break;
      if (key.startsWith(this.prefix)) {
        res.push(key.slice(this.prefix.length));
      }
    }
    if (remove) {
      res.forEach(k => this.removeKey(k));
    }
    return res;
  }

  hasKey(key: string | number): boolean {
    return localStorage.getItem(this.prefixedKey(key)) !== null;
  }

  removeKey(key: string | number): void {
    localStorage.removeItem(this.prefixedKey(key));
  }

  setKey(key: string | number): void {
    localStorage.setItem(this.prefixedKey(key), '');
  }

  isLocked(): boolean {
    const lock = parseInt(localStorage.getItem(this.lockKey) as string);
    const locktime = 5 * 60 * 1000; // 5 minutes
    return !(!lock || Date.now() - lock > locktime);
  }

  lock(value: boolean): void {
    if (value) {
      localStorage.setItem(this.lockKey, JSON.stringify(Date.now()));
    } else {
      localStorage.removeItem(this.lockKey);
    }
  }
}
