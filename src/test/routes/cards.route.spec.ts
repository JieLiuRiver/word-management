import express from 'express';
import supertest from 'supertest';
import { CardsRoute } from '@/routes/cards.route';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateBodyWordFeild, validatePageParams, validateParamsIdFeild } from '@/middlewares/cards-validator.middleware';
import createInputValidationMiddleware from '@/middlewares/input-validator.middlware';
import { queueMiddleware } from '@/middlewares/queue.middleware';

jest.mock('@/controllers/cards.controller', () => {
  const result = {
    CardsController: class {
      createCard;
      updateCard;
      deleteCard;
      getCards;
      getCardById;
      constructor() {
        this.getCards = jest.fn((req, res, next) => {
          res.status(200).json([{ id: 1, user_input: 'A01' }]);
        });
        this.getCardById = jest.fn((req, res, next) => {
          res.status(200).json({ id: 1, user_input: 'A01' });
        });
        this.createCard = jest.fn((req, res, next) => {
          res.status(200).json({ id: 1, user_input: 'A01' });
        });
        this.updateCard = jest.fn((req, res, next) => {
          res.status(200).json({ id: 1, user_input: 'A01' });
        });
        this.deleteCard = jest.fn((req, res, next) => {
          res.status(200).json(null);
        });
      }
    },
  };
  return result;
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

jest.mock('@/middlewares/input-validator.middlware', () =>
  jest.fn((field: string) => {
    return jest.fn((res, req, next) => {
      next();
    });
  }),
);

jest.mock('@/middlewares/queue.middleware', () => {
  return {
    queueMiddleware: jest.fn(() => {
      return (res, req, next) => {
        next();
      };
    }),
  };
});

jest.mock('@/middlewares/cards-validator.middleware', () => {
  return {
    validateParamsIdFeild: jest.fn((res, req, next) => {
      next();
    }),
    validateBodyWordFeild: jest.fn((res, req, next) => {
      next();
    }),
    validatePageParams: jest.fn((res, req, next) => {
      next();
    }),
  };
});

describe('CarsRoute', () => {
  let route;
  let app;
  let request;

  beforeEach(() => {
    route = new CardsRoute();
    app = express();
    app.use(express.json());
    app.use('/', route.router);
    request = supertest(app);
  });

  describe('/cards route', () => {
    const userInputValidationMiddleware = createInputValidationMiddleware('user_input');
    it('should call all middlewares for creating api', async () => {
      const body = { user_input: 'A01' };
      await request.post('/cards').send(body);
      expect(authMiddleware).toBeCalled();
      expect(adminApiGuardMiddleware).toBeCalled();
      expect(validateBodyWordFeild).toBeCalled();
      // expect(userInputValidationMiddleware).toBeCalled();
    });

    it('should call all middlewares for getting cards api', async () => {
      const body = { pageNumber: 1, pageSize: 10 };
      await request.get('/cards').send(body);
      expect(authMiddleware).toBeCalled();
      expect(validatePageParams).toBeCalled();
      expect(route.cards.getCards).toBeCalled();
    });

    it('should call all middlewares for getting card by id api', async () => {
      await request.get('/cards/1').send();
      expect(authMiddleware).toBeCalled();
      expect(validateParamsIdFeild).toBeCalled();
      expect(route.cards.getCardById).toBeCalled();
    });

    it('should call all middlewares for updating card api', async () => {
      const body = { user_input: 'A01' };
      await request.post('/cards').send(body);
      expect(authMiddleware).toBeCalled();
      expect(adminApiGuardMiddleware).toBeCalled();
      expect(validateParamsIdFeild).toBeCalled();
      expect(validateBodyWordFeild).toBeCalled();
    });

    it('should call all middlewares for deleting card api', async () => {
      await request.get('/cards/1').send();
      expect(authMiddleware).toBeCalled();
      expect(validateParamsIdFeild).toBeCalled();
    });
  });
});
