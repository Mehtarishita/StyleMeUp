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
