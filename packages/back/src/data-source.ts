import 'reflect-metadata';
import env from '../env.json';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  name:'goorm_rolled_web',
  type: 'mysql',
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DBTABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
