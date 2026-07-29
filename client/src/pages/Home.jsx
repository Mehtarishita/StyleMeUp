import React, { Suspense, lazy } from 'react';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { checkWebGLSupport } from '../utils/webgl';

const HeroScene = lazy(() => import('../components/3d/HeroScene'));

const Home = () => {
  return (
    <>
      <SEO title="Home" description="Style Your Life with StyleMeUp - Your Personal Fashion Studio." />
      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="hero__container">
          <div className="hero__left">
            <div className="badge badge--soft">Personal Fashion Studio</div>

            <h1 className="hero__title">
              Style Your Life with StyleMeUp - Your Personal Fashion Studio<br/>
              <span className="txt-gradient">AI-Powered Fashion</span>
            </h1>

            <p className="hero__subtitle">
              Discover personalized outfits, try looks virtually, shop seamlessly, and earn from your style influence — all in one platform.
            </p>

            <div className="cta-row">
              <a href="#features" className="btn btn--primary">Start Styling</a>
              <Link to="/tryon.html" className="btn btn--outline">Try Virtual Fitting</Link>
            </div>

            <ul className="hero__stats">
              <li>✨ 8K+ Stylists</li>
              <li>🪄 250+ Outfit Combos</li>
            </ul>
          </div>

          <div className="hero__right">
            <div className="hero-card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/home/hero.png" alt="Hero look" className="hero-card__img" />
              <div className="chip chip--top-left" style={{ zIndex: 10 }}>
                <img src="/assets/icons/eye.svg" alt="" /> 25.2k Views
              </div>
              <div className="chip chip--bottom-left" style={{ zIndex: 10 }}>
                <img src="/assets/icons/heart.svg" alt="" /> 856 Likes
              </div>
              <div className="chip chip--top-right" style={{ zIndex: 10 }}>
                <img src="/assets/icons/star.svg" alt="" /> 98% Match
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ FEATURES GRID ============ */}
      <section id="features" className="section">
        <div className="section__head">
          <div className="badge badge--soft">Powered by AI</div>
          <h2 className="section__title">Everything You Need to Live Your Style<span className="txt-gradient"></span></h2>
          <p className="section__subtitle">
            From AI-powered outfit generation to virtual try-on and seamless shopping — StyleMeUp is your complete fashion companion.
          </p>
        </div>

        <div className="grid features-grid">
          <article className="card feature-card">
            <img src="/assets/images/home/outfitgenerator.webp" className="card__img" alt="AI Outfit Generator" loading="lazy" />
            <div className="card__body">
              <h3 className="card__title">AI Outfit Generator</h3>
              <p className="card__text">Get personalized outfit suggestions based on your style, weather, and occasion.</p>
            </div>
          </article>
          <article className="card feature-card">
            <img src="/assets/images/home/tryon.jpg" className="card__img" alt="Virtual Try-On" loading="lazy" />
            <div className="card__body">
              <h3 className="card__title">Virtual Try-On</h3>
              <p className="card__text">Use AI filters to see how outfits look on you before buying.</p>
            </div>
          </article>
          <article className="card feature-card">
            <img src="/assets/images/home/smartshopping.jpg" className="card__img" alt="Smart Shopping" loading="lazy" />
            <div className="card__body">
              <h3 className="card__title">Smart Shopping</h3>
              <p className="card__text">Shop directly from curated looks with affiliate rewards for creators.</p>
            </div>
          </article>
          <article className="card feature-card">
            <img src="/assets/images/home/moodboard.webp" className="card__img" alt="Style Boards" loading="lazy" />
            <div className="card__body">
              <h3 className="card__title">Style Boards</h3>
              <p className="card__text">Create Pinterest-like mood boards and save your favorite looks.</p>
            </div>
          </article>
          <article className="card feature-card">
            <img src="/assets/images/home/reel.png" className="card__img" alt="Reel Studio" loading="lazy" />
            <div className="card__body">
              <h3 className="card__title">Reel Studio</h3>
              <p className="card__text">Create fashion reels with AI-powered editing and trending sounds.</p>
            </div>
          </article>
          <article className="card feature-card">
            <img src="/assets/images/home/wardrobe-tracker.jpg" className="card__img" alt="Wardrobe Tracker" loading="lazy" />
            <div className="card__body">
              <h3 className="card__title">Wardrobe Tracker</h3>
              <p className="card__text">Organize your closet digitally and track outfit history.</p>
            </div>
          </article>
        </div>
      </section>

      {/* ============ TRY-ON ============ */}
      <section className="section tryon">
        <div className="tryon__wrap">
          <div className="tryon__left">
            <div className="badge badge--soft">AI Technology</div>
            <h2 className="section__title">Try Before You Buy Anything <span className="txt-gradient"></span></h2>
            <p className="section__subtitle">
              Experience the future of fashion shopping with our AI-powered virtual try-on technology. See how any outfit looks on you instantly.
            </p>
            <ul className="feature-list">
              <li><img src="/assets/icons/check.svg" alt="" /> <b>AI Body Mapping</b> — Advanced vision creates your 3D avatar.</li>
              <li><img src="/assets/icons/check.svg" alt="" /> <b>Instant Results</b> — Real-time fits with lighting & fabric simulation.</li>
              <li><img src="/assets/icons/check.svg" alt="" /> <b>360° Preview</b> — View outfits from every angle.</li>
            </ul>
            <div className="cta-row">
              <Link to="/tryon.html" className="btn btn--primary">Try Virtual Fitting</Link>
              <a href="#reels" className="btn btn--ghost">Watch Demo</a>
            </div>
          </div>

          <div className="tryon__right">
            <div className="phone-frame">
              <img src="/assets/images/home/beforeyoubuy.webp" alt="" className="phone-frame__img" />
              <div className="chip chip--top-right"><img src="/assets/icons/badge.svg" alt="" /> 98% Match</div>
              <div className="chip chip--bottom-center">Perfect for Brunch ✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STYLE BOARDS ============ */}
      <section className="section">
        <h2 className="section__title">Style Board Inspiration<span className="txt-gradient"></span></h2>
        <p className="section__subtitle">Curated outfit combinations from our AI engine and creative community.</p>

        <Carousel />

        <div className="center mt-24">
          <Link to="/explore.html" className="btn btn--light">Explore More Outfits</Link>
        </div>
      </section>

      {/* ============ REELS ============ */}
      <section id="reels" className="section">
        <h2 className="section__title">Reel Studio Creations <span className="txt-gradient"></span></h2>
        <p className="section__subtitle">Style transformations and outfit reveals from our vibrant community.</p>

        <div className="grid reels-grid">
          <article className="reel">
            <div className="reel__cover">
              <iframe width="100%" height="490px"
                src="https://www.youtube.com/embed/sCKwTKMipWg?autoplay=1&mute=1&loop=1&playlist=sCKwTKMipWg"
                title="YouTube Shorts video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <h3 className="reel__title">Summer Outfit Inspo</h3>
            <div className="reel__meta"><span>by Rishita</span> <span>•</span> <span>0:10s</span></div>
          </article>
          <article className="reel">
            <div className="reel__cover">
              <iframe width="100%" height="490px"
                src="https://www.youtube.com/embed/BNmQRm5m490?autoplay=1&mute=1&loop=1&playlist=BNmQRm5m490"
                title="YouTube Shorts Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <h3 className="reel__title">Outfit Of The Day</h3>
            <div className="reel__meta"><span>by Astha</span> <span>•</span> <span>0.19s</span></div>
          </article>
          <article className="reel">
            <div className="reel__cover">
              <iframe width="100%" height="490px"
                src="https://www.youtube.com/embed/UOh7lLKOVkA?si=eu7f9X3gCt4vNQG_"
                title="YouTube Shorts Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <h3 className="reel__title">Thrift Flip Challenge</h3>
            <div className="reel__meta"><span>by Mehak</span> <span>•</span> <span>0.10s</span></div>
          </article>
          <article className="reel">
            <div className="reel__cover">
              <iframe width="100%" height="490px"
                src="https://youtube.com/embed/iabxMFFAt7s?si=CNfQ_UVQLQJT4KM8_"
                title="YouTube Shorts Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <h3 className="reel__title">Myntra Finds Crop Shirts</h3>
            <div className="reel__meta"><span>by Muskan</span> <span>•</span> <span>0.10s</span></div>
          </article>
        </div>

        <div className="center mt-24">
          <Link to="/reels.html" className="btn btn--light">Watch More Reels</Link>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="section pricing">
        <div className="section__head">
          <div className="badge badge--soft">Choose Your Plan</div>
          <h2 className="section__title">Join StyleMeUp<span className="txt-gradient"></span> Your Way</h2>
          <p className="section__subtitle">Whether you’re discovering style or ready to influence others, we have the perfect plan for you.</p>
        </div>

        <div className="pricing__grid">
          <div className="price-card">
            <div className="price-card__head">
              <h3>Style Explorer</h3>
              <div className="price">Free</div>
            </div>
            <ul className="price__list">
              <li>✓ Personalized outfit ideas (10 / month)</li>
              <li>✓ Save looks and boards</li>
              <li>✓ Virtual try-on (basic)</li>
              <li>✓ Newsletter & trends</li>
            </ul>
            <Link to="/login.html" className="btn btn--outline wide">Join as Explorer</Link>
          </div>

          <div className="price-card price-card--pro">
            <div className="price-card__head">
              <h3>Style Creator</h3>
              <div className="price">₹299 <small>/ month</small></div>
            </div>
            <ul className="price__list">
              <li>✓ Unlimited outfit ideas</li>
              <li>✓ Advanced try-on + AR previews</li>
              <li>✓ Reel studio + analytics</li>
              <li>✓ Affiliate hub & payouts</li>
              <li>✓ Priority support + badge</li>
            </ul>
            <Link to="/login.html" className="btn btn--primary wide">Join as Creator</Link>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section className="section founder">
        <div className="section__head">
          <div className="badge badge--soft">About the Founder</div>
          <h2 className="section__title">Meet the Founder</h2>
        </div>

        <div className="founder__wrap">
          <div className="founder__photo">
            <img src="/assets/images/home/founder.jpg" alt="Rishita Mehta" />
          </div>
          <div className="founder__bio">
            <h3>Rishita Mehta</h3>
            <p>
              “I wanted to make a platform that doesn’t just show you clothes, but helps you <b>own</b> your style — fashion that’s approachable, affordable, and accessible — with smart styling through tech.”
            </p>
            <p>Love always, 💖</p>

            <div className="founder__features">
              <div className="mini">
                <img src="/assets/icons/mobile.svg" alt="" />
                <div>
                  <h4>Mobile App</h4>
                  <p>Coming soon in 2026</p>
                </div>
              </div>
              <div className="mini">
                <img src="/assets/icons/closet.svg" alt="" />
                <div>
                  <h4>AI Closet Organizer</h4>
                  <p>Auto-tag your outfits</p>
                </div>
              </div>
              <div className="mini">
                <img src="/assets/icons/workshop.svg" alt="" />
                <div>
                  <h4>Monthly Workshops</h4>
                  <p>Digital styling classes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
