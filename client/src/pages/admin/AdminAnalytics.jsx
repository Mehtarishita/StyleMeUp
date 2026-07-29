import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/analytics/summary', {
          withCredentials: true
        });
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="section center" style={{ padding: '60px' }}>Loading...</div>;
  if (error) return <div className="section center" style={{ padding: '60px', color: 'red' }}>{error}</div>;

  const maxTotalSold = data.topProducts.length > 0 ? Math.max(...data.topProducts.map(p => p.totalSold)) : 1;
  const aiStats = data.aiUsage;
  const maxAiUsage = Math.max(aiStats['outfit-recommendation'], aiStats['stylist-chat'], aiStats['image-search'], aiStats['outfit-generator']) || 1;

  return (
    <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/admin" className="btn btn--outline btn--sm" style={{ marginBottom: '20px' }}>&larr; Back to Dashboard</Link>
      
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left', marginBottom: '30px' }}>Analytics & Reports</h1>
      
      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Total Revenue</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{data.totals.revenue.toLocaleString()}</div>
        </div>
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Total Orders</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{data.totals.orders}</div>
        </div>
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Total Users</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{data.totals.users}</div>
        </div>
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Catalog Size</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{data.totals.products}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Top Products */}
        <div className="card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Top Selling Products</h3>
          {data.topProducts.map((prod, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                <span style={{ fontWeight: 'bold' }}>{prod.name}</span>
                <span>{prod.totalSold} sold (₹{prod.revenue})</span>
              </div>
              <div style={{ background: 'var(--bg)', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                <div style={{ 
                  background: 'var(--primary)', 
                  height: '100%', 
                  width: `${(prod.totalSold / maxTotalSold) * 100}%`,
                  borderRadius: '10px'
                }}></div>
              </div>
            </div>
          ))}
          {data.topProducts.length === 0 && <p style={{ color: 'var(--muted)' }}>No sales data available yet.</p>}
        </div>

        {/* AI Usage */}
        <div className="card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>AI Feature Usage</h3>
          
          {[
            { label: 'Outfit Recommendation', key: 'outfit-recommendation' },
            { label: 'Surprise Me', key: 'outfit-generator' },
            { label: 'Stylist Chat', key: 'stylist-chat' },
            { label: 'Visual Search', key: 'image-search' },
          ].map(feature => (
            <div key={feature.key} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                <span style={{ fontWeight: 'bold' }}>{feature.label}</span>
                <span>{aiStats[feature.key] || 0} uses</span>
              </div>
              <div style={{ background: 'var(--bg)', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                <div style={{ 
                  background: 'linear-gradient(90deg, #FF6B6B, #FF8E8B)', 
                  height: '100%', 
                  width: `${((aiStats[feature.key] || 0) / maxAiUsage) * 100}%`,
                  borderRadius: '10px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default AdminAnalytics;
