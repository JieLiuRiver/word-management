import db from '@/db';
import '@/db/seed';
import { App } from '@/app';
import { AuthRoute } from '@/routes/auth.route';
import { CardsRoute } from '@/routes/cards.route';

let shuttingDown = false,
  errCode = 0;

const app = new App([new AuthRoute(), new CardsRoute()]);

const server = app.listen();

// Server close event handler
server.on('close', async () => {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  console.log('Server Closed');
  process.exit(errCode);
});

// Method to shutdown server
const shutdown = () => {
  db.close();
  server.close();
};

// Uncaught exception handler
process.on('uncaughtException', err => {
  console.log('Uncaught exception', err);
  errCode = -1;
  shutdown();
});

// Process signal handlers
process.on('SIGTERM', () => {
  shutdown();
});
process.on('SIGINT', () => {
  shutdown();
});
