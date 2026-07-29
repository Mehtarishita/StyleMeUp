import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SurpriseMeFAB from './SurpriseMeFAB';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SurpriseMeFAB />
    </>
  );
};

export default Layout;
