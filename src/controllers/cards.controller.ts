import { NextFunction, Request } from 'express';
import { Card } from '@/interfaces/cards.interface';
import CardsModel from '@/models/cards.model';
import { HttpException } from '@/exceptions/httpException';
import { withErrorMessagePrefix } from '@/utils';
import type { ApiResponse } from '@/interfaces/api.interface';

export class CardsController {
  private cardsModel = new CardsModel();

  public createCard = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { user_input } = req.body;
      const newCard: Card = await this.cardsModel.createCard(user_input);
      res.apiSuccess(newCard);
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { user_input } = req.body;
      const card: Card = await this.cardsModel.getCardById(Number(id));
      if (!card) {
        throw new HttpException(409, withErrorMessagePrefix(`card ${id} is not found`));
      }
      await this.cardsModel.updateCard(Number(id), { user_input });
      res.apiSuccess(null);
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const card: Card = await this.cardsModel.getCardById(Number(id));
      if (!card) {
        throw new HttpException(409, withErrorMessagePrefix(`card ${id} is not found`));
      }
      await this.cardsModel.deleteCard(Number(id));
      res.apiSuccess(null);
    } catch (error) {
      next(error);
    }
  };

  public getCards = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { pageNumber = 1, pageSize = 10 } = req.query;
      const carsData = await this.cardsModel.fetchCards(Number(pageNumber), Number(pageSize));
      res.apiSuccess(carsData);
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const card: Card = await this.cardsModel.getCardById(Number(id));
      if (!card) {
        throw new HttpException(409, withErrorMessagePrefix(`card ${id} is not found`));
      }
      res.apiSuccess(card);
    } catch (error) {
      next(error);
    }
  };
}
