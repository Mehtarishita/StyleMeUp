/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;
  const API_URL = 'http://localhost:5000/api/auth';

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // Also checking localStorage to support both methods since backend sends token in body
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await axios.get(`${API_URL}/me`);
      setUser(res.data.data);
    } catch (error) {
      console.error(error);
      setUser(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data.data);
      if (res.data.data.token) {
        localStorage.setItem('token', res.data.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
      }
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/signup`, { name, email, password });
      setUser(res.data.data);
      if (res.data.data.token) {
        localStorage.setItem('token', res.data.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
      }
      toast.success('Account created successfully');
      return true;
    } catch (error) {
      // Handle Zod validation errors format
      let msg = error.response?.data?.message || 'Signup failed';
      if (error.response?.data?.data && Array.isArray(error.response.data.data)) {
        msg = error.response.data.data[0].message;
      }
      toast.error(msg);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      setUser(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) return toast.error('Please login first');
    try {
      const res = await axios.post(`http://localhost:5000/api/users/wishlist/${productId}`);
      setUser(prev => ({ ...prev, wishlist: res.data.data }));
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update wishlist');
    }
  };

  const addToCart = async (productId, qty = 1, size = 'M') => {
    if (!user) return toast.error('Please login first');
    try {
      const res = await axios.post(`http://localhost:5000/api/users/cart`, { productId, qty, size });
      setUser(prev => ({ ...prev, cart: res.data.data }));
      toast.success('Cart updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/users/cart/${itemId}`);
      setUser(prev => ({ ...prev, cart: res.data.data }));
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove from cart');
    }
  };

  const trackRecentlyViewed = async (productId) => {
    if (!user) return;
    try {
      await axios.post(`http://localhost:5000/api/users/recently-viewed/${productId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    toggleWishlist,
    addToCart,
    removeFromCart,
    trackRecentlyViewed,
    setUser // export setUser to manually refresh it after checkout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
