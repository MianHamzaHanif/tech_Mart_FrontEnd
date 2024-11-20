import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './forgetPassword.css'; // Optional: Add CSS for styling

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [OTPCode, setOTPCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // Toggle between forms
  const navigate = useNavigate();

  // Handle email submission for sending the code
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8004/api/users/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Code sent successfully:', data);
        alert('Code sent to your email successfully!');
        setIsCodeSent(true); // Switch to code entry form
      } else {
        setError(data.message || 'Unable to send code');
      }
    } catch (error) {
      console.error('Error during code request:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle code and new password submission
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!OTPCode || !newPassword) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8004/api/users/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, OTPCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Password updated successfully:', data);
        alert('Password updated successfully!');
        setEmail('');
        setOTPCode('');
        setNewPassword('');
        navigate('/');
        // Optionally redirect the user to the login page
      } else {
        setError(data.message || 'Invalid code or unable to update password');
      }
    } catch (error) {
      console.error('Error during password update:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {!isCodeSent ? (
        <form className="login-form" onSubmit={handleEmailSubmit}>
          <h2>Forget Password</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Sending code...' : 'Get Code'}
          </button>
          <div className="links-container">
            <Link to="/">Back</Link>
          </div>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleCodeSubmit}>
          <h2>Reset Password</h2>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>OTPCode:</label>
            <input
              type="text"
              value={OTPCode}
              onChange={(e) => setOTPCode(e.target.value)}
              placeholder="Enter the code"
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
          <div className="links-container">
            <Link to="/">Back</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
