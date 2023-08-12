import request from 'supertest';
import { AuthRoute } from '@/routes/auth.route';
import { AuthController } from '@/controllers/auth.controller';
import express from 'express';

jest.mock('@/middlewares/user-validator.middleware', () => ({
  validateUsername: jest.fn((req, res, next) => {
    next();
  }),
}));

jest.mock('@/controllers/auth.controller', () => {
  class AuthController {
    logIn;
    revokeToken;
    constructor() {
      this.logIn = jest.fn(() => {
        console.log('aaaaaaaaaaaaaaa');
        Promise.resolve();
      });
      this.revokeToken = jest.fn(() => Promise.resolve());
    }
  }
  const result = {
    AuthController,
  };
  return result;
});

describe.skip('Auth route', () => {
  let app;
  let authRoute;
  const controler = new AuthController();

  beforeEach(() => {
    authRoute = new AuthRoute();
    app = express().use(authRoute.router);
  });

  describe('POST /login', () => {
    it('should call auth controller login method', async () => {
      await request(app).post('/login').send({ username: 'test' });
      // error: thrown: "Exceeded timeout of 5000 ms for a test.
      // Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
      expect(controler.logIn).toHaveBeenCalled();
    });
  });
});
