import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/profile.html');
    }
  };

  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <h1 className="section__title" style={{ marginBottom: '1rem', textAlign: 'center' }}>Welcome Back</h1>
        <p className="section__subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign in to your StyleMeUp account.</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
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
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
              <Link to="/forgot-password.html" style={{ color: 'var(--primary)', fontSize: '14px' }}>Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }} 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn--primary wide" style={{ width: '100%' }}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>Don't have an account? <Link to="/signup.html" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
