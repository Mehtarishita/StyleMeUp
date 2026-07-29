import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', { withCredentials: true });
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${id}/status`, { status: newStatus }, { withCredentials: true });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="section center">Loading...</div>;

  return (
    <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/admin" className="btn btn--outline btn--sm" style={{ marginBottom: '20px' }}>&larr; Back to Dashboard</Link>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left', marginBottom: '30px' }}>Manage Orders</h1>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '15px' }}>Order ID</th>
              <th style={{ padding: '15px' }}>User</th>
              <th style={{ padding: '15px' }}>Date</th>
              <th style={{ padding: '15px' }}>Total</th>
              <th style={{ padding: '15px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px', fontSize: '13px' }}>{order._id}</td>
                <td style={{ padding: '15px' }}>{order.user ? order.user.name : 'Guest'}</td>
                <td style={{ padding: '15px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '15px' }}>₹{order.totalPrice}</td>
                <td style={{ padding: '15px' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrders;
