import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <img src="/assets/logo.png" alt="StyleMeUp Logo" style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <h4 style={{ margin: 0 }}>StyleMeUp</h4>
          </div>
          <p>AI-powered fashion that helps you discover, try, and own your personal style.</p>
          <div className="socials" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="#" aria-label="Instagram"><InstagramIcon size={24} color="#fff" /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon size={24} color="#fff" /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon size={24} color="#fff" /></a>
          </div>
        </div>

        <div>
          <h5>Features</h5>
          <ul>
            <li><Link to="/tryon.html">Virtual Try-On</Link></li>
            <li><Link to="/explore.html">AI Outfit Generator</Link></li>
            <li><Link to="/explore.html">Style Boards</Link></li>
            <li><Link to="/reels.html">Reel Studio</Link></li>
          </ul>
        </div>

        <div>
          <h5>Community</h5>
          <ul>
            <li><a href="#">Fashion Forums</a></li>
            <li><a href="#">Creator Space</a></li>
            <li><a href="#">Style Challenges</a></li>
            <li><a href="#">Trending Looks</a></li>
          </ul>
        </div>

        <div>
          <h5>Support</h5>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Community Guidelines</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 StyleMeUp. All rights reserved. Made with Love by Rishita Mehta.</p>
      </div>
    </footer>
  );
};

export default Footer;
