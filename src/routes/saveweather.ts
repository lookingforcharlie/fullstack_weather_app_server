import { Request, Response, Router } from 'express';
import savedWeatherModel from '../models/savedWeather';

const router = Router();

async function run() {
  try {
    const newWeather = new savedWeatherModel({
      cityName: { type: String, default: 'unknown', required: true },
      latitude: Number,
      longitude: Number,
      temperature: { type: Number, required: true },
      localTime: { type: String, required: true },
      createDate: { type: Date, default: new Date(), immutable: true },
    });
    await newWeather.save();

    console.log(newWeather);
  } catch (error) {
    console.log(error.message);
  }
}

router.post('/saveweather', async (req: Request, res: Response) => {
  const { cityName, latitude, longitude, current_temperature, local_time } =
    req.body;
  try {
    const newWeather = new savedWeatherModel({
      cityName,
      latitude,
      longitude,
      temperature: current_temperature,
      localTime: local_time,
      createDate: new Date(),
    });
    await newWeather.save();
    res.json({
      message: 'Weather data saved to MongoDB successfully!',
      newWeather,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/saveweather', async (req: Request, res: Response) => {
  try {
    const retrievedWeather = await savedWeatherModel
      .find()
      .sort({ _id: -1 }) // reverse the saving sequence
      .limit(5);

    res.json(retrievedWeather);
  } catch (error) {
    console.log(error);
  }
});

export default router;
