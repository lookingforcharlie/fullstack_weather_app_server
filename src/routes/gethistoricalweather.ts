import { config } from 'dotenv';
import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import NodeGeocoder, { BaseOptions, GoogleOptions } from 'node-geocoder';
import {
  formattedDateHistory,
  formattedDateYesterday,
} from '../utils/dateFormatter';

config();
const router = Router();
const mapKey = process.env.mapApiKey as string;

const options: BaseOptions & GoogleOptions = {
  provider: 'google',
  apiKey: mapKey,
};

const geocoder = NodeGeocoder(options);

router.post('/gethistoricalweather', async (req: Request, res: Response) => {
  // get the city name sent from user
  const { cityName } = req.body;
  // const cityName = req.query.cityName;

  try {
    const geoData = await geocoder.geocode(cityName);
    console.log('Data returns from geocoder: ', geoData[0]);
    const { latitude, longitude } = geoData[0];

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${formattedDateHistory}&end_date=${formattedDateYesterday}`
    );
    const data = await response.json();

    // send city name and daily temperature value back to client
    res.json({
      cityName: geoData[0].city || 'unknown',
      ...data.daily,
    });
  } catch (error) {
    console.log('OMG', error);
    if (error) {
      res.status(406).json({ message: 'Please enter a valid city name.' });
    }
  }
});

export default router;

// https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&start_date=2023-05-31&end_date=2023-06-04&timezone=America%2FNew_York

// Endpoint to retrieve the past 5-day historical temperature
// https://api.open-meteo.com/v1/forecast?latitude=31.2222&longitude=121.4581&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-07-26&end_date=2023-07-30
