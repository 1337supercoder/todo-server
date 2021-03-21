import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './route';

dotenv.config();

createConnection().then(async () => {
  const app = express();

  app.use(cors())
    .use(helmet())
    .use(bodyParser.json());

  app.use('/', route);

  app.listen(3000, () => {
    // eslint-disable-next-line
    console.log('Сервер запущен на 3000 порту!');
  });
});
