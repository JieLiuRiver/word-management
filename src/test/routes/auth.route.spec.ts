import express from 'express';
import supertest from 'supertest';
import { AuthRoute } from '@/routes/auth.route';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validateUsername } from '@/middlewares/user-validator.middleware';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateUserid } from '@/middlewares/cards-validator.middleware';

jest.mock('@/controllers/auth.controller', () => {
  const result = {
    AuthController: class {
      login;
      revokeToken;
      constructor() {
        this.login = jest.fn((req, res, next) => {
          console.log('login');
          res.status(200).json({
            token: 'token',
            userInfo: {
              id: 1,
              name: 'Mary',
            },
          });
        });
        this.revokeToken = jest.fn((req, res, next) => {
          res.status(200).json(null);
        });
      }
    },
  };
  return result;
});

jest.mock('@/middlewares/user-validator.middleware', () => {
  return {
    validateUsername: jest.fn((res, req, next) => {
      next();
    }),
  };
});

jest.mock('@/middlewares/auth.middleware', () => {
  return {
    authMiddleware: jest.fn((res, req, next) => {
      next();
    }),
  };
});

jest.mock('@/middlewares/admin.middleware', () => {
  return {
    adminApiGuardMiddleware: jest.fn((res, req, next) => {
      next();
    }),
  };
});

jest.mock('@/middlewares/cards-validator.middleware', () => {
  return {
    validateUserid: jest.fn((res, req, next) => {
      next();
    }),
  };
});

describe('AuthRoute', () => {
  let authRoute;
  let app;
  let request;

  beforeEach(() => {
    authRoute = new AuthRoute();
    app = express();
    app.use(express.json());
    app.use('/', authRoute.router);
    request = supertest(app);
  });

  describe('/login route', () => {
    it('should call validateUsername middleware', async () => {
      const body = { username: 'username' };
      await request.post('/login').send(body);
      expect(validateUsername).toBeCalled();
    });

    it('should call login method', async () => {
      const body = { username: 'username' };
      await request.post('/login').send(body);
      expect(authRoute.auth.login).toBeCalled();
    });
  });

  describe('/revoke-token route', () => {
    it('should call authMiddleware middleware', async () => {
      const body = { userid: 1 };
      await request.post('/revoke-token').send(body);
      expect(authMiddleware).toBeCalled();
    });

    it('should call adminApiGuardMiddleware middleware', async () => {
      const body = { userid: 1 };
      await request.post('/revoke-token').send(body);
      expect(adminApiGuardMiddleware).toBeCalled();
    });

    it('should call validateUserid middleware', async () => {
      const body = { userid: 1 };
      await request.post('/revoke-token').send(body);
      expect(validateUserid).toBeCalled();
    });
    it('should call revokeToken method', async () => {
      const body = { userid: 1 };
      await request.post('/revoke-token').send(body);
      expect(authRoute.auth.revokeToken).toBeCalled();
    });
  });
});
