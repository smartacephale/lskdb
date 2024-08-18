# LSKDB
## L♂cal St♂rage Key DB
![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubeF9ytu4axK5_hfm30kFuwqvQjaigCw-tQ&s)
 
 _Deep Dark Fantasies_

```
  raison d'etre for this insane degenerative garbage:
  if you have to store 1000+ unique keys,
  you don't have to parse whole json array to check one value
```
## How to use
```
<script src="https://unpkg.com/lskdb.umd.js"></script>
<script>
  const { LSKDB } = window.lskdb;
  const db = new LSKDB();
  db.setKey('key-24235432');
  if (!lskdb.isLocked()) {
        lskdb.lock(true);
        const keys = lskdb.getKeys(30);
        await...
        lskdb.lock(false);
  }
</script>
```
```
npm i lskdb
```
