import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Package, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left', marginBottom: '30px' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <Link to="/admin/analytics" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card center" style={{ padding: '30px', transition: 'transform 0.2s' }}>
            <BarChart3 size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>Analytics</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>View sales & AI usage</p>
          </div>
        </Link>
        
        <Link to="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card center" style={{ padding: '30px', transition: 'transform 0.2s' }}>
            <Package size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>Products</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Manage catalog</p>
          </div>
        </Link>
        
        <Link to="/admin/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card center" style={{ padding: '30px', transition: 'transform 0.2s' }}>
            <ShoppingBag size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>Orders</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Update statuses</p>
          </div>
        </Link>
        
        <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card center" style={{ padding: '30px', transition: 'transform 0.2s' }}>
            <Users size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>Users</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Manage roles</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
