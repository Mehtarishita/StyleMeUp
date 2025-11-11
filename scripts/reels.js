// reels.js — handles thumbnails, modal player, filters, likes, comment & share
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- helpers ---------------- */
  function getYouTubeId(url) {
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
  }
  function toEmbedUrl(raw) {
    const id = getYouTubeId(raw);
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
  }

  /* ---------------- build reel card UI from placeholders ---------------- */
  const reelItems = document.querySelectorAll('.reel-item');
  reelItems.forEach(item => {
    const raw = item.dataset.video || '';
    const title = item.dataset.title || '';
    const creator = item.dataset.creator || '';
    const duration = item.dataset.duration || '';
    const id = getYouTubeId(raw);
    const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : 'assets/images/reels/placeholder.jpg';

    // create inner structure
    item.innerHTML = `
      <div class="reel-thumb" role="button" tabindex="0" aria-label="Play ${title}" data-video="${raw}">
        <img src="${thumb}" alt="${title}">
        <div class="play-overlay" aria-hidden="true">
          <!-- small inline svg play -->
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#111">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
      </div>
      <div class="reel-meta">
        <h4>${title}</h4>
        <div class="byline">${creator} • ${duration}</div>
      </div>
      <div class="reel-actions">
        <button class="action-btn like-btn" aria-pressed="false"><i class="fa-regular fa-heart"></i><span class="count">0</span></button>
        <button class="action-btn comment-btn"><i class="fa-regular fa-comment"></i><span>Comment</span></button>
        <button class="action-btn share-btn"><i class="fa-solid fa-share"></i><span>Share</span></button>
      </div>
    `;

    // click on thumb => open modal
    const thumbEl = item.querySelector('.reel-thumb');
    thumbEl.addEventListener('click', () => {
      const url = thumbEl.dataset.video;
      const embed = toEmbedUrl(url);
      if (!embed) return alert('Invalid video URL');
      openModal(embed, title, creator);
    });
    thumbEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') thumbEl.click(); });

    // like button
    const likeBtn = item.querySelector('.like-btn');
    const countSpan = likeBtn.querySelector('.count');
    likeBtn.addEventListener('click', () => {
      const liked = likeBtn.classList.toggle('liked');
      likeBtn.setAttribute('aria-pressed', liked ? 'true' : 'false');
      const current = parseInt(countSpan.textContent || '0', 10);
      countSpan.textContent = liked ? (current + 1) : Math.max(0, current - 1);
      // switch icon to solid heart when liked
      likeBtn.querySelector('i').className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    });

    // comment button
    const commentBtn = item.querySelector('.comment-btn');
    commentBtn.addEventListener('click', () => {
      const comment = prompt('Add a quick comment (demo):');
      if (comment) alert('Comment posted: "' + comment + '" (demo)');
    });

    // share button
    const shareBtn = item.querySelector('.share-btn');
    shareBtn.addEventListener('click', async () => {
      const url = item.dataset.video;
      try {
        await navigator.clipboard.writeText(url);
        shareBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Link Copied</span>';
        setTimeout(()=> { shareBtn.innerHTML = '<i class="fa-solid fa-share"></i><span>Share</span>'; }, 1500);
      } catch (e) {
        alert('Copy failed — here is the link: ' + url);
      }
    });

  }); // end build reel items

  /* ---------------- modal behaviour ---------------- */
  const modal = document.getElementById('reelModal');
  const iframe = document.getElementById('reelIframe');
  const modalTitle = document.getElementById('reelModalTitle');
  const modalCreator = document.getElementById('reelModalCreator');
  const closeBtn = document.getElementById('reelModalClose');
  const backdrop = document.getElementById('reelModalBackdrop');

  function openModal(embedUrl, title, creator) {
    iframe.src = embedUrl;
    modalTitle.textContent = title || '';
    modalCreator.textContent = creator || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    iframe.src = '';
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=> { if (e.key === 'Escape') closeModal(); });

  /* ---------------- filters ---------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.reel-item').forEach(item => {
        item.style.display = (f === 'all' || item.dataset.category === f) ? '' : 'none';
      });
    });
  });

}); // DOMContentLoaded
