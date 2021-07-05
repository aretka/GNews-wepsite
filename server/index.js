import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import  mongoose from 'mongoose';

import articleRoutes from './routes/articles.js'

const app = express();

app.use(
  cors({
    origin: 'localhost:3000',
    credentials: true
  })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/articles', articleRoutes)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
});