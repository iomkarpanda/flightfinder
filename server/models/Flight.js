const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
  airline: { type: String, required: true },
  class: { type: String, enum: ['Economy', 'Business', 'First'], required: true }
});

module.exports = mongoose.model('Flight', FlightSchema);
