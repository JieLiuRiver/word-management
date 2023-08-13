import { Router } from 'express';
import { CardsController } from '@/controllers/cards.controller';
import { Routes } from '@/interfaces/routes.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateBodyWordFeild, validatePageParams, validateParamsIdFeild } from '@/middlewares/cards-validator.middleware';
import createInputValidationMiddleware from '@/middlewares/input-validator.middlware';
import { queueMiddleware } from '@/middlewares/queue.middleware';

const userInputValidationMiddleware = createInputValidationMiddleware('user_input');

export class CardsRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public cards = new CardsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // create
    this.router.post(
      this.path,
      authMiddleware,
      adminApiGuardMiddleware,
      validateBodyWordFeild,
      userInputValidationMiddleware,
      // use queue middleware to handle highly concurrent writes
      queueMiddleware(this.cards.createCard.bind(this.cards)),
    );

    // get cards
    this.router.get(this.path, authMiddleware, validatePageParams, this.cards.getCards);

    // get card by id
    this.router.get(`${this.path}/:id`, authMiddleware, validateParamsIdFeild, this.cards.getCardById);

    // update card
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      adminApiGuardMiddleware,
      validateParamsIdFeild,
      validateBodyWordFeild,
      userInputValidationMiddleware,
      // use queue middleware to handle highly concurrent writes
      queueMiddleware(this.cards.updateCard.bind(this.cards)),
    );

    // delete card
    this.router.delete(`${this.path}/:id`, authMiddleware, validateParamsIdFeild, queueMiddleware(this.cards.deleteCard.bind(this.cards)));
  }
}
