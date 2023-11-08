import bodyParser from 'body-parser';
import cors from 'cors';
import './util/module-alias';
import { Server } from '@overnightjs/core';
import * as database from '@src/database';
import { Application } from 'express';
import config from 'config';
import { MessageController } from './controllers/message';
import { ServiceController } from './controllers/service';

export class SetupServer extends Server {
  constructor(private port = config.get('App.port')) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
      })
    );
  }

  private setupControllers(): void {
    const messageController = new MessageController();
    const serviceController = new ServiceController();
    this.addControllers([messageController, serviceController]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}
