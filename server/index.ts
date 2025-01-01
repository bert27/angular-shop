import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { indexShop } from './shop/index-shop';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 4000;

const publicDir = path.resolve(__dirname, 'public');
app.use('/public', express.static(publicDir));
app.use(
  cors({
    origin: ['http://localhost:3000'], 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexShop());
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  },
);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
