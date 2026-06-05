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

function initPage() {
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-enter');
      document.body.classList.add('page-loaded');
    });
  });
  attachNavigation();
}

document.addEventListener('DOMContentLoaded', initPage);

if (typeof window !== 'undefined') {
  window.navigateTo = navigateTo;
}
