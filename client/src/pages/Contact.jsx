import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from '../components/Icons';
import { motion } from 'framer-motion';
import { variants } from '../styles/motion';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Thank you for reaching out! We’ll get back to you soon.");
      setLoading(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <>
      <section className="section center" style={{ padding: '60px 20px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section__title">Get in <span className="txt-gradient">Touch</span></h1>
        <p className="section__subtitle" style={{ margin: '0 auto' }}>We’d love to hear from you. Reach out for support, collaborations, or feedback!</p>
      </section>

      <section className="section" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        
        {/* Contact Info Side */}
        <motion.div style={{ flex: '1 1 400px' }} variants={variants.itemFade} initial="initial" animate="animate">
          <div className="card" style={{ padding: '40px', height: '100%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--purple) 100%)', color: 'white', border: 'none' }}>
            <h2 style={{ color: 'white', marginBottom: '30px', fontSize: '28px' }}>Contact Information</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%' }}>
                  <Mail size={24} color="white" />
                </div>
                <div>
                  <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>Email</p>
                  <p style={{ margin: '5px 0 0', fontWeight: 'bold', fontSize: '16px' }}>support@stylemeup.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%' }}>
                  <Phone size={24} color="white" />
                </div>
                <div>
                  <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>Phone</p>
                  <p style={{ margin: '5px 0 0', fontWeight: 'bold', fontSize: '16px' }}>+91 98765 43210</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%' }}>
                  <MapPin size={24} color="white" />
                </div>
                <div>
                  <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>Address</p>
                  <p style={{ margin: '5px 0 0', fontWeight: 'bold', fontSize: '16px' }}>StyleMeUp HQ, Cyber City, Gurugram</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <p style={{ margin: '0 0 15px', fontWeight: 'bold', fontSize: '18px' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.a whileHover={{ scale: 1.1, y: -3 }} href="#" aria-label="Instagram" style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', display: 'flex', color: 'white' }}>
                  <InstagramIcon size={20} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1, y: -3 }} href="#" aria-label="YouTube" style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', display: 'flex', color: 'white' }}>
                  <YoutubeIcon size={20} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1, y: -3 }} href="#" aria-label="LinkedIn" style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', display: 'flex', color: 'white' }}>
                  <LinkedinIcon size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div style={{ flex: '1 1 500px' }} variants={variants.itemFade} initial="initial" animate="animate">
          <div className="card" style={{ padding: '40px', background: 'var(--white)' }}>
            <h2 style={{ marginBottom: '25px', fontSize: '28px' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="John Doe" 
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px', outline: 'none', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="you@example.com" 
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px', outline: 'none', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  required 
                  placeholder="How can we help you?"
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px', outline: 'none', resize: 'none', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                ></textarea>
              </div>

              <motion.button 
                type="submit" 
                className="btn btn--primary" 
                style={{ width: '100%', padding: '16px', fontSize: '16px', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

      </section>
    </>
  );
};

export default Contact;
