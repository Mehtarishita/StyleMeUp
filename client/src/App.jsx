import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Explore from './pages/Explore';
import TryOn from './pages/TryOn';
import Reels from './pages/Reels';
import Creators from './pages/Creators';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore.html" element={<Explore />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/tryon.html" element={<TryOn />} />
          <Route path="/reels.html" element={<Reels />} />
          <Route path="/creators.html" element={<Creators />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/contact.html" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login.html" element={<Login />} />
          <Route path="/signup.html" element={<Signup />} />
          <Route path="/forgot-password.html" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route path="/cart.html" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist.html" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/checkout.html" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders.html" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/profile.html" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
