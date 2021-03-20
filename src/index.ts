import { createConnection } from 'typeorm';
import express from 'express';

createConnection().then(async () => {
  const app = express();

  app.listen(3000, () => {
    // eslint-disable-next-line
    console.log('Сервер запущен на 3000 порту!');
  });
});
