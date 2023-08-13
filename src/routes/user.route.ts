import { Router } from 'express';
import { UsersController } from '@/controllers/users.controller';
import { Routes } from '@/interfaces/routes.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateParamsIdFeild } from '@/middlewares/cards-validator.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public users = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // get users
    this.router.get(this.path, authMiddleware, adminApiGuardMiddleware, this.users.getUsers);

    // get user by id
    this.router.get(`${this.path}/:id`, authMiddleware, validateParamsIdFeild, this.users.getUserById);
  }
}
