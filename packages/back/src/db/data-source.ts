import 'reflect-metadata';
import env from 'src/env.json';
import { DataSource } from 'typeorm';
import { User } from 'entities/User';
import { Todo } from 'entities/Todo';

export const AppDataSource = new DataSource({
  name: 'goorm_rolled_web',
  type: 'mysql',
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DBTABASE,
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  migrations: [],
  subscribers: [],
  timezone: 'z',
});
