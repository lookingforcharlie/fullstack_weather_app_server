import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import gethistoricalweather from './routes/gethistoricalweather';
import getweather from './routes/getweather';
import saveweather from './routes/saveweather';
config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/', getweather);
app.use('/', gethistoricalweather);
app.use('/', saveweather);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log('MongoDB is connected.');
  app.listen(PORT, (err?: Error) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server is listening on port ${PORT}`);
    }
  });
});
