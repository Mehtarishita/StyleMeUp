import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trash2, Edit2 } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', brand: '', category: '', price: '', description: '', images: '', sizes: '', countInStock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products', { withCredentials: true });
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images: formData.images.split(',').map(s => s.trim()),
      sizes: formData.sizes.split(',').map(s => s.trim()),
      price: Number(formData.price),
      countInStock: Number(formData.countInStock)
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/admin/products/${editId}`, payload, { withCredentials: true });
        toast.success('Product updated');
      } else {
        await axios.post('http://localhost:5000/api/admin/products', payload, { withCredentials: true });
        toast.success('Product created');
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ name: '', brand: '', category: '', price: '', description: '', images: '', sizes: '', countInStock: '' });
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleEdit = (prod) => {
    setEditId(prod._id);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      price: prod.price,
      description: prod.description,
      images: prod.images.join(', '),
      sizes: prod.sizes.join(', '),
      countInStock: prod.countInStock
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, { withCredentials: true });
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Error deleting product');
    }
  };

  if (loading) return <div className="section center">Loading...</div>;

  return (
    <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <Link to="/admin" className="btn btn--outline btn--sm" style={{ marginBottom: '10px', display: 'inline-block' }}>&larr; Back</Link>
          <h1 className="section__title txt-gradient" style={{ textAlign: 'left', margin: 0 }}>Manage Products</h1>
        </div>
        <button className="btn btn--primary" onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ name: '', brand: '', category: '', price: '', description: '', images: '', sizes: '', countInStock: '' }); }}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '30px', marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px' }}>{editId ? 'Edit Product' : 'Add New Product'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="input" style={{ width: '100%', padding: '10px' }} />
            <input type="text" placeholder="Brand" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required className="input" style={{ width: '100%', padding: '10px' }} />
            <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required className="input" style={{ width: '100%', padding: '10px' }} />
            <input type="number" placeholder="Price (₹)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="input" style={{ width: '100%', padding: '10px' }} />
            <input type="number" placeholder="Count In Stock" value={formData.countInStock} onChange={e => setFormData({...formData, countInStock: e.target.value})} required className="input" style={{ width: '100%', padding: '10px' }} />
            <input type="text" placeholder="Sizes (comma separated)" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} required className="input" style={{ width: '100%', padding: '10px' }} />
          </div>
          <input type="text" placeholder="Image URLs (comma separated)" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} required className="input" style={{ width: '100%', padding: '10px', marginTop: '15px' }} />
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="input" style={{ width: '100%', padding: '10px', marginTop: '15px', height: '100px' }} />
          
          <button type="submit" className="btn btn--primary" style={{ marginTop: '20px' }}>Save Product</button>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>Name</th>
              <th style={{ padding: '15px' }}>Price</th>
              <th style={{ padding: '15px' }}>Category</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px', fontSize: '12px', color: 'var(--muted)' }}>{prod._id}</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{prod.name}</td>
                <td style={{ padding: '15px' }}>₹{prod.price}</td>
                <td style={{ padding: '15px' }}>{prod.category}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleEdit(prod)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(prod._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminProducts;
