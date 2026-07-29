export const transitions = {
  default: { duration: 0.2, ease: 'easeOut' },
  fast: { duration: 0.15, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 300, damping: 20 },
  stagger: { staggerChildren: 0.1 }
};

export const variants = {
  pageFade: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: transitions.default },
    exit: { opacity: 0, y: -10, transition: transitions.fast }
  },
  itemFade: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: transitions.default }
  },
  pulseOpacity: {
    animate: { 
      opacity: [0.5, 1, 0.5], 
      transition: { duration: 1.5, repeat: Infinity, ease: 'linear' } 
    }
  },
  hoverCard: {
    hover: { scale: 1.02, transition: transitions.fast },
    tap: { scale: 0.98, transition: transitions.fast }
  },
  tapButton: {
    tap: { scale: 0.9, transition: transitions.fast }
  }
};
