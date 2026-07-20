import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="nav__inner">
        <nav className="navbar" style={{ padding: 0, boxShadow: 'none' }}>
          <div className="nav-left">
            <img src="/assets/images/logo.jpg" alt="StyleMeUp Logo" className="logo" />
            <Link className="brand" to="/">StyleMeUp</Link>
          </div>
        </nav>

        <button className="nav__toggle" aria-label="Menu" onClick={() => setIsOpen(!isOpen)}>
          <span></span><span></span><span></span>
        </button>

        <ul className="nav__links" style={{ display: isOpen ? 'flex' : '' }}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/explore.html" onClick={() => setIsOpen(false)}>Explore</Link></li>
          <li><Link to="/tryon.html" onClick={() => setIsOpen(false)}>Try-On</Link></li>
          <li><Link to="/reels.html" onClick={() => setIsOpen(false)}>Reels</Link></li>
          <li><Link to="/about.html" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/creators.html" onClick={() => setIsOpen(false)}>Creators</Link></li>
          <li><Link to="/contact.html" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>

        <div className="nav__actions">
          {user ? (
            <>
              <Link className="link" to="/profile.html" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="btn btn--sm btn--outline" style={{ cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link className="link" to="/login.html">Login</Link>
              <Link className="btn btn--sm btn--primary" to="/signup.html">Create Account</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
