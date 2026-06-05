function getCapsuleId() {
  const url = new URLSearchParams(window.location.search);
  const fromUrl = parseInt(url.get('id'));
  if (fromUrl) return fromUrl;
  const stored = parseInt(localStorage.getItem('coracia_current_capsule'));
  return stored || 1;
}

function renderImageOrPlaceholder(src, alt, fallbackTheme) {
  const themeColor = fallbackTheme || '#4DB8FF';
  return `
    <div class="capsule-image-wrap" style="width:100%; height:100%; position:relative;">
      <img src="${src}" alt="${alt}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"/>
      <div class="placeholder-image" style="display:none; position:absolute; inset:0; background: linear-gradient(135deg, ${themeColor}20 0%, var(--color-surface) 100%);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <circle cx="9" cy="11" r="2"/>
          <path d="M21 17l-5-5-7 7"/>
        </svg>
        <span>Image à venir</span>
      </div>
    </div>
  `;
}

function initCapsule() {
  const id = getCapsuleId();
  const capsule = window.CAPSULES.find(c => c.id === id);
  if (!capsule) {
    document.body.innerHTML = '<div class="container"><p>Capsule introuvable.</p></div>';
    return;
  }

  window.STATE.markCapsuleVisited(id);

  const root = document.getElementById('capsule-root');
  root.innerHTML = `
    <div class="capsule-hero" style="position:relative; width:100%; height:280px; overflow:hidden;">
      ${renderImageOrPlaceholder(capsule.image, capsule.titre, capsule.theme_color)}
      <div style="position:absolute; inset:0; background: linear-gradient(180deg, rgba(10,22,40,0.5) 0%, transparent 30%, rgba(10,22,40,0.6) 70%, var(--color-bg) 100%);"></div>

      <div style="position:absolute; top:20px; left:20px; right:20px; display:flex; justify-content:space-between; align-items:center;">
        <button class="btn-icon-round" data-nav="carte.html" aria-label="Retour">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="italic" style="font-size:16px; color: rgba(255,255,255,0.8);">Capsule ${id} / 6</div>
        <div style="width:44px;"></div>
      </div>

      <div style="position:absolute; bottom:16px; left:20px; right:20px; display:flex; align-items:flex-end; gap:12px;">
        <div class="badge-number lg">${capsule.id}</div>
        <div style="flex:1;">
          <h1 style="font-size:32px; margin-bottom:6px;">${capsule.titre}</h1>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="badge" style="color:${capsule.theme_color}; border-color:${capsule.theme_color}40;">${capsule.theme}</span>
            <span class="muted" style="font-size:13px;">📍 ${capsule.distance} · À proximité</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="padding-top:20px; padding-bottom:120px;">
      <div class="card-citation anim-fade-in" style="margin-bottom:20px;">
        <div class="citation-icon">${getRollierSVG(capsule.theme_color)}</div>
        <div class="citation-text">« ${capsule.citation} »</div>
      </div>

      <div class="capsule-text anim-fade-in delay-100" style="opacity:0;">
        ${capsule.texte.split('\n\n').map(p => `<p style="margin-bottom:16px;">${p}</p>`).join('')}
      </div>

      <div class="saviez-vous anim-fade-in delay-200" style="opacity:0;">
        <div class="saviez-vous-label">Le saviez-vous ?</div>
        <div class="saviez-vous-text">${capsule.saviez_vous}</div>
      </div>

      <h3 style="margin: 28px 0 12px; font-family: var(--font-body); font-size:13px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color: var(--color-text-muted);">Médias</h3>

      <div class="media-list">
        <button class="media-card anim-fade-in delay-300" style="opacity:0;" onclick="openPhotos(${id})">
          <div class="media-card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-7 7"/></svg>
          </div>
          <div class="media-card-text">
            <div class="media-card-title">Photos</div>
            <div class="media-card-subtitle">Diaporama du lieu</div>
          </div>
          <div class="media-card-arrow">→</div>
        </button>

        <button class="media-card anim-fade-in delay-300" style="opacity:0;" onclick="openVideo(${id})">
          <div class="media-card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="media-card-text">
            <div class="media-card-title">Vidéo</div>
            <div class="media-card-subtitle">Découvre en images</div>
          </div>
          <div class="media-card-arrow">→</div>
        </button>

        <button class="media-card anim-fade-in delay-400" style="opacity:0;" onclick="toggleAudio(${id})">
          <div class="media-card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <div class="media-card-text">
            <div class="media-card-title">Écouter le commentaire</div>
            <div class="media-card-subtitle">Narration ${capsule.duree_audio}</div>
          </div>
          <div class="media-card-arrow">→</div>
        </button>

        <div id="audio-player-${id}" style="display:none; padding:16px; background: var(--color-surface-2); border-radius: var(--radius-md);">
          <audio controls style="width:100%;" src="${capsule.audio}"></audio>
          <div class="muted" style="font-size:12px; margin-top:8px; text-align:center;">Si l'audio ne joue pas, le fichier n'est pas encore disponible.</div>
        </div>

        <button class="media-card anim-fade-in delay-400" style="opacity:0;" onclick="openSchema(${id})">
          <div class="media-card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </div>
          <div class="media-card-text">
            <div class="media-card-title">Schéma légendé</div>
            <div class="media-card-subtitle">Comprendre en un coup d'œil</div>
          </div>
          <div class="media-card-arrow">→</div>
        </button>
      </div>
    </div>

    <div style="position:fixed; bottom:0; left:0; right:0; padding:16px 20px; background: linear-gradient(to top, var(--color-bg) 60%, transparent); z-index:50;">
      <div style="max-width:480px; margin:0 auto;">
        <button class="btn-primary" id="cta-question" disabled style="opacity:0.5;">
          Répondre à la question <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const cta = document.getElementById('cta-question');
    if (cta) {
      cta.disabled = false;
      cta.style.opacity = '1';
      cta.onclick = () => {
        localStorage.setItem('coracia_quiz_capsule', id);
        navigateTo(`quiz.html?capsule=${id}`);
      };
    }
  }, 3000);

  const hero = document.querySelector('.capsule-hero');
  window.addEventListener('scroll', () => {
    if (hero) {
      const scrollY = window.scrollY;
      hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

function openPhotos(capsuleId) {
  const capsule = window.CAPSULES.find(c => c.id === capsuleId);
  if (!capsule) return;

  let current = 0;
  const photos = capsule.photos;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">✕</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Précédent">‹</button>
    <div class="lightbox-content" id="lb-content"></div>
    <button class="lightbox-nav lightbox-next" aria-label="Suivant">›</button>
    <div style="position:absolute; bottom:24px; left:0; right:0; text-align:center; color: rgba(255,255,255,0.7); font-size:14px;" id="lb-counter">1 / ${photos.length}</div>
  `;
  document.body.appendChild(lightbox);

  function render() {
    const content = lightbox.querySelector('#lb-content');
    content.innerHTML = `
      <img src="${photos[current]}" alt="" style="opacity:0; transition: opacity 200ms ease;" onerror="this.outerHTML='<div class=&quot;placeholder-image&quot; style=&quot;width:300px; height:300px;&quot;><svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;><rect x=&quot;3&quot; y=&quot;5&quot; width=&quot;18&quot; height=&quot;14&quot; rx=&quot;2&quot;/></svg><span>Image à venir</span></div>';" onload="this.style.opacity=1;"/>
    `;
    lightbox.querySelector('#lb-counter').textContent = `${current + 1} / ${photos.length}`;
  }
  render();

  lightbox.querySelector('.lightbox-close').onclick = () => { lightbox.classList.remove('open'); setTimeout(() => lightbox.remove(), 200); };
  lightbox.querySelector('.lightbox-prev').onclick = () => { current = (current - 1 + photos.length) % photos.length; render(); };
  lightbox.querySelector('.lightbox-next').onclick = () => { current = (current + 1) % photos.length; render(); };

  requestAnimationFrame(() => lightbox.classList.add('open'));
}

