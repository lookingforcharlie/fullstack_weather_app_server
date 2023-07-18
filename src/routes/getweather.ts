import { config } from 'dotenv';
import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import NodeGeocoder, { BaseOptions, GoogleOptions } from 'node-geocoder';

config();
const router = Router();
const mapKey = process.env.mapApiKey as string;

const options: BaseOptions & GoogleOptions = {
  provider: 'google',
  apiKey: mapKey,
};

const geocoder = NodeGeocoder(options);

router.post('/getweather', async (req: Request, res: Response) => {
  // get the city name sent from user
  const { cityName } = req.body;

  try {
    const geoData = await geocoder.geocode(cityName);
    console.log('Data returns from geocoder: ', geoData[0]);
    if (geoData[0] === undefined) {
      res.status(406).json({ message: 'Please enter a valid city name.' });
      return;
    }
    // get lat and lon from city name
    const { latitude, longitude } = geoData[0];

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&forecast_days=1`
    );
    const data = await response.json();

    res.json({
      // geoData[0].city allows city name validation, if there is typo for city name, geocoder will correct it.
      cityName: geoData[0].city,
      latitude,
      longitude,
      current_temperature: data.current_weather.temperature,
      local_time: data.current_weather.time,
    });

    // res.json(data);
  } catch (error) {
    console.log('OMG', error);
    if (error) {
      res.status(406).json({ message: 'Please enter a valid city name.' });
    }
  }

  // res.json({ message: 'you got the weather data successfully!' });
});

export default router;

// https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&start_date=2023-05-31&end_date=2023-06-04&timezone=America%2FNew_York

// get current temperature
// https://api.open-meteo.com/v1/forecast?latitude=31.2222&longitude=121.4581&hourly=temperature_2m&current_weather=true&timezone=auto&forecast_days=1
