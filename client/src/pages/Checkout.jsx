import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  // New address form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', street: '', city: '', state: '', zipCode: '', phone: '' });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/addresses');
      setAddresses(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedAddress(res.data.data.find(a => a.isDefault) || res.data.data[0]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load addresses');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/addresses', formData);
      toast.success('Address added');
      setShowForm(false);
      fetchAddresses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add address');
    }
  };

  const placeOrder = async () => {
    if (!selectedAddress) return toast.error('Please select a shipping address');
    try {
      const res = await axios.post('http://localhost:5000/api/orders/checkout', {
        shippingAddress: {
          fullName: selectedAddress.fullName,
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          country: selectedAddress.country,
          phone: selectedAddress.phone,
        }
      });
      toast.success('Order placed successfully!');
      
      // Refresh user context to clear cart
      const meRes = await axios.get('http://localhost:5000/api/auth/me');
      setUser(meRes.data.data);
      
      navigate(`/orders/${res.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (!user || user.cart?.length === 0) {
    return <section className="section center"><h2>No items to checkout</h2></section>;
  }

  const cartTotal = user.cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const shipping = cartTotal > 1000 ? 0 : 50;
  const tax = Number((0.15 * cartTotal).toFixed(2));
  const total = cartTotal + shipping + tax;

  return (
    <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left' }}>Checkout</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ marginBottom: '20px' }}>Shipping Address</h2>
          
          {addresses.map(addr => (
            <div 
              key={addr._id} 
              onClick={() => setSelectedAddress(addr)}
              style={{ padding: '15px', border: `2px solid ${selectedAddress?._id === addr._id ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '8px', marginBottom: '15px', cursor: 'pointer' }}
            >
              <strong>{addr.fullName}</strong>
              <p style={{ margin: '5px 0' }}>{addr.street}, {addr.city}, {addr.state} {addr.zipCode}</p>
              <p style={{ margin: 0, color: 'var(--muted)' }}>{addr.phone}</p>
            </div>
          ))}

          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn btn--outline" style={{ marginTop: '10px' }}>+ Add New Address</button>
          ) : (
            <form onSubmit={handleAddAddress} className="card" style={{ padding: '20px', marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input required placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ padding: '10px' }} />
                <input required placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '10px' }} />
                <input required placeholder="Street" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} style={{ gridColumn: '1 / -1', padding: '10px' }} />
                <input required placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={{ padding: '10px' }} />
                <input required placeholder="State" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{ padding: '10px' }} />
                <input required placeholder="ZIP Code" value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} style={{ padding: '10px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="submit" className="btn btn--primary">Save Address</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn--outline">Cancel</button>
              </div>
            </form>
          )}

          <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Payment Method</h2>
          <div style={{ padding: '15px', border: '1px solid var(--primary)', borderRadius: '8px', background: 'var(--bg)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
              <input type="radio" checked readOnly /> Credit/Debit Card (Mock)
            </label>
            <p style={{ margin: '10px 0 0 25px', color: 'var(--muted)', fontSize: '14px' }}>No real payment is processed.</p>
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div className="card" style={{ padding: '20px', position: 'sticky', top: '20px' }}>
            <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
            
            <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
              {user.cart.map(item => (
                <div key={item._id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <img src={item.product.images[0]} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <p style={{ margin: '0 0 5px', fontSize: '14px', fontWeight: 'bold' }}>{item.product.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>Qty: {item.qty} | Size: {item.size}</p>
                    <p style={{ margin: '5px 0 0', fontSize: '14px' }}>₹{item.product.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Items</span>
              <span>₹{cartTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Tax (15%)</span>
              <span>₹{tax}</span>
            </div>
            <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button onClick={placeOrder} className="btn btn--primary wide" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
