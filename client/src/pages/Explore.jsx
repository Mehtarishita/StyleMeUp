import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from '../components/Skeleton';
import SEO from '../components/SEO';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let query = `?sort=${sort}`;
      if (keyword) query += `&keyword=${keyword}`;
      if (category) query += `&category=${category}`;
      if (gender) query += `&gender=${gender}`;

      const res = await axios.get(`http://localhost:5000/api/products${query}`);
      setProducts(res.data.data);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setLoading(false);
    }
  }, [category, gender, sort, keyword]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data.data);
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };

  return (
    <>
      <SEO title="Explore Collection" description="Discover curated outfits and trends on StyleMeUp." />
      {/* Explore Hero Section */}
      <section className="explore-hero section" style={{ padding: '60px 20px', background: 'var(--bg)' }}>
        <h1 className="section__title">EXPLORE THE COLLECTION <span className="txt-gradient"></span></h1>
        <p className="section__subtitle">Discover curated outfits, premium brands, and the latest trends.</p>
        
        <div style={{ maxWidth: '500px', margin: '20px auto 0' }}>
          <input 
            type="text" 
            placeholder="Search for products, styles, or tags..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: '1px solid var(--border)', fontSize: '16px' }}
          />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section" style={{ display: 'flex', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Sidebar Filters */}
        <aside style={{ width: '250px', flexShrink: 0 }}>
          <h3 style={{ marginBottom: '20px' }}>Filters</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>
                <input type="radio" name="category" checked={category === ''} onChange={() => setCategory('')} /> All
              </label>
              {categories.map(c => (
                <label key={c._id}>
                  <input type="radio" name="category" checked={category === c._id} onChange={() => setCategory(c._id)} /> {c.name}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Gender</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label><input type="radio" name="gender" checked={gender === ''} onChange={() => setGender('')} /> All</label>
              <label><input type="radio" name="gender" checked={gender === 'Men'} onChange={() => setGender('Men')} /> Men</label>
              <label><input type="radio" name="gender" checked={gender === 'Women'} onChange={() => setGender('Women')} /> Women</label>
              <label><input type="radio" name="gender" checked={gender === 'Unisex'} onChange={() => setGender('Unisex')} /> Unisex</label>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Sort By</h4>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Skeleton height="280px" />
                  <Skeleton height="15px" width="40%" />
                  <Skeleton height="20px" width="80%" />
                  <Skeleton height="20px" width="30%" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="center"><p>No products found matching your criteria.</p></div>
          ) : (
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
              {products.map(product => (
                <div key={product._id} className="product-card" style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={product.images[0] || 'https://via.placeholder.com/400x500'} 
                      alt={product.name} 
                      loading="lazy"
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
        </div>
      </section>
    </>
  );
};

export default Explore;
