import express from 'express';
import supertest from 'supertest';
import { UserRoute } from '@/routes/user.route';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateParamsIdFeild } from '@/middlewares/cards-validator.middleware';

jest.mock('@/controllers/users.controller', () => {
  const result = {
    UsersController: class {
      getUsers;
      getUserById;
      constructor() {
        this.getUsers = jest.fn((req, res, next) => {
          res.status(200).json([{ id: 1, name: 'Mary' }]);
        });
        this.getUserById = jest.fn((req, res, next) => {
          res.status(200).json({ id: 1, name: 'Mary' });
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
    validateParamsIdFeild: jest.fn((res, req, next) => {
      next();
    }),
  };
});

describe('UserRoute', () => {
  let route;
  let app;
  let request;

  beforeEach(() => {
    route = new UserRoute();
    app = express();
    app.use(express.json());
    app.use('/', route.router);
    request = supertest(app);
  });

  describe('/users route', () => {
    it('should call authMiddleware middleware', async () => {
      const body = {};
      await request.get('/users').send(body);
      expect(authMiddleware).toBeCalled();
    });
    it('should call adminApiGuardMiddleware middleware', async () => {
      const body = {};
      await request.get('/users').send(body);
      expect(adminApiGuardMiddleware).toBeCalled();
    });

    it('should call getUsers method', async () => {
      const body = {};
      await request.get('/users').send(body);
      expect(route.users.getUsers).toBeCalled();
    });
  });
  describe('/users/:id route', () => {
    it('should call authMiddleware middleware', async () => {
      const body = {};
      await request.get('/users/1').send(body);
      expect(authMiddleware).toBeCalled();
    });
    it('should call validateParamsIdFeild middleware', async () => {
      const body = {};
      await request.get('/users/1').send(body);
      expect(validateParamsIdFeild).toBeCalled();
    });

    it('should call getUsers method', async () => {
      const body = {};
      await request.get('/users/1').send(body);
      expect(route.users.getUserById).toBeCalled();
    });
  });
});
