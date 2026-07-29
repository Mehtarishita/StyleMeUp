import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';

const SurpriseMeFAB = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const generateSurprise = async () => {
    setLoading(true);
    setIsOpen(true);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/outfit-generator', {});
      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate surprise look.');
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // Optional: clear result on close so it feels fresh next time
    setTimeout(() => setResult(null), 300); 
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={generateSurprise}
        disabled={loading}
        className="btn btn--primary"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          borderRadius: '50px',
          padding: '15px 25px',
          boxShadow: '0 8px 24px rgba(255, 107, 107, 0.4)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 'bold',
          transition: 'transform 0.2s',
          transform: loading ? 'scale(0.95)' : 'scale(1)'
        }}
      >
        <Sparkles size={20} />
        {loading ? 'Generating...' : 'Surprise Me!'}
      </button>

      {/* Results Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg)',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflowY: 'auto',
            padding: '30px',
            position: 'relative'
          }}>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            {loading ? (
              <div className="center" style={{ padding: '60px 0' }}>
                <div style={{ fontSize: '50px', animation: 'spin 2s linear infinite' }}>✨</div>
                <h2 style={{ marginTop: '20px' }}>Styling your surprise...</h2>
                <p style={{ color: 'var(--muted)' }}>Our AI is mixing and matching pieces from the catalog.</p>
              </div>
            ) : result ? (
              <div>
                <h2 className="txt-gradient" style={{ marginBottom: '10px' }}>Your Surprise Look</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{ padding: '4px 10px', background: '#ffebee', color: '#c62828', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{result.input.occasion}</span>
                  <span style={{ padding: '4px 10px', background: '#e3f2fd', color: '#1565c0', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{result.input.style}</span>
                  <span style={{ padding: '4px 10px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{result.input.season}</span>
                </div>

                <p style={{ fontStyle: 'italic', color: 'var(--muted)', marginBottom: '25px', lineHeight: '1.6' }}>
                  "{result.outfit.explanation}"
                </p>

                <h3 style={{ marginBottom: '15px' }}>The Pieces</h3>
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                  {result.matchedProducts.length > 0 ? (
                    result.matchedProducts.map(product => (
                      <div key={product._id} className="product-card" style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                        <Link to={`/product/${product._id}`} onClick={closeModal}>
                          <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                        </Link>
                        <div style={{ padding: '10px' }}>
                          <Link to={`/product/${product._id}`} onClick={closeModal} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h4 style={{ margin: '0 0 5px', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                          </Link>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>₹{product.price}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No exact catalog matches found.</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default SurpriseMeFAB;
