const express = require('express');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const router = express.Router();

// Book a flight
router.post('/', async (req, res) => {
  try {
    const { user, flight, seatNumber } = req.body;
    const booking = new Booking({ user, flight, seatNumber });
    await booking.save();
    // Decrement seat count
    await Flight.findByIdAndUpdate(flight, { $inc: { seatsAvailable: -1 } });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('flight');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    // Increment seat count
    await Flight.findByIdAndUpdate(booking.flight, { $inc: { seatsAvailable: 1 } });
    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
