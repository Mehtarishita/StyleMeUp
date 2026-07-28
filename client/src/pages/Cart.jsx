import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { user, removeFromCart } = useAuth();

  if (!user) {
    return (
      <section className="section center">
        <h2>Your Cart</h2>
        <p>Please log in to view your cart.</p>
        <Link to="/login.html" className="btn btn--primary">Log In</Link>
      </section>
    );
  }

  const cart = user.cart || [];
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  return (
    <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className="section__title txt-gradient" style={{ textAlign: 'left' }}>Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <p>Your cart is empty.</p>
          <Link to="/explore.html" className="btn btn--primary" style={{ marginTop: '20px' }}>Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 600px' }}>
            {cart.map(item => (
              <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '20px' }}>
                <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>
                    <Link to={`/product/${item.product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.product.name}</Link>
                  </h3>
                  <p style={{ color: 'var(--muted)', margin: '0 0 5px' }}>Size: {item.size}</p>
                  <p style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Qty: {item.qty}</p>
                  <button onClick={() => removeFromCart(item._id)} className="btn btn--sm btn--outline" style={{ color: 'red', borderColor: 'red' }}>Remove</button>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  ₹{item.product.price * item.qty}
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <div className="card" style={{ padding: '20px', position: 'sticky', top: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Shipping</span>
                <span>{cartTotal > 1000 ? 'Free' : '₹50'}</span>
              </div>
              <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                <span>Total</span>
                <span>₹{cartTotal + (cartTotal > 1000 ? 0 : 50)}</span>
              </div>
              <Link to="/checkout.html" className="btn btn--primary wide" style={{ display: 'block', textAlign: 'center' }}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
