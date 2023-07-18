"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// const ObjectId = Schema.Types.ObjectId;
const savedWeatherSchema = new Schema({
    cityName: { type: String, default: 'unknown', required: true },
    latitude: Number,
    longitude: Number,
    temperature: { type: Number, required: true },
    localTime: { type: String, required: true },
    createDate: { type: Date, default: new Date(), immutable: true },
});
// "temperature_and_time" is the name of model, the name of the collection you will see inside the MongoDB.
const savedWeatherModel = mongoose_1.default.model('temperature_and_time', savedWeatherSchema);
exports.default = savedWeatherModel;
//# sourceMappingURL=savedWeather.js.map