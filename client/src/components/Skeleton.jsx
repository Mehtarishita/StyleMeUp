import React from 'react';
import { motion } from 'framer-motion';
import { variants } from '../styles/motion';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) => {
  return (
    <motion.div 
      className={`skeleton ${className}`} 
      style={{ width, height, borderRadius, background: 'var(--border)' }}
      variants={variants.pulseOpacity}
      animate="animate"
    />
  );
};

export default Skeleton;
