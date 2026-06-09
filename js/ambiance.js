(function () {
  const COLORS = [
    'rgba(80,177,254,0.4)',
    'rgba(145,255,5,0.3)',
    'rgba(245,206,24,0.25)'
  ];

  function spawnParticles() {
    for (let i = 0; i < 15; i++) {
      const size     = 1 + Math.random() * 2;
      const floatDist = -(8 + Math.random() * 12);
      const duration = 5 + Math.random() * 9;
      const delay    = Math.random() * 8;
      const color    = COLORS[Math.floor(Math.random() * COLORS.length)];

      const dot = document.createElement('div');
      dot.style.cssText = [
        'position:fixed',
        `left:${(Math.random() * 100).toFixed(1)}vw`,
        `top:${(Math.random() * 100).toFixed(1)}vh`,
        `width:${size.toFixed(1)}px`,
        `height:${size.toFixed(1)}px`,
        'border-radius:50%',
        `background:${color}`,
        'opacity:0.5',
        'pointer-events:none',
        'z-index:-1',
        `--float-distance:${floatDist.toFixed(1)}px`,
        `animation:particle-float ${duration.toFixed(1)}s ${delay.toFixed(1)}s ease-in-out infinite alternate`
      ].join(';');

      document.body.appendChild(dot);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', spawnParticles);
  } else {
    spawnParticles();
  }
})();
