import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('userId', res.data.user._id);
      if (res.data.user.role === 'admin') navigate('/admin');
      else navigate('/flights');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="form-control mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
      <button className="btn btn-link" onClick={() => navigate('/register')}>Register</button>
    </div>
  );
}

export default Login;
