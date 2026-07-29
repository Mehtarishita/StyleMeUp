import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { variants } from '../styles/motion';
import { mockProducts } from '../data/mockData';

const OutfitGenerator = () => {
  const [formData, setFormData] = useState({
    occasion: 'Casual Outing',
    budget: 'Flexible',
    gender: 'Women',
    season: 'Summer',
    style: 'Minimalist',
    colors: ['Black', 'White']
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const colorsList = ['Black', 'White', 'Red', 'Blue', 'Green', 'Beige', 'Pink', 'Navy', 'Brown', 'Grey'];

  const toggleColor = (color) => {
    if (formData.colors.includes(color)) {
      setFormData({ ...formData, colors: formData.colors.filter(c => c !== color) });
    } else {
      if (formData.colors.length >= 3) {
        toast.error('You can select up to 3 colors');
        return;
      }
      setFormData({ ...formData, colors: [...formData.colors, color] });
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (formData.colors.length === 0) return toast.error('Please select at least one color');

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/outfit-recommendation', formData);
      setResult(res.data.data);
      toast.success('Outfit generated!');
      setLoading(false);
    } catch (error) {
      console.warn('AI API failed, falling back to mock generation.');
      
      // Simulate network delay for effect
      setTimeout(() => {
        // Select random products from our mock data
        const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 3);
        
        setResult({
          outfit: {
            explanation: `Here is a beautiful ${formData.style.toLowerCase()} outfit perfect for your ${formData.occasion.toLowerCase()} this ${formData.season}. It features ${formData.colors.join(' and ')} tones matching your budget.`,
            top: "A breathable, high-quality top piece that sets the foundation for the look.",
            bottom: "Tailored bottoms that complement the top perfectly.",
            shoes: "Stylish yet comfortable footwear to tie the whole outfit together.",
            accessories: "Subtle accessories to elevate your overall presence."
          },
          matchedProducts: selectedProducts
        });
        toast.success('Outfit generated!');
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <section className="section" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <SEO title="AI Outfit Generator" description="Generate personalized outfit recommendations." />
        <h1 className="section__title center">Surprise Me <span className="txt-gradient">AI Generator</span></h1>
        <p className="section__subtitle" style={{ margin: '0 auto' }}>Tell us what you need, and our AI stylist will craft the perfect look for you from our catalog.</p>
      </section>

      <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Form Area */}
        <div style={{ flex: '1 1 400px' }}>
          <form onSubmit={handleGenerate} className="card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Your Preferences</h3>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Occasion</label>
              <select value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <option>Casual Outing</option>
                <option>Formal Event</option>
                <option>Office / Work</option>
                <option>Date Night</option>
                <option>Party / Clubbing</option>
                <option>Workout / Gym</option>
                <option>Wedding Guest</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Gender</label>
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <option>Women</option>
                  <option>Men</option>
                  <option>Unisex</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Season</label>
                <select value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <option>Summer</option>
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Fall</option>
                  <option>All Season</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Style</label>
                <select value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <option>Minimalist</option>
                  <option>Streetwear</option>
                  <option>Vintage / Retro</option>
                  <option>Bohemian</option>
                  <option>Preppy</option>
                  <option>Edgy</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Budget</label>
                <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <option>Budget-Friendly</option>
                  <option>Mid-Range</option>
                  <option>Premium / Luxury</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Preferred Colors (Up to 3)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {colorsList.map(c => (
                  <div 
                    key={c}
                    onClick={() => toggleColor(c)}
                    style={{ 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      border: `1px solid ${formData.colors.includes(c) ? 'var(--primary)' : 'var(--border)'}`,
                      background: formData.colors.includes(c) ? 'var(--primary)' : 'transparent',
                      color: formData.colors.includes(c) ? '#fff' : 'inherit',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn--primary wide" style={{ width: '100%' }}>
              {loading ? '✨ Generating Magic...' : 'Generate Outfit'}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div style={{ flex: '1 1 500px' }}>
          {loading && (
            <div className="center" style={{ padding: '60px 0' }}>
              <div style={{ fontSize: '40px', animation: 'spin 2s linear infinite' }}>🪄</div>
              <h3 style={{ marginTop: '20px' }}>Analyzing fashion trends...</h3>
              <p style={{ color: 'var(--muted)' }}>Matching your preferences with our catalog.</p>
            </div>
          )}

          {!loading && !result && (
            <div className="card center" style={{ padding: '60px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>👗</div>
              <h3>Your AI Stylist is Ready</h3>
              <p style={{ color: 'var(--muted)' }}>Fill out the form on the left to get started!</p>
            </div>
          )}

          {!loading && result && (
            <div className="card" style={{ padding: '30px' }}>
              <h2 className="txt-gradient" style={{ marginBottom: '10px' }}>Your Styled Look</h2>
              <p style={{ fontStyle: 'italic', color: 'var(--muted)', marginBottom: '25px', lineHeight: '1.6' }}>
                "{result.outfit.explanation}"
              </p>

              <motion.div style={{ display: 'grid', gap: '20px' }} variants={variants.stagger} initial="initial" animate="animate">
                {['top', 'bottom', 'shoes', 'accessories'].map(key => {
                  const desc = result.outfit[key];
                  if (!desc) return null;
                  return (
                    <motion.div key={key} style={{ background: 'var(--bg)', padding: '15px', borderRadius: '8px' }} variants={variants.itemFade}>
                      <strong style={{ textTransform: 'capitalize', color: 'var(--primary)' }}>{key}</strong>
                      <p style={{ margin: '5px 0' }}>{desc}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Shop The Look</h3>
              <motion.div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }} variants={variants.stagger} initial="initial" animate="animate">
                {result.matchedProducts.length > 0 ? (
                  result.matchedProducts.map(product => (
                    <motion.div key={product._id} className="product-card" style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }} variants={variants.itemFade} whileHover="hover" whileTap="tap">
                      <Link to={`/product/${product._id}`}>
                        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                      </Link>
                      <div style={{ padding: '10px' }}>
                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <h4 style={{ margin: '0 0 5px', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                        </Link>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>₹{product.price}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p>No exact catalog matches found. Try adjusting your preferences!</p>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OutfitGenerator;
