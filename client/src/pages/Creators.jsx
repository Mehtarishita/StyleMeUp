import React from 'react';

const Creators = () => {
  return (
    <>
      <section className="creators-hero">
        <h1 className="section__title txt-gradient">Style Creators Hub</h1>
        <p className="section__subtitle">Monetize your style. Share affiliate links, give coupons, and earn from your looks.</p>
      </section>

      <section className="section center">
        <h2>Featured Creator Picks</h2>
        <p className="section__subtitle" style={{ margin: '0 auto 30px' }}>
          Shop directly from your favorite influencers' curated closets!
        </p>

        <div className="product-grid">
          <div className="product-card">
            <img src="/assets/images/explore/streetwear.jpg" alt="Product" />
            <h3>Oversized Graphic Tee</h3>
            <div className="coupon">RISHITA10 (10% OFF)</div>
            <p>From Myntra</p>
            <button className="btn btn--sm btn--outline">Shop Now</button>
          </div>

          <div className="product-card">
            <img src="/assets/images/explore/officelook.jpg" alt="Product" />
            <h3>Classic Beige Blazer</h3>
            <div className="coupon">ASTHA15 (15% OFF)</div>
            <p>From Ajio</p>
            <button className="btn btn--sm btn--outline">Shop Now</button>
          </div>

          <div className="product-card">
            <img src="/assets/images/explore/nightglam.jpg" alt="Product" />
            <h3>Sequin Party Dress</h3>
            <div className="coupon">MEHAK20 (20% OFF)</div>
            <p>From Urbanic</p>
            <button className="btn btn--sm btn--outline">Shop Now</button>
          </div>
        </div>
      </section>

      <section className="creator-section">
        <h2 className="section__title txt-gradient">Want to become a Creator?</h2>
        <p>Join our affiliate program and start earning today.</p>
        <div className="creator-box">
          <input type="text" placeholder="Your Instagram/YouTube Handle" />
          <button>Apply Now</button>
        </div>
      </section>
    </>
  );
};

export default Creators;
