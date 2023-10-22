import bodyParser from 'body-parser';
import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import { OccurrenceController } from './controllers/occurrence';

export class SetupServer extends Server {
  constructor(private port = 5002) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const authController = new OccurrenceController();
    this.addControllers([authController]);
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
