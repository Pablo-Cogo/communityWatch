import config from 'config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = config.get<DataSourceOptions>('App.database');

export const dbConnection = new DataSource({
  ...dbConfig,
  entities: [__dirname + '/entities/*.js', __dirname + '/entities/*.ts'],
});

export const connect = async (): Promise<void> => {
  await dbConnection.initialize();
};

export const close = (): Promise<void> => dbConnection.destroy();
