function navigateTo(url) {
  document.body.classList.add('page-exit');
  setTimeout(() => {
    window.location.href = url;
  }, 200);
}

function attachNavigation() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = el.getAttribute('data-nav');
      if (target) navigateTo(target);
    });
  });
}

function spawnAmbiance() {
  const count  = 8 + Math.floor(Math.random() * 5);
  const colors = ['rgba(80,177,254,0.15)', 'rgba(145,255,5,0.10)'];
  for (let i = 0; i < count; i++) {
    const dot      = document.createElement('div');
    const size     = 2 + Math.random() * 2;
    const duration = 6 + Math.random() * 6;
    const delay    = Math.random() * 8;
    dot.style.cssText = [
      'position:fixed',
      `left:${Math.random() * 100}vw`,
      `top:${Math.random() * 100}vh`,
      `width:${size}px`,
      `height:${size}px`,
      'border-radius:50%',
      `background:${colors[i % 2]}`,
      'pointer-events:none',
      'z-index:-1',
      `animation:float-particle ${duration}s ${delay}s ease-in-out infinite`
    ].join(';');
    document.body.appendChild(dot);
  }
}

function initPage() {
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-enter');
      document.body.classList.add('page-loaded');
    });
  });
  attachNavigation();
  spawnAmbiance();
}

document.addEventListener('DOMContentLoaded', initPage);

if (typeof window !== 'undefined') {
  window.navigateTo = navigateTo;
}
