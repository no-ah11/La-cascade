let _map        = null;
let _userMarker = null;
let _userAcc    = null;
let _firstGPS   = true;

const CENTER    = [43.5655, 6.1820];
const MAX_DIST  = 5; // km — au-delà : pas de recentrage auto

const POINTS = [
  { id: 1, coords: [43.5668329, 6.1803599], color: '#F5A623' },
  { id: 2, coords: [43.5629170, 6.1834979], color: '#4DB8FF' },
  { id: 3, coords: [43.5636332, 6.1850868], color: '#A8E63D' },
  { id: 4, coords: [43.5627490, 6.1835985], color: '#4DB8FF' },
  { id: 5, coords: [43.5679750, 6.1792471], color: '#E05C3A' },
  { id: 6, coords: [43.5683589, 6.1813518], color: '#F5A623' },
];

const SENTIER_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    {"type":"Feature","geometry":{"type":"LineString","coordinates":[[6.1803597,43.5668329],[6.1801431,43.5667677],[6.179931,43.5666477],[6.1799623,43.5663495],[6.1799805,43.5660535],[6.1800618,43.5654644],[6.179972,43.5653653],[6.1799357,43.5652547],[6.1797828,43.5651712],[6.1810745,43.5649401],[6.1816757,43.56486],[6.1823137,43.5646973],[6.1825224,43.5645293],[6.182746,43.5645293],[6.1828169,43.5644677],[6.1828032,43.5643897],[6.1823092,43.5643526],[6.1820557,43.5643192],[6.1818115,43.5642808],[6.1817281,43.5641756],[6.181762,43.564083],[6.1821753,43.5637699],[6.1822939,43.563529],[6.1825846,43.5634148],[6.1827766,43.5633015],[6.1834321,43.5630144],[6.183696,43.5628033],[6.183596,43.562749]]}},
    {"type":"Feature","geometry":{"type":"LineString","coordinates":[[6.1835985,43.5627509],[6.1837514,43.562449],[6.1841734,43.5624836],[6.1842885,43.5626347],[6.1844568,43.5626366],[6.1843213,43.5626815],[6.1843722,43.5627329],[6.1844548,43.5627584],[6.1845903,43.5627557],[6.1845316,43.5628786],[6.1848119,43.563025],[6.1849901,43.563074],[6.185189,43.563523],[6.1851067,43.5635569],[6.1850833,43.5635917],[6.1850619,43.5636485]]}},
    {"type":"Feature","geometry":{"type":"LineString","coordinates":[[6.1851881,43.5635262],[6.1852619,43.5635068],[6.185305,43.5635139],[6.1854172,43.5634973],[6.1855325,43.5635103],[6.1856127,43.5635716],[6.1857879,43.5636108],[6.1859506,43.5637399],[6.1859953,43.5638195],[6.1860403,43.5638576],[6.1861107,43.5638691],[6.186238,43.5638706],[6.1862619,43.5639061],[6.1862886,43.5639538],[6.1863406,43.5640492],[6.1863426,43.5641056],[6.186324,43.5641623],[6.1861763,43.5642015],[6.1861085,43.5642008],[6.1860397,43.5641779],[6.1859846,43.5641598],[6.1859491,43.5641936],[6.1859574,43.5642509],[6.1860672,43.5643479],[6.1861431,43.5644367],[6.1861907,43.5645074],[6.1862441,43.5645637],[6.1862321,43.5646209],[6.1861161,43.5646026],[6.1859809,43.5645888],[6.1858914,43.5645648],[6.1857927,43.5646075],[6.1858088,43.564722],[6.1858829,43.5649053],[6.1859272,43.5649701],[6.1859003,43.5650406],[6.185738,43.5650654],[6.1856266,43.5650296],[6.1851427,43.5648632],[6.1847737,43.5648291],[6.1846194,43.5647767],[6.1843926,43.5648283],[6.1842202,43.5650665]]}},
    {"type":"Feature","geometry":{"type":"LineString","coordinates":[[6.1842092,43.5650806],[6.183069,43.5659982],[6.1823866,43.5672486],[6.1817436,43.5679601],[6.1813518,43.5683589]]}},
    {"type":"Feature","geometry":{"type":"LineString","coordinates":[[6.1813539,43.5683594],[6.1806464,43.5682734],[6.1805384,43.5681597],[6.1801313,43.568241],[6.1793313,43.5682806],[6.1790181,43.5682356],[6.1788622,43.5681926],[6.1786098,43.568128],[6.178462,43.5680603],[6.1783388,43.5679747],[6.1782089,43.5678376],[6.1780106,43.5674737],[6.1784326,43.5678932],[6.1789183,43.568039],[6.1792324,43.5679785],[6.1791293,43.5678505],[6.1789772,43.567655],[6.1790754,43.5675092],[6.1793403,43.5674097],[6.1802923,43.5670541],[6.1803599,43.5668331]]}}
  ]
};

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

  L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=j5GTbvHC4ExI3Tj8orVK', {
    attribution: '© <a href="https://www.maptiler.com">MapTiler</a> © <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 20
  }).addTo(_map);

  setTimeout(() => _map.invalidateSize(), 100);
  setTimeout(() => _map.invalidateSize(), 300);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && _map) setTimeout(() => _map.invalidateSize(), 200);
  });

  // Tracé du sentier — GeoJSON terrain
  L.geoJSON(SENTIER_GEOJSON, {
    style: { color: '#91FF05', weight: 4, opacity: 0.8 }
  }).addTo(_map);

  // Marqueurs
  POINTS.forEach(point => {
    const capsule    = window.CAPSULES ? window.CAPSULES.find(c => c.id === point.id) : null;
    const accessible = window.STATE.isCapsuleAccessible(point.id);
    const marker     = L.marker(point.coords, {
      icon: makeIcon(point, accessible),
      interactive: accessible
    }).addTo(_map);

    if (accessible && capsule) {
      marker.on('click', () => openCapsuleSheet(capsule));
    } else {
      marker.off('click');
    }
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

window.addEventListener('pageshow', () => {
  if (_map) setTimeout(() => _map.invalidateSize(), 200);
});
