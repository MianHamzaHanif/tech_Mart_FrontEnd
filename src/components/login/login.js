import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for internal navigation
import './login.css'; // Optional: Add CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true); // Show loading state

    try {
      
      const response = await fetch('http://localhost:8004/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensure cookies are sent
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        alert('Logged in successfully!');
        setEmail('');
        setPassword('');
        navigate('/Home-Page'); // Redirect to Home Page
      } else {
        setError(data.message || 'Invalid credentials'); // Show server error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="links-container">
          <Link to="/register">Register</Link>
          <Link to="/forget-password" className="link-text">Forget Password</Link>
        </div>

      </form>
    </div>
  );
};

export default Login;
