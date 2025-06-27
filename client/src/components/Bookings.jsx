import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const location = useLocation();

  useEffect(() => {
    // Fetch all flights for booking form
    axios.get('http://localhost:5000/api/flights').then(res => setFlights(res.data));
    // Fetch user's bookings
    if (userId) {
      axios.get(`http://localhost:5000/api/bookings/user/${userId}`)
        .then(res => setBookings(res.data));
    }
    // If flight is pre-selected from query param
    const params = new URLSearchParams(location.search);
    const flightId = params.get('flight');
    if (flightId) setSelectedFlight(flightId);
  }, [userId, location.search]);

  const handleCancel = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedFlight || !seatNumber) {
      setMessage('Please select a flight and enter seat number.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        user: userId,
        flight: selectedFlight,
        seatNumber
      });
      setBookings([...bookings, res.data]);
      setMessage('Booking successful!');
      setSeatNumber('');
    } catch (err) {
      setMessage('Booking failed: ' + (err.response?.data?.message || err.message));
      console.error('Booking error:', err.response || err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Bookings</h2>
      <form onSubmit={handleBook} className="mb-4 p-3 border rounded bg-light">
        <h5>Book a Flight</h5>
        <select className="form-select mb-2" value={selectedFlight} onChange={e => setSelectedFlight(e.target.value)}>
          <option value="">Select Flight</option>
          {flights.map(f => (
            <option key={f._id} value={f._id}>
              {f.departure} → {f.destination} | {f.airline} | {f.class} | ${f.price}
            </option>
          ))}
        </select>
        <input type="text" className="form-control mb-2" placeholder="Seat Number" value={seatNumber} onChange={e => setSeatNumber(e.target.value)} />
        <button type="submit" className="btn btn-primary">Book</button>
        {message && <div className="mt-2 text-info">{message}</div>}
      </form>
      <ul className="list-group">
        {bookings.map(booking => (
          <li key={booking._id} className="list-group-item d-flex justify-content-between align-items-center">
            {booking.flight.departure} → {booking.flight.destination} | {booking.flight.airline} | {booking.seatNumber} | {booking.status}
            {booking.status === 'booked' && (
              <button className="btn btn-danger btn-sm" onClick={() => handleCancel(booking._id)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
