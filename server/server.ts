import express from 'express';
import cors from 'cors';
import poetrydbController from './controllers/poetrydb-controller';
import mongoose from 'mongoose';

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/poetry';

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());

poetrydbController(app);

app.listen(process.env.PORT || 4000);
