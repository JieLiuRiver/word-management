import { verbose } from 'sqlite3';

const sqlite3 = verbose();
const SQLITE_STORE_PATH = './db.sqlite';

const db = new sqlite3.Database(SQLITE_STORE_PATH, (err: Error) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) UNIQUE,
      createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      updateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      personalKey TEXT UNIQUE,
      type INTEGER -- 0 represent 'user', 1 represent 'admin'
    )`,
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT,
      createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      updateTime DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
  );
});

db.on('error', error => {
  console.error('Database error:', error);
});

export default db;
