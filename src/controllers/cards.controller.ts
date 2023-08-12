import { NextFunction, Request, Response } from 'express';
import { Card } from '@/interfaces/cards.interface';
import CardsModel from '@/models/cards.model';
import { HttpException } from '@/exceptions/httpException';
import { withErrorMessagePrefix } from '@/utils';
import type { ApiResponse } from '@/interfaces/api.interface';

export class CardsController {
  private cardsModel = new CardsModel();

  public createCard = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { word } = req.body;
      const newCard: Card = await this.cardsModel.createCard(word);
      res.apiSuccess(newCard);
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { word } = req.body;
      const card: Card = await this.cardsModel.getCardById(Number(id));
      if (!card) {
        throw new HttpException(409, withErrorMessagePrefix(`the card ${id} is not found`));
      }
      await this.cardsModel.updateCard(Number(id), { word });
      res.apiSuccess(null);
    } catch (error) {
      next(error);
    }
  };

  public getCards = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const cards: Card[] = await this.cardsModel.fetchCards();
      if (!Array.isArray(cards)) {
        throw new HttpException(409, withErrorMessagePrefix(`something wrong with this api`));
      }
      res.apiSuccess(cards || []);
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const card: Card = await this.cardsModel.getCardById(Number(id));
      if (!card) {
        throw new HttpException(409, withErrorMessagePrefix(`the card ${id} is not found`));
      }
      await this.cardsModel.deleteCard(Number(id));
      res.apiSuccess(null);
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const card: Card = await this.cardsModel.getCardById(Number(id));
      if (!card) {
        throw new HttpException(409, withErrorMessagePrefix(`the card ${id} is not found`));
      }
      res.apiSuccess(card);
    } catch (error) {
      next(error);
    }
  };
}
