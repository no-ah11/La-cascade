let _map        = null;
let _userMarker = null;
let _userAcc    = null;
let _firstGPS   = true;

const CENTER    = [43.5640, 6.1800];
const MAX_DIST  = 5; // km — au-delà : pas de recentrage auto

const POINTS = [
  { id: 1, coords: [43.5672, 6.1812], color: '#F5A623' },
  { id: 2, coords: [43.5642, 6.1808], color: '#4DB8FF' },
  { id: 3, coords: [43.5618, 6.1798], color: '#A8E63D' },
  { id: 4, coords: [43.5608, 6.1788], color: '#4DB8FF' },
  { id: 5, coords: [43.5603, 6.1793], color: '#E05C3A' },
  { id: 6, coords: [43.5678, 6.1798], color: '#F5A623' },
];

function distKm(a, b) {
  const R = 6371;
  const dLat = (b[0] - a[0]) * Math.PI / 180;
  const dLon = (b[1] - a[1]) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2
    + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180)
    * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function makeIcon(point, accessible) {
  const fill         = accessible ? point.color : 'rgba(255,255,255,0.25)';
  const strokeColor  = 'white';
  const strokeOpacity = accessible ? '1' : '0.5';
  const strokeDash   = accessible ? '' : 'stroke-dasharray="4 3"';
  const numOpacity   = accessible ? '1' : '0.5';
  const html = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="16" fill="${fill}"
            stroke="${strokeColor}" stroke-opacity="${strokeOpacity}" stroke-width="2" ${strokeDash}/>
    <text x="18" y="18" text-anchor="middle" dominant-baseline="central"
          fill="white" fill-opacity="${numOpacity}" font-weight="700" font-size="14"
          font-family="DM Sans,sans-serif">${point.id}</text>
  </svg>`;
  return L.divIcon({ html, className: '', iconSize: [36, 36], iconAnchor: [18, 18] });
}

function initCarte() {
  if (_map) return;

  // Vérifier que Leaflet est chargé
  if (typeof L === 'undefined') {
    const fb = document.getElementById('map-fallback');
    if (fb) fb.style.display = 'flex';
    return;
  }

  console.log('Carte Leaflet init', L.version);

  _map = L.map('map', {
    center: CENTER,
    zoom: 16,
    zoomControl: false,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(_map);

  setTimeout(() => _map.invalidateSize(), 100);

  // Sentier pointillé vert
  L.polyline(POINTS.map(p => p.coords), {
    color: 'rgba(145,255,5,0.6)',
    weight: 3,
    dashArray: '6, 8'
  }).addTo(_map);

  // Marqueurs
  const completed = window.STATE.getCompletedCapsules();
  const skipped   = window.STATE.getSkippedCapsules();

  POINTS.forEach(point => {
    const capsule    = window.CAPSULES ? window.CAPSULES.find(c => c.id === point.id) : null;
    const accessible = window.STATE.isCapsuleAccessible(point.id);
    const marker     = L.marker(point.coords, { icon: makeIcon(point, accessible) }).addTo(_map);

    marker.on('click', () => {
      if (accessible && capsule) {
        openCapsuleSheet(capsule);
      } else {
        openLockedSheet();
      }
    });
  });

  // Bouton Me localiser
  const locBtn = document.getElementById('btn-locate');
  if (locBtn) locBtn.addEventListener('click', locateUser);

  startGPS();
}

// ── GPS ───────────────────────────────────────────────────────────────────────

function startGPS() {
  if (!navigator.geolocation) return;
  navigator.geolocation.watchPosition(onGPS, onGPSError, {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 10000
  });
}

function onGPS(pos) {
  const lat    = pos.coords.latitude;
  const lng    = pos.coords.longitude;
  const acc    = pos.coords.accuracy;
  const latlng = [lat, lng];

  if (!_userMarker) {
    const icon = L.divIcon({
      html: `<div style="
        width:14px; height:14px; border-radius:50%;
        background:#50B1FE; border:2.5px solid white;
        box-shadow:0 0 0 5px rgba(80,177,254,0.22);
        animation:pulse-glow 2s ease-in-out infinite;">
      </div>`,
      className: '',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
    _userMarker = L.marker(latlng, { icon, zIndexOffset: 500 }).addTo(_map);
    _userAcc    = L.circle(latlng, {
      radius: acc,
      color: '#50B1FE', fillColor: '#50B1FE',
      fillOpacity: 0.07, weight: 1, opacity: 0.35
    }).addTo(_map);

    if (_firstGPS && distKm(latlng, CENTER) < MAX_DIST) {
      _map.flyTo(latlng, 17, { duration: 1.5 });
    }
    _firstGPS = false;
  } else {
    _userMarker.setLatLng(latlng);
    _userAcc.setLatLng(latlng).setRadius(acc);
  }
}

function onGPSError() {
  // Silencieux — l'utilisateur peut cliquer sur "Me localiser" pour voir le message
}

function locateUser() {
  if (_userMarker) {
    _map.flyTo(_userMarker.getLatLng(), 17, { duration: 1 });
    return;
  }
  if (!navigator.geolocation) { showGpsMsg(); return; }
  navigator.geolocation.getCurrentPosition(
    pos => _map.flyTo([pos.coords.latitude, pos.coords.longitude], 17, { duration: 1 }),
    showGpsMsg
  );
}

function showGpsMsg() {
  const el = document.getElementById('gps-msg');
  if (!el) return;
  el.textContent = 'Active la localisation pour te repérer sur le sentier.';
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3500);
}

// ── PANNEAUX ─────────────────────────────────────────────────────────────────

function openLockedSheet() {
  const sheet   = document.getElementById('sheet');
  const overlay = document.getElementById('sheet-overlay');
  if (!sheet) return;
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <p style="text-align:center; color:var(--color-text-muted); font-style:italic;
              padding:28px 16px; font-size:15px; line-height:1.6;">
      Ce lieu se dévoilera quand tu seras prêt, voyageur.
    </p>
  `;
  sheet.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function openCapsuleSheet(capsule) {
  const sheet   = document.getElementById('sheet');
  const overlay = document.getElementById('sheet-overlay');
  if (!sheet) return;

  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
      <div class="badge-number">${capsule.id}</div>
      <div style="flex:1;">
        <h2 style="font-size:22px; margin-bottom:4px;">${capsule.titre}</h2>
        <span class="badge" style="color:${capsule.theme_color}; border-color:${capsule.theme_color}40;">${capsule.theme}</span>
      </div>
      <div style="text-align:right;">
        <div style="font-family:var(--font-display); font-weight:700; font-size:20px;">${capsule.distance}</div>
        <div class="muted" style="font-size:12px;">À proximité</div>
      </div>
    </div>
    ${capsule.sous_titre ? `<div class="muted" style="font-size:13px; font-style:italic; margin-bottom:12px;">${capsule.sous_titre}</div>` : ''}
    <div class="card-citation" style="margin-bottom:14px;">
      <div class="citation-text" style="font-size:15px;">« ${capsule.citation} »</div>
    </div>
    <div style="display:flex; gap:10px;">
      <button class="btn-primary" style="flex:2;" onclick="openCapsule(${capsule.id})">
        Explorer ce lieu <span aria-hidden="true">→</span>
      </button>
      <button class="btn-secondary" style="flex:1;" onclick="openScanner()">
        📷 Scanner
      </button>
    </div>
  `;

  sheet.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function closeSheet() {
  const sheet   = document.getElementById('sheet');
  const overlay = document.getElementById('sheet-overlay');
  if (sheet)   sheet.classList.remove('open');
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
        <h3 style="margin-bottom:8px;">Scanner un repère</h3>
        <p class="muted" style="font-size:14px;">Scanne un QR code sur un panneau du sanctuaire pour déverrouiller la capsule directement sur place.</p>
        <button class="btn-primary" style="margin-top:20px;" onclick="this.closest('.modal-overlay').remove()">Compris</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('open'));
}

if (typeof window !== 'undefined') {
  window.initCarte      = initCarte;
  window.openCapsuleSheet = openCapsuleSheet;
  window.closeSheet     = closeSheet;
  window.openCapsule    = openCapsule;
  window.openScanner    = openScanner;
}
