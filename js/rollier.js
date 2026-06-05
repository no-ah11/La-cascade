function getRollierSVG(color = '#4DB8FF') {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="rg-${color.replace('#','')}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.6"/>
        </linearGradient>
      </defs>
      <path d="M50 18 C 35 22, 28 38, 35 48 L 30 55 C 22 50, 14 55, 14 60 C 18 58, 24 60, 28 62 L 24 70 C 20 70, 18 75, 22 78 C 28 76, 35 75, 42 76 L 50 82 L 58 76 C 65 75, 72 76, 78 78 C 82 75, 80 70, 76 70 L 72 62 C 76 60, 82 58, 86 60 C 86 55, 78 50, 70 55 L 65 48 C 72 38, 65 22, 50 18 Z" fill="url(#rg-${color.replace('#','')})"/>
      <circle cx="50" cy="32" r="3" fill="#0A1628"/>
      <path d="M48 38 L 52 38 L 50 42 Z" fill="#F5A623"/>
    </svg>
  `;
}

function spawnRollier(message, color) {
  const existing = document.querySelector('.rollier-spawn');
  if (existing) existing.remove();

  const finalColor = color || (window.ROLLIER_COLORS ? window.ROLLIER_COLORS[Math.floor(Math.random() * window.ROLLIER_COLORS.length)] : '#4DB8FF');
  const finalMsg = message || (window.ROLLIER_FELICITATIONS ? window.ROLLIER_FELICITATIONS[Math.floor(Math.random() * window.ROLLIER_FELICITATIONS.length)] : 'Bien joué, voyageur !');

  const container = document.createElement('div');
  container.className = 'rollier-spawn';
  container.innerHTML = `
    <div class="rollier-spawn-img">${getRollierSVG(finalColor)}</div>
    <div class="rollier-spawn-msg" style="border-color: ${finalColor}80; color: ${finalColor};">${finalMsg}</div>
  `;
  document.body.appendChild(container);

  setTimeout(() => {
    container.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
    container.style.opacity = '0';
    container.style.transform = 'translateX(-50%) translateY(-20px)';
  }, 2400);
  setTimeout(() => container.remove(), 2900);
}

if (typeof window !== 'undefined') {
  window.spawnRollier = spawnRollier;
  window.getRollierSVG = getRollierSVG;
}
