import { Router } from 'express';
import { CardsController } from '@/controllers/cards.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateBodyWordFeild, validatePageParams, validateParamsIdFeild } from '@/middlewares/cards-validator.middleware';
import createInputValidationMiddleware from '@/middlewares/input-validator.middlware';

const wordInputValidationMiddleware = createInputValidationMiddleware('word');

export class CardsRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public cards = new CardsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // create
    this.router.post(this.path, AuthMiddleware, AdminApiGuardMiddleware, validateBodyWordFeild, wordInputValidationMiddleware, this.cards.createCard);
    // get cards
    this.router.get(this.path, AuthMiddleware, validatePageParams, this.cards.getCards);
    // get card by id
    this.router.get(`${this.path}/:id`, AuthMiddleware, validateParamsIdFeild, this.cards.getCardById);
    // update card
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      AdminApiGuardMiddleware,
      validateParamsIdFeild,
      validateBodyWordFeild,
      wordInputValidationMiddleware,
      this.cards.updateCard,
    );
    // delete card
    this.router.delete(`${this.path}/:id`, AuthMiddleware, validateParamsIdFeild, this.cards.deleteCard);
  }
}
