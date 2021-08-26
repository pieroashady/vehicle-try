import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const sequelize = new Sequelize.Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
  dialect: 'mysql',
  port: 3306,
  // logging: false,
});

export const db = {
  sequelize,
  Sequelize,
};
