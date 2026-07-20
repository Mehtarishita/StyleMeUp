import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Check } from 'lucide-react';

const getYouTubeId = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const m = url.match(/(embed|shorts)\/([A-Za-z0-9_-]{6,})/);
    if (m && m[2]) return m[2];
  } catch (e) {
    const m = url.match(/([A-Za-z0-9_-]{6,})$/);
    if (m) return m[1];
  }
  return null;
};

const toEmbedUrl = (raw) => {
  const id = getYouTubeId(raw);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
};

export const ReelCard = ({ video, title, creator, duration, openModal }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const id = getYouTubeId(video);
  const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '/assets/images/reels/placeholder.jpg';

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? Math.max(0, likes - 1) : likes + 1);
  };

  const handleComment = () => {
    const comment = prompt('Add a quick comment (demo):');
    if (comment) alert('Comment posted: "' + comment + '" (demo)');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(video);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      alert('Copy failed — here is the link: ' + video);
    }
  };

  return (
    <div className="reel-item">
      <div 
        className="reel-thumb" 
        role="button" 
        tabIndex="0" 
        aria-label={`Play ${title}`}
        onClick={() => openModal(toEmbedUrl(video), title, creator)}
        onKeyDown={(e) => e.key === 'Enter' && openModal(toEmbedUrl(video), title, creator)}
      >
        <img src={thumb} alt={title} />
        <div className="play-overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#111">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
      </div>
      <div className="reel-meta">
        <h4>{title}</h4>
        <div className="byline">{creator} • {duration}</div>
      </div>
      <div className="reel-actions">
        <button 
          className={`action-btn like-btn ${liked ? 'liked' : ''}`} 
          aria-pressed={liked} 
          onClick={handleLike}
        >
          <Heart fill={liked ? 'currentColor' : 'none'} size={18} />
          <span className="count">{likes}</span>
        </button>
        <button className="action-btn comment-btn" onClick={handleComment}>
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button className="action-btn share-btn" onClick={handleShare}>
          {copied ? <Check size={18} /> : <Share2 size={18} />}
          <span>{copied ? 'Link Copied' : 'Share'}</span>
        </button>
      </div>
    </div>
  );
};

export const ReelModal = ({ embedUrl, title, creator, isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className={`reel-modal ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="reel-modal__backdrop" onClick={closeModal}></div>
      <div className="reel-modal__content">
        <button className="reel-modal__close" onClick={closeModal}>✕</button>
        <div className="reel-modal__player">
          <iframe 
            src={embedUrl} 
            title={title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
        <div className="reel-modal__meta">
          <h3>{title}</h3>
          <p>{creator}</p>
        </div>
      </div>
    </div>
  );
};
