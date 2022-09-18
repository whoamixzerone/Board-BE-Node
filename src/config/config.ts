import * as dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
  },
  test: {
    username: 'scott',
    password: 'scott',
    database: 'test_simple_board',
    host: '127.0.0.1',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
  },
};
