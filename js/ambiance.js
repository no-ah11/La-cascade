(function () {
  function init() {
    const orb = document.createElement('div');
    orb.style.cssText = [
      'position:fixed',
      'left:calc(50% - 200px)',
      'top:calc(50% - 200px)',
      'width:400px',
      'height:400px',
      'border-radius:50%',
      'background:radial-gradient(circle, rgba(80,177,254,0.25) 0%, transparent 65%)',
      'pointer-events:none',
      'z-index:-1',
      'filter:blur(70px)',
      'animation:orb-3 20s ease-in-out infinite alternate'
    ].join(';');
    document.body.appendChild(orb);

    for (let i = 0; i < 10; i++) {
      const size      = 2 + Math.random() * 2;
      const floatDist = -(10 + Math.random() * 15);
      const duration  = 7 + Math.random() * 9;
      const delay     = Math.random() * 8;

      const dot = document.createElement('div');
      dot.style.cssText = [
        'position:fixed',
        `left:${(Math.random() * 100).toFixed(1)}vw`,
        `top:${(Math.random() * 100).toFixed(1)}vh`,
        `width:${size.toFixed(1)}px`,
        `height:${size.toFixed(1)}px`,
        'border-radius:50%',
        'background:rgba(80,177,254,0.5)',
        'opacity:0.7',
        'pointer-events:none',
        'z-index:-1',
        `--float-distance:${floatDist.toFixed(1)}px`,
        `animation:particle-float ${duration.toFixed(1)}s ${delay.toFixed(1)}s ease-in-out infinite alternate`
      ].join(';');
      document.body.appendChild(dot);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
