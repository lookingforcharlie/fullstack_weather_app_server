import mongoose from 'mongoose';

const Schema = mongoose.Schema;
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
const savedWeatherModel = mongoose.model(
  'temperature_and_time',
  savedWeatherSchema
);

export default savedWeatherModel;
