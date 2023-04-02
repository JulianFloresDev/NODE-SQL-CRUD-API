import express from 'express';
import router from './routes/index.js';

export const app = express();

app.use('/api', router)