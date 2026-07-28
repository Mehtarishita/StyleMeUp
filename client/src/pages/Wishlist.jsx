import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const { user, toggleWishlist } = useAuth();

  if (!user) {
    return (
      <section className="section center">
        <h2>Your Wishlist</h2>
        <p>Please log in to view your wishlist.</p>
        <Link to="/login.html" className="btn btn--primary">Log In</Link>
      </section>
    );
  }

  const wishlist = user.wishlist || [];

  return (
    <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left', marginBottom: '10px' }}>My Wishlist</h1>
      <p className="section__subtitle" style={{ textAlign: 'left', marginBottom: '40px' }}>Items you've saved for later.</p>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Go find some styles you love!</p>
      ) : (
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
          {wishlist.map(product => (
            <div key={product._id} className="product-card" style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              <button 
                onClick={() => toggleWishlist(product._id)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: '#fff', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', color: 'red', zIndex: 2 }}
              >
                ♥
              </button>
              <Link to={`/product/${product._id}`}>
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400x500'} 
                  alt={product.name} 
                  style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                />
              </Link>
              <div style={{ padding: '15px' }}>
                <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px' }}>{product.brand}</div>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '16px', margin: '0 0 10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>₹{product.price}</span>
                  <span style={{ color: '#f39c12', fontSize: '12px' }}>★ {product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
