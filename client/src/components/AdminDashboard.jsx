import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [flights, setFlights] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ flightNumber: '', departure: '', destination: '', departureTime: '', arrivalTime: '', seatsAvailable: '', price: '', airline: '', class: 'Economy' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/flights').then(res => setFlights(res.data));
    // Optionally fetch users and bookings if endpoints exist
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddFlight = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/flights', form);
    const res = await axios.get('http://localhost:5000/api/flights');
    setFlights(res.data);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddFlight} className="mb-4">
        <input name="flightNumber" placeholder="Flight Number" value={form.flightNumber} onChange={handleChange} className="form-control mb-2" required />
        <input name="departure" placeholder="Departure" value={form.departure} onChange={handleChange} className="form-control mb-2" required />
        <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} className="form-control mb-2" required />
        <input name="departureTime" type="datetime-local" value={form.departureTime} onChange={handleChange} className="form-control mb-2" required />
        <input name="arrivalTime" type="datetime-local" value={form.arrivalTime} onChange={handleChange} className="form-control mb-2" required />
        <input name="seatsAvailable" type="number" placeholder="Seats Available" value={form.seatsAvailable} onChange={handleChange} className="form-control mb-2" required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="form-control mb-2" required />
        <input name="airline" placeholder="Airline" value={form.airline} onChange={handleChange} className="form-control mb-2" required />
        <select name="class" value={form.class} onChange={handleChange} className="form-control mb-2">
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>
        <button type="submit" className="btn btn-primary">Add Flight</button>
      </form>
      <h3>All Flights</h3>
      <ul className="list-group">
        {flights.map(flight => (
          <li key={flight._id} className="list-group-item">
            {flight.flightNumber}: {flight.departure} → {flight.destination} | {flight.airline} | {flight.class} | ${flight.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
