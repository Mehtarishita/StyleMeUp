import React, { useState } from 'react';
import { ReelCard, ReelModal } from '../components/Reel';

const Reels = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ embedUrl: '', title: '', creator: '' });
  const [filter, setFilter] = useState('all');

  const openModal = (embedUrl, title, creator) => {
    if (!embedUrl) return alert('Invalid video URL');
    setModalData({ embedUrl, title, creator });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const reelsData = [
    { video: 'https://youtube.com/shorts/sCKwTKMipWg', title: 'Summer Outfit Inspo', creator: 'Rishita', duration: '0:10s', category: 'casual' },
    { video: 'https://youtube.com/shorts/BNmQRm5m490', title: 'Outfit Of The Day', creator: 'Astha', duration: '0:19s', category: 'party' },
    { video: 'https://youtube.com/shorts/UOh7lLKOVkA', title: 'Thrift Flip Challenge', creator: 'Mehak', duration: '0:10s', category: 'streetwear' },
    { video: 'https://youtube.com/shorts/iabxMFFAt7s', title: 'Myntra Finds Crop Shirts', creator: 'Muskan', duration: '0:10s', category: 'casual' },
  ];

  const filteredReels = filter === 'all' ? reelsData : reelsData.filter(r => r.category === filter);

  return (
    <>
      <section className="reels-hero">
        <h1 className="section__title txt-gradient">Reel Studio</h1>
        <p className="section__subtitle">Explore the latest fashion reels, try-ons, and style tips.</p>

        <div className="filters-row">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-btn ${filter === 'casual' ? 'active' : ''}`} onClick={() => setFilter('casual')}>Casual</button>
          <button className={`filter-btn ${filter === 'party' ? 'active' : ''}`} onClick={() => setFilter('party')}>Party</button>
          <button className={`filter-btn ${filter === 'streetwear' ? 'active' : ''}`} onClick={() => setFilter('streetwear')}>Streetwear</button>
        </div>
      </section>

      <section className="section">
        <div className="horizontal-scroll">
          {filteredReels.map((reel, idx) => (
            <ReelCard 
              key={idx}
              video={reel.video}
              title={reel.title}
              creator={reel.creator}
              duration={reel.duration}
              openModal={openModal}
            />
          ))}
        </div>
      </section>

      <ReelModal 
        isOpen={modalOpen} 
        closeModal={closeModal}
        embedUrl={modalData.embedUrl}
        title={modalData.title}
        creator={modalData.creator}
      />
    </>
  );
};

export default Reels;
