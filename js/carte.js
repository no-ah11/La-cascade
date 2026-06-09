function initCarte() {
  const svg = document.getElementById('map-svg');
  if (!svg) return;

  window.CAPSULES.forEach(capsule => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('map-point');
    group.setAttribute('data-id', capsule.id);
    group.setAttribute('transform', `translate(${capsule.pos.x}, ${capsule.pos.y})`);
    group.style.cursor = 'pointer';

    const completed = window.STATE.getCompletedCapsules();
    const isCompleted = completed.includes(capsule.id);
    const isAccessible = window.STATE.isCapsuleAccessible(capsule.id);
    const isActive = isAccessible && !isCompleted;
    const isLocked = !isAccessible;

    if (isActive) {
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('r', '22');
      pulse.setAttribute('fill', 'none');
      pulse.setAttribute('stroke', capsule.theme_color);
      pulse.setAttribute('stroke-width', '2');
      pulse.setAttribute('opacity', '0.6');
      pulse.style.animation = 'pulse-svg 2s ease-out infinite';
      group.appendChild(pulse);
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '20');
    if (isCompleted) {
      circle.setAttribute('fill', capsule.theme_color);
      circle.setAttribute('stroke', capsule.theme_color);
      circle.setAttribute('stroke-width', '2');
      circle.style.filter = `drop-shadow(0 0 8px ${capsule.theme_color}80)`;
    } else if (isActive) {
      circle.setAttribute('fill', capsule.theme_color);
      circle.setAttribute('stroke', '#FFFFFF');
      circle.setAttribute('stroke-width', '2');
    } else {
      circle.setAttribute('fill', '#2A3F5A');
      circle.setAttribute('stroke', '#4A5F7A');
      circle.setAttribute('stroke-width', '1');
      circle.setAttribute('opacity', '0.7');
    }
    group.appendChild(circle);

    if (isLocked) {
      const lock = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      lock.setAttribute('d', 'M-5,-2 L-5,2 L5,2 L5,-2 Z M-3,-2 L-3,-5 a 3,3 0 0 1 6,0 L 3,-2 M-1,-5 a 1,1 0 0 1 2,0');
      lock.setAttribute('fill', 'none');
      lock.setAttribute('stroke', '#7A90A8');
      lock.setAttribute('stroke-width', '1.5');
      lock.setAttribute('stroke-linecap', 'round');
      lock.setAttribute('stroke-linejoin', 'round');
      group.appendChild(lock);
    } else if (isCompleted) {
      const check = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      check.setAttribute('d', 'M-6,0 L-2,4 L6,-4');
      check.setAttribute('fill', 'none');
      check.setAttribute('stroke', '#FFFFFF');
      check.setAttribute('stroke-width', '2.5');
      check.setAttribute('stroke-linecap', 'round');
      check.setAttribute('stroke-linejoin', 'round');
      group.appendChild(check);
    } else {
      const num = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      num.setAttribute('text-anchor', 'middle');
      num.setAttribute('dy', '5');
      num.setAttribute('fill', '#0A1628');
      num.setAttribute('font-weight', '700');
      num.setAttribute('font-size', '14');
      num.setAttribute('font-family', 'DM Sans, sans-serif');
      num.textContent = capsule.id;
      group.appendChild(num);
    }

    if (!isLocked) {
      group.addEventListener('click', () => openCapsuleSheet(capsule));
    } else {
      group.addEventListener('click', () => {
        const sheet = document.getElementById('sheet');
        if (sheet) {
          sheet.classList.add('shake');
          setTimeout(() => sheet.classList.remove('shake'), 400);
        }
      });
    }
    svg.appendChild(group);
  });

  const nextAccessible = window.CAPSULES.find(c =>
    window.STATE.isCapsuleAccessible(c.id) && !window.STATE.getCompletedCapsules().includes(c.id)
  );
  if (nextAccessible) openCapsuleSheet(nextAccessible);
}

function openCapsuleSheet(capsule) {
  const sheet = document.getElementById('sheet');
  const overlay = document.getElementById('sheet-overlay');
  if (!sheet) return;

  const isCompleted = window.STATE.getCompletedCapsules().includes(capsule.id);

  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
      <div class="badge-number">${capsule.id}</div>
      <div style="flex:1;">
        <h2 style="font-size:24px; margin-bottom:4px;">${capsule.titre}</h2>
        <span class="badge" style="color:${capsule.theme_color}; border-color:${capsule.theme_color}40;">${capsule.theme}</span>
      </div>
      <div style="text-align:right;">
        <div style="font-family: var(--font-display); font-weight:700; font-size:22px;">${capsule.distance}</div>
        <div class="muted" style="font-size:12px;">À proximité</div>
      </div>
    </div>
    ${capsule.sous_titre ? `<div class="muted" style="font-size:13px; font-style: italic; margin-bottom: 14px;">${capsule.sous_titre}</div>` : ''}
    <div class="card-citation" style="margin-bottom:16px;">
      <div class="citation-text">« ${capsule.citation} »</div>
    </div>
    <div style="display:flex; gap:10px; margin-top:8px;">
      <button class="btn-primary" style="flex:2;" onclick="openCapsule(${capsule.id})">
        Explorer ce lieu <span aria-hidden="true">→</span>
      </button>
      <button class="btn-secondary" style="flex:1;" onclick="openScanner()">
        📷 Scanner
      </button>
    </div>
    ${isCompleted ? '<div style="text-align:center; margin-top:12px; color: var(--color-accent-green); font-size:13px;">✓ Déjà visité</div>' : ''}
  `;

  sheet.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function closeSheet() {
  const sheet = document.getElementById('sheet');
  const overlay = document.getElementById('sheet-overlay');
  if (sheet) sheet.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function openCapsule(id) {
  localStorage.setItem('coracia_current_capsule', id);
  window.STATE.markCapsuleVisited(id);
  navigateTo(`capsule.html?id=${id}`);
}

function openScanner() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" style="position:relative;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <div style="text-align:center; padding:8px;">
        <div style="width:120px; height:120px; margin:0 auto 16px; background:#FFFFFF; border-radius:12px; padding:12px;">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect x="10" y="10" width="20" height="20" fill="#0A1628"/>
            <rect x="70" y="10" width="20" height="20" fill="#0A1628"/>
            <rect x="10" y="70" width="20" height="20" fill="#0A1628"/>
            <rect x="40" y="40" width="8" height="8" fill="#0A1628"/>
            <rect x="55" y="40" width="8" height="8" fill="#0A1628"/>
            <rect x="40" y="55" width="8" height="8" fill="#0A1628"/>
            <rect x="55" y="55" width="8" height="8" fill="#0A1628"/>
            <rect x="70" y="55" width="20" height="8" fill="#0A1628"/>
          </svg>
        </div>
        <h3 style="margin-bottom:8px;">Scanner un repère</h3>
        <p class="muted" style="font-size:14px;">Scanne un QR code sur un panneau du sanctuaire pour déverrouiller la capsule correspondante directement sur place.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="this.closest('.modal-overlay').remove()">Compris</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('open'));
}

if (typeof window !== 'undefined') {
  window.initCarte = initCarte;
  window.openCapsuleSheet = openCapsuleSheet;
  window.closeSheet = closeSheet;
  window.openCapsule = openCapsule;
  window.openScanner = openScanner;
}
