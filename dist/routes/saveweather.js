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
const express_1 = require("express");
const savedWeather_1 = __importDefault(require("../models/savedWeather"));
const router = (0, express_1.Router)();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newWeather = new savedWeather_1.default({
                cityName: { type: String, default: 'unknown', required: true },
                latitude: Number,
                longitude: Number,
                temperature: { type: Number, required: true },
                localTime: { type: String, required: true },
                createDate: { type: Date, default: new Date(), immutable: true },
            });
            yield newWeather.save();
            console.log(newWeather);
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
router.post('/saveweather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityName, latitude, longitude, current_temperature, local_time } = req.body;
    try {
        const newWeather = new savedWeather_1.default({
            cityName,
            latitude,
            longitude,
            temperature: current_temperature,
            localTime: local_time,
            createDate: new Date(),
        });
        yield newWeather.save();
        res.json({
            message: 'Weather data saved to MongoDB successfully!',
            newWeather,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/saveweather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retrievedWeather = yield savedWeather_1.default
            .find()
            .sort({ _id: -1 }) // reverse the saving sequence
            .limit(5);
        res.json(retrievedWeather);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=saveweather.js.map