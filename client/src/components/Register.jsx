import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="form-control mb-2" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
      <button className="btn btn-link" onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
}

export default Register;
