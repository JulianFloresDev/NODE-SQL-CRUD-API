import express from 'express';
//Import 'cors' to allow CROSS ORIGIN transfers
import cors from 'cors';
import router from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'This endpoint is not allowed by the server',
    error: true,
  });
  next();
});

export default app;
