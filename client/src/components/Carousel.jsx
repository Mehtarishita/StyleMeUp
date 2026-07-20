import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const trackRef = useRef(null);

  const scrollByCard = (dir = 1) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.look-card');
    const w = card ? card.getBoundingClientRect().width + 16 : 280;
    trackRef.current.scrollBy({ left: w * dir, behavior: 'smooth' });
  };

  return (
    <div className="carousel">
      {/* 
        Optional navigation buttons that were referenced in carousel.js 
        Even if they were missing in HTML, we can add them here for completeness 
      */}
      <button className="carousel__nav prev" onClick={() => scrollByCard(-1)} style={{ position: 'absolute', left: 0, top: '50%', zIndex: 10, background: '#fff', borderRadius: '50%', padding: '10px' }}>❮</button>
      
      <div className="carousel__track" id="boardsTrack" ref={trackRef}>
        <article className="look-card">
          <img src="/assets/images/home/casualchic.jpg" alt="" />
          <div className="look-card__overlay">
            <span className="tag">Casual Chic</span>
            <div className="look-card__actions">
              <Link className="chip chip--ghost" to="/explore.html">Shop Look</Link>
            </div>
          </div>
        </article>
        <article className="look-card">
          <img src="/assets/images/home/urbanclassic.webp" alt="" />
          <div className="look-card__overlay">
            <span className="tag">Urban Classic</span>
            <div className="look-card__actions">
              <Link className="chip chip--ghost" to="/explore.html">Shop Look</Link>
            </div>
          </div>
        </article>
        <article className="look-card">
          <img src="/assets/images/home/streetwear.jpg" alt="" />
          <div className="look-card__overlay">
            <span className="tag">Street Pop</span>
            <div className="look-card__actions">
              <Link className="chip chip--ghost" to="/explore.html">Shop Look</Link>
            </div>
          </div>
        </article>
        <article className="look-card">
          <img src="/assets/images/home/retrolook.jpg" alt="" />
          <div className="look-card__overlay">
            <span className="tag">Retro Glam</span>
            <div className="look-card__actions">
              <Link className="chip chip--ghost" to="/explore.html">Shop Look</Link>
            </div>
          </div>
        </article>
      </div>

      <button className="carousel__nav next" onClick={() => scrollByCard(1)} style={{ position: 'absolute', right: 0, top: '50%', zIndex: 10, background: '#fff', borderRadius: '50%', padding: '10px' }}>❯</button>
    </div>
  );
};

export default Carousel;
