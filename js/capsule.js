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
    document.body.innerHTML = '<div class="container"><p>Étape introuvable.</p></div>';
    return;
  }

  window.STATE.markCapsuleVisited(id);

  const CAPSULE_LABELS = {
    1: "L'église · Départ",
    2: "Le tuff · Eau & Géologie",
    3: "Le belvédère · Biodiversité",
    4: "La Bresque · Eau & Géologie",
    5: "Les remparts · Risques",
    6: "La Grande Rue · Arrivée"
  };

  const nextUrl = id < 6 ? `capsule.html?id=${id + 1}` : 'carte.html';
  const root = document.getElementById('capsule-root');
  root.innerHTML = `
    <div class="capsule-hero" style="position:relative; width:100%; height: clamp(200px, 32vh, 280px); overflow:hidden;">
      ${renderImageOrPlaceholder(capsule.image, capsule.titre, capsule.theme_color)}
      <div style="position:absolute; inset:0; background: linear-gradient(180deg, rgba(10,22,40,0.5) 0%, transparent 30%, rgba(10,22,40,0.6) 70%, var(--color-bg) 100%);"></div>

      <div style="position:absolute; top: calc(12px + var(--safe-top)); left:16px; right:16px; display:flex; justify-content:space-between; align-items:center;">
        <button class="btn-icon-round" onclick="navigateTo('carte.html')" aria-label="Retour">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="italic" style="font-size:13px; color: rgba(255,255,255,0.8);">${CAPSULE_LABELS[id] || `Étape ${id} / 6`}</div>
        <div style="width:44px;"></div>
      </div>

      <div style="position:absolute; bottom:14px; left:18px; right:18px; display:flex; align-items:flex-end; gap:10px;">
        <div class="badge-number lg">${capsule.id}</div>
        <div style="flex:1; min-width:0;">
          <h1 style="font-size: clamp(22px, 7vw, 30px); margin-bottom:4px; line-height:1.1;">${capsule.titre}</h1>
          ${capsule.sous_titre ? `<div class="muted" style="font-size:12px; font-style: italic; margin-bottom:4px;">${capsule.sous_titre}</div>` : ''}
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span class="badge" style="color:${capsule.theme_color}; border-color:${capsule.theme_color}40;">${capsule.theme}</span>
            <span class="muted" style="font-size:12px;">📍 ${capsule.distance}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="padding-top:16px; padding-bottom: calc(96px + var(--safe-bottom));">
      <div class="card-citation anim-fade-in" style="margin-bottom:16px;">
        <div class="citation-text">« ${capsule.citation} »</div>
      </div>

      <div class="capsule-text anim-fade-in delay-100" style="opacity:0;">
        ${capsule.texte.split('\n\n').map(p => `<p style="margin-bottom:14px;">${p}</p>`).join('')}
      </div>

      <div class="saviez-vous anim-fade-in delay-200" style="opacity:0;">
        <div class="saviez-vous-label">Le saviez-vous ?</div>
        <div class="saviez-vous-text">${capsule.saviez_vous}</div>
      </div>

      <h3 style="margin: 20px 0 10px; font-family: var(--font-body); font-size:12px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color: var(--color-text-muted);">Médias</h3>

      <div class="media-list">
        <button class="media-card anim-fade-in delay-300" style="opacity:0;" onclick="openPhotos(${id})">
          <div class="media-card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-7 7"/></svg>
          </div>
          <div class="media-card-text">
            <div class="media-card-title">Photos</div>
            <div class="media-card-subtitle">Photos du lieu</div>
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
            <div class="media-card-title">Écouter l'audio</div>
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
            <div class="media-card-title">Comprendre en image</div>
            <div class="media-card-subtitle">Schéma légendé du lieu</div>
          </div>
          <div class="media-card-arrow">→</div>
        </button>
      </div>

    </div>

    <div class="cta-fixed-bottom">
      <div style="display:flex; gap:10px;">
        <button id="cta-skip-btn"
          style="flex:0 0 40%; padding:15px 12px; border-radius:var(--radius-pill);
                 border:1px solid rgba(255,255,255,0.4); background:transparent;
                 color:var(--color-text); font-size:15px; font-weight:600; cursor:pointer;">
          Passer →
        </button>
        <button class="btn-primary" id="cta-question" disabled style="flex:1; opacity:0.5;">
          Tester mes connaissances <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  `;

  const skipBtn = document.getElementById('cta-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Marquer comme visité
      window.STATE.markCapsuleSkipped(id);

      // Noms des étapes suivantes
      const NEXT_LABELS = { 2: 'Le tuff', 3: 'Le belvédère', 4: 'La Bresque', 5: 'Les remparts', 6: 'La Grande Rue' };
      const btn2Label = id < 6 ? `Continuer vers ${NEXT_LABELS[id + 1]} →` : 'Voir mon bilan →';
      const btn2Href  = id < 6 ? `capsule.html?id=${id + 1}` : 'apres-visite.html';

      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9999;';

      const card = document.createElement('div');
      card.style.cssText = [
        'position:fixed', 'top:50%', 'left:50%', 'transform:translate(-50%,-50%)',
        'background:#0A1628', 'border:1px solid rgba(80,177,254,0.4)',
        'border-radius:20px', 'padding:28px',
        'max-width:320px', 'width:calc(100% - 40px)',
        'text-align:center', 'z-index:10000'
      ].join(';');

      card.innerHTML = `
        <img src="assets/icons/logo-sillans.svg" alt=""
          class="anim-levitate"
          style="width:50px; height:50px; display:block; margin:0 auto 20px;"
          onerror="this.style.display='none';" />
        <p style="font-family:var(--font-display); font-style:italic; font-size:18px;
                  color:#fff; line-height:1.6; margin-bottom:10px;">
          « Prends un souffle, voyageur.<br/>Le sentier continue devant toi. »
        </p>
        <p style="font-size:13px; color:#50B1FE; margin-bottom:24px;">
          Que souhaites-tu faire ?
        </p>
        <button id="_skip_btn1" style="display:block; width:100%; padding:14px 16px;
          border-radius:var(--radius-pill); background:#50B1FE; color:#0A1628;
          font-weight:700; font-size:15px; border:none; cursor:pointer; margin-bottom:12px;">
          Voir le prochain point sur la carte →
        </button>
        <button id="_skip_btn2" style="display:block; width:100%; padding:14px 16px;
          border-radius:var(--radius-pill); background:transparent;
          border:1px solid rgba(255,255,255,0.3); color:#fff;
          font-weight:600; font-size:15px; cursor:pointer;">
          ${btn2Label}
        </button>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(card);

      overlay.addEventListener('click', () => { overlay.remove(); card.remove(); });

      card.querySelector('#_skip_btn1').addEventListener('click', () => {
        window.location.href = 'carte.html';
      });

      card.querySelector('#_skip_btn2').addEventListener('click', () => {
        window.location.href = btn2Href;
      });
    });
  }

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
  }, 1200);

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
