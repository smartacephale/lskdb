# LSKDB
## Local Storage Key DB
![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubeF9ytu4axK5_hfm30kFuwqvQjaigCw-tQ&s)
 
This library provides a simple, type-safe API for managing keys in localStorage with a defined prefix.

### Installation

```bash
npm i lskdb
```

```
<script src="https://unpkg.com/lskdb.umd.js"></script>
...
const { LSKDB } = window.lskdb;
```

### Usage

Import the `LSKDB` class and create an instance:

```typescript
import { LSKDB } from 'lskdb';

const db = new LSKDB();
```

**Available methods:**

* **getAllKeys()**: Returns an array of all keys starting with the configured prefix, without the prefix itself.
* **getKeys(n: number, remove?: boolean)**: Gets a limited number (`n`) of keys with the prefix and optionally removes them from localStorage. Returns an array of keys without the prefix.
* **hasKey(key: string)**: Checks if a specific key with the prefix exists.
* **removeKey(key: string | number)**: Removes a specific key with the prefix from localStorage.
* **setKey(key: string | number)**: Sets an key with the prefix in localStorage.
* **isLocked()**: Checks if the database is locked based on a lock timeout.
* **lock(value: boolean)**: Locks or unlocks the database.

**Example:**

```typescript
db.setKey('user-data');

if (!db.hasKey('settings')) {
  db.setKey('settings');
}

const recentKeys = db.getKeys(5); // Get 5 recent keys without removing
console.log(recentKeys);

db.removeKey('user-data');

if (!db.isLocked()) {
  // Perform actions while the database is unlocked
  db.lock(true); // Lock after use
}
```

### Configuration (Optional)

You can configure the prefix used for keys and the lock key name during initialization:

```typescript
const db = new LSKDB('my-app-', 'lock');
```

**Note:** Lock functionality is based on a simple time-based check. Consider using a more robust locking mechanism for critical applications.
