import express from 'express';
import cors from 'cors';
import poetrydbController from './controllers/poetrydb-controller';
import mongoose from 'mongoose';
import usersController from './controllers/users-controller';
import authController from './controllers/auth-controller';
import session from 'express-session';

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/poetry';

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'SECRETO',
    cookie: { secure: false },
  })
);

poetrydbController(app);
usersController(app);

app.listen(process.env.PORT || 4000);
