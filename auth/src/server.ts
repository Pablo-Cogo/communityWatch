import bodyParser from 'body-parser';
import './util/module-alias';
import { Server } from '@overnightjs/core';
import * as database from '@src/database';
import { UserController } from './controllers/user';
import { Application } from 'express';
import { PersonController } from './controllers/person';
import { AddressController } from './controllers/address';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const addressController = new AddressController();
    const userController = new UserController();
    const personController = new PersonController();
    this.addControllers([userController, personController, addressController]);
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
