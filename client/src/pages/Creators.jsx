import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Creators = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      // Fetch 3 top-rated products to feature
      const res = await axios.get('http://localhost:5000/api/products?sort=rating&limit=3');
      setFeaturedProducts(res.data.data);
    } catch (error) {
      console.error('Failed to load featured products', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="creators-hero">
        <h1 className="section__title txt-gradient">Style Creators Hub</h1>
        <p className="section__subtitle">Monetize your style. Share affiliate links, give coupons, and earn from your looks.</p>
      </section>

      <section className="section center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Featured Creator Picks</h2>
        <p className="section__subtitle" style={{ margin: '0 auto 30px' }}>
          Shop directly from your favorite influencers' curated closets!
        </p>

        {loading ? (
          <p>Loading creator picks...</p>
        ) : (
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {featuredProducts.map(product => (
              <div key={product._id} className="product-card" style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '15px' }}>
                <img 
                  src={product.images[0] || 'https://via.placeholder.com/400x500'} 
                  alt={product.name} 
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ margin: '15px 0 10px', fontSize: '18px' }}>{product.name}</h3>
                <div className="coupon" style={{ background: 'var(--primary)', color: '#fff', padding: '5px 10px', borderRadius: '20px', display: 'inline-block', fontSize: '12px', marginBottom: '10px' }}>
                  {product.brand.toUpperCase()}15 (15% OFF)
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: '15px' }}>From {product.brand}</p>
                <Link to={`/product/${product._id}`} className="btn btn--sm btn--outline" style={{ display: 'block', textAlign: 'center' }}>
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="creator-section">
        <h2 className="section__title txt-gradient">Want to become a Creator?</h2>
        <p>Join our affiliate program and start earning today.</p>
        <div className="creator-box">
          <input type="text" placeholder="Your Instagram/YouTube Handle" />
          <button>Apply Now</button>
        </div>
      </section>
    </>
  );
};

export default Creators;
