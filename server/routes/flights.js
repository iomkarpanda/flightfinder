const express = require('express');
const Flight = require('../models/Flight');
const router = express.Router();

// List all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new flight (admin)
router.post('/', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update flight (admin)
router.put('/:id', async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
