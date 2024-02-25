import express, { Application as ExpressApplication } from 'express';
import { loadControllers, scopePerRequest } from 'awilix-express';

import { container } from '@/config/awilix-config';
import db from '@/db/db-connection';
import logger from '@/middlewares/logger';
import cors from '@/middlewares/cors';
import { errorHandler } from '@/middlewares/error-handler';

class Application {
  private readonly instance: ExpressApplication;

  constructor() {
    this.instance = express();
    this.setupMiddlewares();
  }

  public run(port: string | number): void {
    this.instance.listen(port, async () => {
      console.log(`Server running on port ${port}`);
      await db.connect();
    });
  }

  public getInstance(): ExpressApplication {
    return this.instance;
  }

  private setupMiddlewares(): void {
    this.instance.use(express.json());
    this.instance.use(logger);
    this.instance.use(cors);
    this.instance.use(scopePerRequest(container));
    this.instance.use('/api', loadControllers('../modules/*/*controller.*s', { cwd: __dirname }));
    // static
    this.instance.use(errorHandler);
  }
}

export default new Application();