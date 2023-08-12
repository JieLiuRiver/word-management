import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { validateUsername } from '@/middlewares/user-validator.middleware';
import { AdminApiGuardMiddleware } from '@/middlewares/admin.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // login api
    this.router.post('/login', validateUsername, this.auth.logIn);

    // revoke uses's token
    this.router.post('/revoke-token', AuthMiddleware, AdminApiGuardMiddleware, this.auth.revokeToken);
  }
}
