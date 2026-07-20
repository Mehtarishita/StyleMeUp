import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We’ll get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <section className="contact-hero">
        <h1 className="section__title txt-gradient">Get in Touch</h1>
        <p className="section__subtitle">We’d love to hear from you. Reach out for support, collaborations, or feedback!</p>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> support@stylemeup.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> StyleMeUp HQ, Cyber City, Gurugram, India</p>

          <h3 style={{ marginTop: '30px' }}>Follow Us</h3>
          <div className="socials" style={{ filter: 'invert(0.5)' }}>
            <a href="#"><img src="/assets/icons/instagram.svg" alt="Instagram" /></a>
            <a href="#"><img src="/assets/icons/youtube.svg" alt="YouTube" /></a>
            <a href="#"><img src="/assets/icons/twitter.svg" alt="Twitter" /></a>
          </div>
        </div>

        <div className="contact-card">
          <h2>Send us a Message</h2>
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="you@example.com" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required placeholder="How can we help you?"></textarea>
            </div>

            <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
