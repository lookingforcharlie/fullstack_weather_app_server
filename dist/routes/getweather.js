"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = require("express");
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_geocoder_1 = __importDefault(require("node-geocoder"));
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
const mapKey = process.env.mapApiKey;
const options = {
    provider: 'google',
    apiKey: mapKey,
};
const geocoder = (0, node_geocoder_1.default)(options);
router.post('/getweather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the city name sent from user
    const { cityName } = req.body;
    try {
        const geoData = yield geocoder.geocode(cityName);
        console.log('Data returns from geocoder: ', geoData[0]);
        if (geoData[0] === undefined) {
            res.status(406).json({ message: 'Please enter a valid city name.' });
            return;
        }
        // get lat and lon from city name
        const { latitude, longitude } = geoData[0];
        const response = yield (0, node_fetch_1.default)(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&forecast_days=1`);
        const data = yield response.json();
        res.json({
            // geoData[0].city allows city name validation, if there is typo for city name, geocoder will correct it.
            cityName: geoData[0].city,
            latitude,
            longitude,
            current_temperature: data.current_weather.temperature,
            local_time: data.current_weather.time,
        });
        // res.json(data);
    }
    catch (error) {
        console.log('OMG', error);
        if (error) {
            res.status(406).json({ message: 'Please enter a valid city name.' });
        }
    }
    // res.json({ message: 'you got the weather data successfully!' });
}));
exports.default = router;
// https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&start_date=2023-05-31&end_date=2023-06-04&timezone=America%2FNew_York
// get current temperature
// https://api.open-meteo.com/v1/forecast?latitude=31.2222&longitude=121.4581&hourly=temperature_2m&current_weather=true&timezone=auto&forecast_days=1
//# sourceMappingURL=getweather.js.map