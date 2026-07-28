import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${id}`);
      setOrder(res.data.data);
    } catch (error) {
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <section className="section center"><p>Loading...</p></section>;
  if (!order) return <section className="section center"><p>Order not found</p></section>;

  return (
    <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/orders.html" className="btn btn--outline btn--sm" style={{ marginBottom: '20px' }}>&larr; Back to Orders</Link>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left', marginBottom: '10px' }}>Order Details</h1>
      <p style={{ marginBottom: '30px', color: 'var(--muted)' }}>Order ID: {order._id} | Placed: {new Date(order.createdAt).toLocaleDateString()}</p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 500px' }}>
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>Shipping Address</h3>
            <p style={{ margin: '0 0 5px' }}><strong>{order.shippingAddress.fullName}</strong></p>
            <p style={{ margin: '0 0 5px' }}>{order.shippingAddress.street}</p>
            <p style={{ margin: '0 0 5px' }}>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p style={{ margin: '0 0 5px' }}>{order.shippingAddress.country}</p>
            <p style={{ margin: 0, color: 'var(--muted)' }}>Phone: {order.shippingAddress.phone}</p>
            
            <div style={{ marginTop: '15px', padding: '10px', background: order.status === 'Delivered' ? '#e8f5e9' : 'var(--bg)', color: order.status === 'Delivered' ? '#2e7d32' : 'inherit', borderRadius: '4px', fontWeight: 'bold' }}>
              Status: {order.status}
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>Order Items</h3>
            {order.orderItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: idx !== order.orderItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <img src={item.image} alt={item.name} style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px' }}>
                    <Link to={`/product/${item.product}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.name}</Link>
                  </h4>
                  <p style={{ margin: '0 0 5px', color: 'var(--muted)', fontSize: '14px' }}>Size: {item.size}</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '20px' }}>Payment Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Items Subtotal</span>
              <span>₹{order.itemsPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Shipping</span>
              <span>₹{order.shippingPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Tax</span>
              <span>₹{order.taxPrice}</span>
            </div>
            <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
              <span>Total Paid</span>
              <span>₹{order.totalPrice}</span>
            </div>
            <div style={{ padding: '10px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
              Payment Status: {order.paymentStatus}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
