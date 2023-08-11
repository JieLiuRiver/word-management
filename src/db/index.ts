import { verbose } from 'sqlite3';

const sqlite3 = verbose();
const SQLITE_STORE_PATH = './src/db/db.sqlite';

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
      personalKey TEXT,
      type INTEGER -- 0 represent 'user', 1 represent 'admin'
    )`,
  );
});

export default db;
