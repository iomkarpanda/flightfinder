import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Flights() {
  const [flights, setFlights] = useState([]);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/flights').then(res => setFlights(res.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFiltered(flights.filter(f =>
      f.departure.toLowerCase().includes(departure.toLowerCase()) &&
      f.destination.toLowerCase().includes(destination.toLowerCase())
    ));
  };

  return (
    <div className="container mt-5">
        <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Airplane"
        style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }}
      />
      <h2>Search Flights</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <input type="text" placeholder="Departure" value={departure} onChange={e => setDeparture(e.target.value)} className="form-control mb-2" />
        <input type="text" placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <h3>Available Flights</h3>
      <ul className="list-group">
        {(filtered.length ? filtered : flights).map(flight => (
          <li key={flight._id} className="list-group-item d-flex justify-content-between align-items-center">
            {flight.departure} → {flight.destination} | {flight.airline} | {flight.class} | ${flight.price}
            <button className="btn btn-success btn-sm" onClick={() => navigate(`/bookings?flight=${flight._id}`)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Flights;
