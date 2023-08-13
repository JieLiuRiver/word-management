import { CardsController } from '@/controllers/cards.controller';
import CardsModel from '@/models/cards.model';

jest.mock('@/models/cards.model', () => {
  class Model {
    createCard;
    getCardById;
    deleteCard;
    updateCard;
    fetchCards;
    constructor() {
      this.createCard = jest.fn(() => ({
        id: 1,
        user_input: 'card01',
      }));
      this.getCardById = jest.fn(() => ({
        id: 1,
        user_input: 'card01',
      }));
      this.deleteCard = jest.fn(() => null);
      this.updateCard = jest.fn(() => null);
      this.fetchCards = jest.fn(() => ({
        rows: [{ id: 1, user_input: 'card01' }],
        meta: {
          total: 1,
          pageSize: 10,
          pageNumber: 1,
        },
      }));
    }
  }
  return Model;
});

describe('CardsController', () => {
  let controller, model;

  beforeEach(() => {
    controller = new CardsController();
    model = new CardsModel();
  });

  describe('create', () => {
    it('should create card successfuly', async () => {
      const req = { body: { user_input: 'card01' } };
      const res = { apiSuccess: jest.fn() };

      await controller.createCard(req, res, jest.fn());

      expect(res.apiSuccess).toBeCalledWith({
        id: 1,
        user_input: 'card01',
      });
    });

    it('should return card info by cardid', async () => {
      const req = { params: { id: 1 } };
      const res = { apiSuccess: jest.fn() };

      await controller.getCardById(
        req,
        res,
        jest.fn(() => null),
      );

      expect(res.apiSuccess).toBeCalledWith({
        id: 1,
        user_input: 'card01',
      });
    });

    it('should delete card by cardid successfully', async () => {
      const req = { params: { id: 1 } };
      const res = { apiSuccess: jest.fn() };

      await controller.deleteCard(
        req,
        res,
        jest.fn(() => null),
      );

      expect(res.apiSuccess).toBeCalledWith(null);
    });

    it('should update card successfully', async () => {
      const req = { params: { id: 1 }, body: { user_input: 'card02' } };
      const res = { apiSuccess: jest.fn() };

      await controller.updateCard(
        req,
        res,
        jest.fn(() => null),
      );

      expect(res.apiSuccess).toBeCalledWith(null);
    });

    it('should getCards successfully', async () => {
      const req = { query: { pageNumber: 1, pageSize: 10 } };
      const res = { apiSuccess: jest.fn() };

      await controller.getCards(
        req,
        res,
        jest.fn(() => null),
      );

      expect(res.apiSuccess).toBeCalledWith({
        rows: [{ id: 1, user_input: 'card01' }],
        meta: {
          total: 1,
          pageSize: 10,
          pageNumber: 1,
        },
      });
    });
  });
});
