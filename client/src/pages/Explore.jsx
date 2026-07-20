import React from 'react';

const Explore = () => {
  return (
    <>
      {/* Explore Hero Section */}
      <section className="explore-hero section">
        <h1 className="section__title">EXPLORE STYLE BOARDS <span className="txt-gradient"></span></h1>
        <p className="section__subtitle">Discover outfits, trends & inspirations curated for you.</p>
      </section>

      {/* Filters */}
      <div className="filters center">
        <button className="btn btn--light">All</button>
        <button className="btn btn--light">Casual</button>
        <button className="btn btn--light">Formal</button>
        <button className="btn btn--light">Ethnic</button>
        <button className="btn btn--light">Party</button>
      </div>

      {/* Style Boards Grid */}
      <section className="section">
        <div className="grid boards-grid">
          <div className="board-card">
            <img src="/assets/images/explore/streetwear.jpg" alt="Casual Outfit" />
            <h3>Casual Streetwear</h3>
          </div>

          <div className="board-card">
            <img src="/assets/images/explore/officelook.jpg" alt="Formal Outfit" />
            <h3>Formal Office Look</h3>
          </div>

          <div className="board-card">
            <img src="/assets/images/explore/ethnic.jpg" alt="Ethnic Outfit" />
            <h3>Festive Ethnic</h3>
          </div>

          <div className="board-card">
            <img src="/assets/images/explore/nightglam.jpg" alt="Party Outfit" />
            <h3>Party Night Glam</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Explore;
