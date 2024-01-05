import express from 'express';
import cors from 'cors';
import connectDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import handler404 from './middlewares/handler404.js';
import errorHandler from './middlewares/errorHandler.js';

const connection = await connectDatabase();

connection.on('error', (error) => {
  console.error('erro de conexao', error);
});

connection.once('open', () => {
  console.log('Conexao com BD feita com sucesso!');
});

const app = express();
app.use(cors());
routes(app);
app.use(handler404);
app.use(errorHandler);

export default app;
