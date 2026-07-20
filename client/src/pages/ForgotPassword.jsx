import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setSuccessMsg('Check your email for the reset link! (Check server console for Ethereal URL if testing)');
      toast.success('Reset email sent');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <h1 className="section__title" style={{ marginBottom: '1rem', textAlign: 'center' }}>Forgot Password</h1>
        <p className="section__subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Enter your email and we'll send you a reset link.</p>
        
        {successMsg ? (
          <div style={{ padding: '1rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', textAlign: 'center', marginBottom: '1.5rem' }}>
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }} 
                placeholder="you@example.com" 
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn--primary wide" style={{ width: '100%' }}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/login.html" style={{ color: 'var(--primary)', fontWeight: 600 }}>Back to Login</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
