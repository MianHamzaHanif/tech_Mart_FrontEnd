import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';  // Optional: Add CSS for styling

const Register = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (obj) => {
    obj.preventDefault();
    setError(''); // Clear previous errors

    if (!userName || !role || !email || !password) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await fetch('http://localhost:8004/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, role, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Register successful:', data);
        alert('Register in successfully!');
        setUserName('');
        setRole('');
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials'); // Show server error message
      }
    } catch (error) {
      console.error('Error during Register:', error);
      setError('Something went wrong. Please try again later the Register.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your user name"
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter your role"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Register'}
        </button>
        <div className="links-container">
          <Link to="/">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
