import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './trpc/router';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

app.use('/trpc', createExpressMiddleware({
  router: appRouter,
}));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
