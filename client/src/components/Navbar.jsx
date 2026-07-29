import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
          <li><Link to="/generator.html" onClick={() => setIsOpen(false)}>AI Stylist</Link></li>
          <li><Link to="/stylist-chat.html" onClick={() => setIsOpen(false)}>Chat Stylist</Link></li>
          <li><Link to="/tryon.html" onClick={() => setIsOpen(false)}>Try-On</Link></li>
          <li><Link to="/reels.html" onClick={() => setIsOpen(false)}>Reels</Link></li>
          <li><Link to="/about.html" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/creators.html" onClick={() => setIsOpen(false)}>Creators</Link></li>
          <li><Link to="/contact.html" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>

        <div className="nav__actions">
          <button 
            onClick={toggleTheme} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center' }}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {user ? (
            <>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Link to="/wishlist.html" style={{ position: 'relative', fontSize: '20px', textDecoration: 'none', color: 'var(--text)' }}>
                  ♥
                  {user.wishlist?.length > 0 && (
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                      {user.wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart.html" style={{ position: 'relative', fontSize: '20px', textDecoration: 'none', color: 'var(--text)' }}>
                  🛒
                  {user.cart?.length > 0 && (
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                      {user.cart.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </Link>
                <Link className="link" to="/profile.html" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>Profile</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="link" style={{ marginLeft: '10px', color: 'var(--primary)', fontWeight: 'bold' }}>
                    Admin Panel
                  </Link>
                )}
              </div>
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
