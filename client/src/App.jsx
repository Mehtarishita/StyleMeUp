import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { variants } from './styles/motion';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
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
import OutfitGenerator from './pages/OutfitGenerator';
import StylistChat from './pages/StylistChat';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants.pageFade}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/explore.html" element={<Explore />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/generator.html" element={<OutfitGenerator />} />
          <Route path="/stylist-chat.html" element={<StylistChat />} />
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
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </MotionConfig>
  );
}

export default App;
