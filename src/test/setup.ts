import { disconnectDB } from '@/db';

afterAll(() => {
  disconnectDB();
});
