import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <section className="section" style={{ minHeight: '70vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section__title txt-gradient" style={{ textAlign: 'left', marginBottom: '10px' }}>My Profile</h1>
        <p className="section__subtitle" style={{ textAlign: 'left', marginBottom: '40px' }}>Manage your account and preferences.</p>
        
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px' }}>{user?.name}</h2>
              <p style={{ margin: '5px 0 0', color: 'var(--muted)' }}>{user?.email}</p>
              <div style={{ display: 'inline-block', marginTop: '10px', padding: '4px 10px', background: 'var(--bg)', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                Role: {user?.role}
              </div>
            </div>
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} />
          
          <div>
            <h3 style={{ marginBottom: '15px' }}>Shopping</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/orders.html')} className="btn btn--outline">My Orders</button>
              <button onClick={() => navigate('/wishlist.html')} className="btn btn--outline">Wishlist</button>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} />

          <div>
            <h3 style={{ marginBottom: '15px' }}>Recently Viewed</h3>
            {user?.recentlyViewed?.length > 0 ? (
              <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {user.recentlyViewed.map(product => (
                  <div key={product._id} style={{ flexShrink: 0, width: '120px' }}>
                    <img onClick={() => navigate(`/product/${product._id}`)} src={product.images?.[0] || 'https://via.placeholder.com/400x500'} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }} />
                    <p style={{ fontSize: '12px', margin: '5px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--muted)' }}>You haven't viewed any products yet.</p>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} />
          
          <div>
            <h3 style={{ marginBottom: '15px' }}>Account Actions</h3>
            <button onClick={handleLogout} className="btn btn--outline" style={{ color: '#d32f2f', borderColor: '#d32f2f' }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
