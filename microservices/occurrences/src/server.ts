import 'reflect-metadata';
import cors from 'cors';
import bodyParser from 'body-parser';
import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import { OccurrenceController } from './controllers/occurrence';
import config from 'config';
import * as database from '@src/database';
import { ResourceController } from './controllers/resource';

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
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(
      cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
      })
    );
  }

  private setupControllers(): void {
    const occurrenceController = new OccurrenceController();
    const resourceController = new ResourceController();
    this.addControllers([occurrenceController, resourceController]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
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
