import { verbose } from 'sqlite3';

const sqlite3 = verbose();

const db = new sqlite3.Database('./src/db/db.sqlite', (err: Error) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50),
      type INTEGER -- 0 represent 'user', 1 represent 'admin'
    )`,
  );
});

export default db;
