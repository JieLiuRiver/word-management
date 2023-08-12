import { SQLITE_LOCAL_PATH } from '@/config';
import { verbose, Database } from 'sqlite3';

const sqlite3 = verbose();

const connectDb = () => {
  return new sqlite3.Database(SQLITE_LOCAL_PATH, (err: Error) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
};

const createTables = (db: Database) => {
  db.serialize(() => {
    // create user table
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

    // create cards table
    db.run(
      `CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT,
        createTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        updateTime DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    );
  });
};

const db = connectDb();
createTables(db);

db.on('error', error => {
  console.error('Database error:', error);
});

export const disconnectDB = () => {
  db.close();
};

export default db;
