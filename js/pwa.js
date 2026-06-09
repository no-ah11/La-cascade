(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').then(reg => {
        reg.addEventListener('updatefound', () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateToast();
            }
          });
        });
      }).catch(err => console.warn('[SW] register failed:', err.message));

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('app-installed') === '1') return;
    if (window.location.pathname.endsWith('accueil.html')) return;
    const badge = document.getElementById('badge-offline');
    if (!badge) return;
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', () => {
      localStorage.setItem('coracia_open_popup', '1');
      window.location.href = 'accueil.html';
    });
  });

  function showUpdateToast() {
    if (document.getElementById('pwa-update-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'pwa-update-toast';
    toast.style.cssText = 'position:fixed; bottom: calc(80px + env(safe-area-inset-bottom, 0px)); left:50%; transform: translateX(-50%); background: var(--color-surface, #0F2040); border: 1px solid var(--color-accent-green, #A8E63D); color: #fff; padding: 10px 16px; border-radius: 999px; font-size: 13px; z-index: 9999; box-shadow: 0 6px 20px rgba(0,0,0,0.4); display:flex; align-items:center; gap:10px;';
    toast.innerHTML = `<span>Nouvelle version disponible</span><button style="background:#A8E63D; color:#0A1628; border:none; padding: 6px 12px; border-radius: 999px; font-weight:600; cursor:pointer;">Recharger</button>`;
    toast.querySelector('button').onclick = () => {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg && reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      });
    };
    document.body.appendChild(toast);
  }
})();
