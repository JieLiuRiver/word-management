import db from '@/db';

function promisifyQuery(fn: string) {
  return function (sql: string, params?: any) {
    return new Promise((resolve, reject) => {
      db[fn](sql, params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

export const query = promisifyQuery('get');
export const run = promisifyQuery('run');
export const all = promisifyQuery('all');
