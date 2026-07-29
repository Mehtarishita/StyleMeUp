import React from 'react';
import { Shield, Leaf, Heart, Zap, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <>
      <section className="about-hero" style={{ padding: '80px 20px 40px' }}>
        <h1 className="section__title txt-gradient" style={{ fontSize: '48px', marginBottom: '20px' }}>Our Story</h1>
        <p className="section__subtitle" style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          StyleMeUp started with a simple belief: fashion should empower you, not exhaust you. We are redefining fashion discovery through cutting-edge AI and a passionate community.
        </p>
      </section>

      <section className="section" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <div className="card" style={{ padding: '40px', background: 'var(--bg-soft)' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>How It Started</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '15px' }}>
            What began in 2024 as a small project to help people decide what to wear for morning meetings has evolved into a comprehensive AI-powered fashion ecosystem. Our founder noticed a massive gap between the overwhelming choices on e-commerce platforms and the lack of personalized, actionable styling advice.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text)' }}>
            We brought together machine learning engineers, seasoned fashion stylists, and community builders to create StyleMeUp. Today, we don't just recommend clothes—we curate confidence, blending digital innovation with authentic personal style.
          </p>
        </div>
      </section>

      <section className="section features" style={{ padding: '60px 20px', marginTop: '40px' }}>
        <h2 className="section__title txt-gradient center">Our Core Values</h2>
        <div className="grid features-grid" style={{ marginTop: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ padding: '15px', background: 'var(--lavender-light)', borderRadius: '50%', marginBottom: '20px' }}>
              <Globe size={32} color="var(--lavender)" />
            </div>
            <h3>Inclusivity</h3>
            <p>Fashion is for everyone. Our AI is trained on diverse body types, skin tones, and personal aesthetics to ensure every user feels seen and styled perfectly.</p>
          </div>

          <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '50%', marginBottom: '20px' }}>
              <Leaf size={32} color="#2e7d32" />
            </div>
            <h3>Sustainability</h3>
            <p>We promote conscious consumerism by helping you buy pieces you'll actually wear, matching new items with your existing wardrobe to reduce fashion waste.</p>
          </div>

          <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ padding: '15px', background: '#ffebee', borderRadius: '50%', marginBottom: '20px' }}>
              <Zap size={32} color="var(--primary)" />
            </div>
            <h3>Innovation</h3>
            <p>From our generative AI stylist to augmented reality virtual try-ons, we are constantly pushing the boundaries of what retail technology can achieve.</p>
          </div>

        </div>
      </section>

      <section className="section" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="card" style={{ padding: '40px 30px' }}>
            <h2 className="txt-gradient" style={{ fontSize: '48px', margin: '0' }}>500K+</h2>
            <p style={{ margin: '15px 0 0', color: 'var(--muted)', fontWeight: 'bold', fontSize: '18px' }}>Active Users</p>
          </div>
          <div className="card" style={{ padding: '40px 30px' }}>
            <h2 className="txt-gradient" style={{ fontSize: '48px', margin: '0' }}>2M+</h2>
            <p style={{ margin: '15px 0 0', color: 'var(--muted)', fontWeight: 'bold', fontSize: '18px' }}>Outfits Generated</p>
          </div>
          <div className="card" style={{ padding: '40px 30px' }}>
            <h2 className="txt-gradient" style={{ fontSize: '48px', margin: '0' }}>150+</h2>
            <p style={{ margin: '15px 0 0', color: 'var(--muted)', fontWeight: 'bold', fontSize: '18px' }}>Brand Partners</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title txt-gradient center" style={{ marginBottom: '40px' }}>Meet The Visionary</h2>
        <div className="team-card">
          <img src="/assets/images/home/founder.jpg" alt="Rishita Mehta" />
          <div className="team-info">
            <h3>Rishita Mehta</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '16px' }}>Founder & CEO</p>
            <p style={{ fontStyle: 'italic', marginTop: '15px', lineHeight: '1.6', fontSize: '16px' }}>
              "StyleMeUp was built to make fashion fun again. We're building a space where technology 
              serves creativity, helping everyone find their unique aesthetic without the hassle. It's not just about clothes; it's about confidence."
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
