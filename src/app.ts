import http from 'http';
import express from 'express';
import compression from 'compression';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@/config';
import { Routes } from '@/interfaces/routes.interface';
import { ErrorMiddleware } from '@/middlewares/error.middleware';
import apiResponseMiddleware from '@/middlewares/api.response.middleware';
import { createRateLimitMiddleware } from './middlewares/ratelimit.middleware';
import cors from '@/middlewares/cors.middleware';
import securityHeadersMiddleware from '@/middlewares/security-headers.middleware';
import { API_PREFIX } from './constants';

export class App {
  public app: express.Application;
  public env: string;
  public server: http.Server;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
    return this.server;
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(securityHeadersMiddleware);
    this.app.use(compression());
    this.app.use(apiResponseMiddleware);
    this.app.use(
      createRateLimitMiddleware({
        max: 60,
        windowMs: 60 * 1000,
      }),
    );
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(API_PREFIX, route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
