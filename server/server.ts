import express from 'express';
import cors from 'cors';
import poetrydbController from './controllers/poems-controller';
import mongoose from 'mongoose';
import usersController from './controllers/users-controller';
import session from 'express-session';
import reviewsController from './controllers/reviews-controller';
import criticsController from './controllers/critics-controller';

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/poetry';

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    exposedHeaders: ['set-cookie'],
    allowedHeaders: ['Content-Type', 'X-Requested-With'],
    origin: ['http://localhost:3000'],
  })
);
app.use(express.json());
app.use(
  session({
    secret: 'SECRETO',
    cookie: { secure: false },
  })
);

app.use(function (error, req, res, next) {
  console.log('error', error);
  res.status(500);
  res.setHeader('Content-Type', 'application/json');
  res.json({ error: 'Failed to process request' });
});

poetrydbController(app);
usersController(app);
reviewsController(app);
criticsController(app);

app.listen(process.env.PORT || 4000);
