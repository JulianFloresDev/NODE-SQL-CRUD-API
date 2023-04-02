import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
config();

export const connection = createPool({
  host: process.env.DDBB_IP,
  user: process.env.DDBB_USER,
  password: process.env.DDBB_PASWORD,
  port: DDBB_PORT || 5001,
  database: DDBB_DATABASE_NAME,
});
