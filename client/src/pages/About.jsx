import React from 'react';

const About = () => {
  return (
    <>
      <section className="about-hero">
        <h1 className="section__title txt-gradient">About StyleMeUp</h1>
        <p className="section__subtitle">Redefining fashion discovery through technology and community.</p>
      </section>

      <section className="section">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            At StyleMeUp, we believe fashion should be personalized, inclusive, and accessible to everyone. 
            Our platform bridges the gap between digital innovation and personal style, 
            offering AI-driven recommendations, virtual try-ons, and a vibrant community of creators.
          </p>
        </div>
      </section>

      <section className="section features">
        <h2 className="section__title txt-gradient center">Why Choose Us?</h2>
        <div className="grid features-grid">
          <div className="feature-card">
            <h3>AI Personalization</h3>
            <p>We analyze your style preferences to suggest outfits you’ll actually love.</p>
          </div>
          <div className="feature-card">
            <h3>Virtual Fitting</h3>
            <p>See it before you buy it with our advanced AR try-on room.</p>
          </div>
          <div className="feature-card">
            <h3>Creator Economy</h3>
            <p>We empower influencers to monetize their style and share authentic reviews.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="team-card">
          <img src="/assets/images/home/founder.jpg" alt="Rishita Mehta" />
          <div className="team-info">
            <h3>Rishita Mehta</h3>
            <p>Founder & CEO</p>
            <p>
              "StyleMeUp was built to make fashion fun again. We're building a space where technology 
              serves creativity, helping everyone find their unique aesthetic without the hassle."
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
