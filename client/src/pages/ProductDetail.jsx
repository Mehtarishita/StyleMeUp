import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Skeleton from '../components/Skeleton';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { variants } from '../styles/motion';
import { mockProducts } from '../data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, addToCart, toggleWishlist, trackRecentlyViewed } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection state
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProductDetails = useCallback(async () => {
    try {
      setLoading(true);
      const [productRes, reviewsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/products/${id}`),
        axios.get(`http://localhost:5000/api/products/${id}/reviews`)
      ]);
      setProduct(productRes.data.data);
      setReviews(reviewsRes.data.data);
      
      // Auto select first size
      if (productRes.data.data.sizes?.length > 0) {
        setSelectedSize(productRes.data.data.sizes[0]);
      }

      // Track recently viewed
      trackRecentlyViewed(id);
    } catch (error) {
      console.warn('Backend failed, using mock product data.');
      const mockProduct = mockProducts.find(p => p._id === id);
      if (mockProduct) {
        setProduct(mockProduct);
        setReviews([]);
        if (mockProduct.sizes?.length > 0) setSelectedSize(mockProduct.sizes[0]);
        trackRecentlyViewed(id);
      } else {
        console.error(error);
        toast.error('Failed to load product details');
      }
    } finally {
      setLoading(false);
    }
  }, [id, trackRecentlyViewed]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);


  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to leave a review');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
        rating,
        comment
      });
      toast.success('Review added successfully!');
      setComment('');
      setRating(5);
      fetchProductDetails(); // Refresh reviews
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="section" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <Skeleton height="500px" borderRadius="12px" />
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Skeleton height="20px" width="100px" />
            <Skeleton height="40px" width="80%" />
            <Skeleton height="30px" width="120px" />
            <Skeleton height="100px" width="100%" />
            <Skeleton height="40px" width="50%" />
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return <section className="section center"><p>Product not found.</p></section>;
  }

  return (
    <section className="section" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SEO title={product.name} description={product.description?.substring(0, 150)} image={product.images[0]} />
      <Link to="/explore.html" className="btn btn--outline btn--sm" style={{ marginBottom: '20px' }}>&larr; Back to Explore</Link>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* Images */}
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.images[0] || 'https://via.placeholder.com/400x500'} 
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* Product Info */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
            {product.brand}
          </div>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ color: '#f39c12', fontWeight: 'bold' }}>★ {product.rating}</span>
            <span style={{ color: 'var(--muted)' }}>({product.numReviews} reviews)</span>
          </div>

          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            ₹{product.price}
            {product.originalPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: '16px', marginLeft: '10px' }}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <p style={{ lineHeight: '1.6', marginBottom: '30px', color: 'var(--text)' }}>
            {product.description}
          </p>

          <div style={{ marginBottom: '20px' }}>
            <strong>Available Sizes:</strong>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {product.sizes.map(size => (
                <div 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  style={{ padding: '8px 16px', border: `1px solid ${selectedSize === size ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '4px', cursor: 'pointer', background: selectedSize === size ? 'var(--bg)' : 'transparent' }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <strong>Quantity:</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '5px 15px', border: '1px solid var(--border)', background: 'var(--bg)' }}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '5px 15px', border: '1px solid var(--border)', background: 'var(--bg)' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <motion.button 
              onClick={() => addToCart(product._id, qty, selectedSize)} 
              className="btn btn--primary wide" 
              disabled={product.stock === 0} 
              style={{ flex: 1 }}
              variants={variants.tapButton}
              whileTap="tap"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>
            <motion.button 
              onClick={() => toggleWishlist(product._id)} 
              className="btn btn--outline" 
              style={{ padding: '0 20px' }}
              variants={variants.tapButton}
              whileTap="tap"
            >
              {user?.wishlist?.some(w => w._id === product._id || w === product._id) ? '♥ Saved' : '♡ Save'}
            </motion.button>
          </div>
          <p style={{ marginTop: '10px', color: product.stock > 0 ? 'green' : 'red' }}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>
        </div>
      </div>

      <hr style={{ margin: '60px 0', border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* Reviews Section */}
      <div>
        <h2 style={{ marginBottom: '20px' }}>Customer Reviews</h2>
        
        {user ? (
          <form onSubmit={submitReview} className="card" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Write a Review</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Rating</label>
              <select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Comment</label>
              <textarea 
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border)', minHeight: '80px' }}
                placeholder="Share your thoughts about this product..."
              ></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn--primary btn--sm">
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div style={{ padding: '15px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '30px' }}>
            Please <Link to="/login.html" style={{ color: 'var(--primary)' }}>log in</Link> to write a review.
          </div>
        )}

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this product!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reviews.map(review => (
              <div key={review._id} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>{review.user?.name || 'Anonymous'}</strong>
                  <span style={{ color: '#f39c12' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p style={{ margin: 0, color: 'var(--text)' }}>{review.comment}</p>
                <small style={{ color: 'var(--muted)', display: 'block', marginTop: '10px' }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
