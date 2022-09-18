import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';

const env = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';
const { host, database, username, password } = config[env];

const AppDataSource = new DataSource({
  type: 'mysql',
  host,
  port: 3306,
  username,
  password: password!,
  database,
  charset: 'utf8mb4',
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  entities: ['src/api/entities/*.ts'],
  subscribers: ['src/api/subscribers/**/*.ts'],
  migrations: ['src/api/migrations/**/*.ts'],
});

export default AppDataSource;
