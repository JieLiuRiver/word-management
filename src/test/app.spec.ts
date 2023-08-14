import { App } from '@/app';
import { PORT } from '@/config';

describe('App', () => {
  let app;
  beforeEach(() => {
    app = new App([]);
  });

  afterEach(() => {
    app?.server?.close?.();
  });

  it('should initialize', () => {
    expect(app).toBeInstanceOf(App);
    expect(app.app).toBeDefined();
    expect(app.env).toBeDefined();
    expect(app.port).toBeDefined();
    expect(app.server).toBeUndefined();
  });

  it('should start listening', async () => {
    app.listen();

    const address = app.server.address();
    expect(app.server).toBeDefined();
    expect((address as any).port).toBe(Number(PORT));
  });
});
