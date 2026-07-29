import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <section className="section center"><h2>Please log in</h2></section>;
  }

  return (
    <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left' }}>Order History</h1>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px' }}>Order ID: {order._id}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '5px 10px', background: order.status === 'Delivered' ? '#e8f5e9' : 'var(--bg)', color: order.status === 'Delivered' ? '#2e7d32' : 'inherit', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {order.orderItems.map((item, idx) => (
                  <img key={idx} src={item.image} alt={item.name} title={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Total: ₹{order.totalPrice}</div>
                <Link to={`/orders/${order._id}`} className="btn btn--outline btn--sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
