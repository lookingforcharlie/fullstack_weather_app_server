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
const dateFormatter_1 = require("../utils/dateFormatter");
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
const mapKey = process.env.mapApiKey;
const options = {
    provider: 'google',
    apiKey: mapKey,
};
const geocoder = (0, node_geocoder_1.default)(options);
router.post('/gethistoricalweather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the city name sent from user
    const { cityName } = req.body;
    // const cityName = req.query.cityName;
    try {
        const geoData = yield geocoder.geocode(cityName);
        console.log('Data returns from geocoder: ', geoData[0]);
        const { latitude, longitude } = geoData[0];
        const response = yield (0, node_fetch_1.default)(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${dateFormatter_1.formattedDateHistory}&end_date=${dateFormatter_1.formattedDateYesterday}`);
        const data = yield response.json();
        // send city name and daily temperature value back to client
        res.json(Object.assign({ cityName: geoData[0].city || 'unknown' }, data.daily));
    }
    catch (error) {
        console.log('OMG', error);
        if (error) {
            res.status(406).json({ message: 'Please enter a valid city name.' });
        }
    }
}));
exports.default = router;
// https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&start_date=2023-05-31&end_date=2023-06-04&timezone=America%2FNew_York
// Endpoint to retrieve the past 5-day historical temperature
// https://api.open-meteo.com/v1/forecast?latitude=31.2222&longitude=121.4581&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-07-26&end_date=2023-07-30
//# sourceMappingURL=gethistoricalweather.js.map