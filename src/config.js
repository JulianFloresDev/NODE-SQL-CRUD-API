import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT || 8001,
  DDBB_IP: process.env.DDBB_IP,
  DDBB_USER: process.env.DDBB_USER,
  DDBB_PASSWORD: process.env.DDBB_PASSWORD,
  DDBB_PORT: process.env.DDBB_PORT || 3306,
  DDBB_DATABASE_NAME: process.env.DDBB_DATABASE_NAME,
};
