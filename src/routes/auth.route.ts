import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { Routes } from '@/interfaces/routes.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validateUsername } from '@/middlewares/user-validator.middleware';
import { adminApiGuardMiddleware } from '@/middlewares/admin.middleware';
import { validateUserid } from '@/middlewares/cards-validator.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // login api
    this.router.post('/login', validateUsername, this.auth.login);

    // revoke uses's token
    this.router.post('/revoke-token', authMiddleware, adminApiGuardMiddleware, validateUserid, this.auth.revokeToken);
  }
}
