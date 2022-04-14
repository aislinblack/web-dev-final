import express from 'express';
import cors from 'cors';
import poetrydbController from './controllers/poetrydb-controller';

const app = express();
app.use(cors());
app.use(express.json());

poetrydbController(app);

app.listen(process.env.PORT || 4000);
