import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import dotenv from "dotenv";

dotenv.config();

const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASS;

const db = new Sequelize({
  dialect: MySqlDialect,
  database: database,
  user: username,
  password: password,
  host: 'localhost',
  port: 3306,
});

export default db;