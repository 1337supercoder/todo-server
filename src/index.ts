import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

createConnection().then(async () => {
  const app = express();

  app.use(cors())
    .use(helmet())
    .use(bodyParser.json());

  app.listen(3000, () => {
    // eslint-disable-next-line
    console.log('Сервер запущен на 3000 порту!');
  });
});
