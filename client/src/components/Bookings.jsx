import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/bookings/user/${userId}`)
        .then(res => setBookings(res.data));
    }
  }, [userId]);

  const handleCancel = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
  };

  return (
    <div className="container mt-5">
      <h2>Your Bookings</h2>
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
