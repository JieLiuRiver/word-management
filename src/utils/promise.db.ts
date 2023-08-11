import db from '@/db';

export function query(sql: string, params?: any) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function run(sql: string, params: any) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
