import { createPool } from 'mysql2/promise';
import constants from './config.js';

export const connection = createPool({
  host: constants.DDBB_IP,
  user: constants.DDBB_USER,
  password: constants.DDBB_PASSWORD,
  port: constants.DDBB_PORT,
  database: constants.DDBB_DATABASE_NAME,
});