function openVideo(capsuleId) {
  const capsule = window.CAPSULES.find(c => c.id === capsuleId);
  if (!capsule) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close">✕</button>
    <div class="lightbox-content">
      <video controls autoplay style="width:100%;" onerror="this.outerHTML='<div class=&quot;placeholder-image&quot; style=&quot;width:90vw; max-width:500px; height:300px;&quot;><svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;><polygon points=&quot;5 3 19 12 5 21 5 3&quot;/></svg><span>Vidéo à venir</span></div>';">
        <source src="${capsule.video}" type="video/mp4">
      </video>
    </div>
  `;
  document.body.appendChild(lightbox);
  lightbox.querySelector('.lightbox-close').onclick = () => { lightbox.classList.remove('open'); setTimeout(() => lightbox.remove(), 200); };
  requestAnimationFrame(() => lightbox.classList.add('open'));
}

function toggleAudio(capsuleId) {
  const player = document.getElementById(`audio-player-${capsuleId}`);
  if (player) {
    player.style.display = player.style.display === 'none' ? 'block' : 'none';
  }
}

function openSchema(capsuleId) {
  const capsule = window.CAPSULES.find(c => c.id === capsuleId);
  if (!capsule) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close">✕</button>
    <div class="lightbox-content">
      <img src="${capsule.schema}" alt="Schéma" onerror="this.outerHTML='<div class=&quot;placeholder-image&quot; style=&quot;width:90vw; max-width:500px; height:400px;&quot;><svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;><rect x=&quot;3&quot; y=&quot;3&quot; width=&quot;18&quot; height=&quot;18&quot; rx=&quot;2&quot;/></svg><span>Schéma à venir</span></div>';"/>
    </div>
  `;
  document.body.appendChild(lightbox);
  lightbox.querySelector('.lightbox-close').onclick = () => { lightbox.classList.remove('open'); setTimeout(() => lightbox.remove(), 200); };
  requestAnimationFrame(() => lightbox.classList.add('open'));
}

if (typeof window !== 'undefined') {
  window.initCapsule = initCapsule;
  window.openPhotos = openPhotos;
  window.openVideo = openVideo;
  window.toggleAudio = toggleAudio;
  window.openSchema = openSchema;
}
