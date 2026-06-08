const STATE_KEY = "coracia_state";

const defaultState = {
  visited: false,
  capsules_visited: [],
  capsules_completed: [],
  couleurs_restaurees: 0,
  couleurs_unlocked: { blue: false, green: false, orange: false, red: false },
  quiz_score: null,
  current_capsule: null,
  quiz_current_question: 0,
  quiz_reponses: []
};

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {
    return { ...defaultState };
  }
}

function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function updateState(partial) {
  const state = loadState();
  const newState = { ...state, ...partial };
  saveState(newState);
  return newState;
}

function markCapsuleVisited(id) {
  const state = loadState();
  if (!state.capsules_visited.includes(id)) {
    state.capsules_visited.push(id);
  }
  saveState(state);
}

function markCapsuleCompleted(id) {
  const state = loadState();
  if (!state.capsules_completed.includes(id)) {
    state.capsules_completed.push(id);
  }
  saveState(state);
}

function getThemeKeyByCapsule(id) {
  if (id === 1 || id === 6) return 'orange';
  if (id === 2 || id === 4) return 'blue';
  if (id === 3) return 'green';
  if (id === 5) return 'red';
  return null;
}

function unlockCouleur(themeKey) {
  const state = loadState();
  if (!state.couleurs_unlocked[themeKey]) {
    state.couleurs_unlocked[themeKey] = true;
    state.couleurs_restaurees = Object.values(state.couleurs_unlocked).filter(Boolean).length;
  }
  saveState(state);
  return state;
}

function getNextCapsuleId() {
  const state = loadState();
  for (let i = 1; i <= 6; i++) {
    if (!state.capsules_completed.includes(i)) return i;
  }
  return null;
}

function isCapsuleUnlocked(id) {
  const state = loadState();
  if (id === 1) return true;
  return state.capsules_completed.includes(id - 1) || state.capsules_visited.includes(id);
}

function resetState() {
  localStorage.removeItem(STATE_KEY);
}

function markInstalled() {
  localStorage.setItem('app-installed', '1');
}

function isInstalled() {
  return localStorage.getItem('app-installed') === '1';
}

function markPopupSeen() {
  localStorage.setItem('popup-install-seen', '1');
}

function wasPopupSeen() {
  return localStorage.getItem('popup-install-seen') === '1';
}

function applyInstalledState() {
  const badge = document.getElementById('badge-offline');
  if (badge) {
    badge.classList.add('installed');
    badge.textContent = 'Hors-ligne ✓';
    badge.setAttribute('data-tooltip', 'Sanctuaire installé — tu es prêt');
    badge.removeAttribute('role');
    badge.removeAttribute('tabindex');
    badge.style.pointerEvents = 'none';
    badge.style.cursor = 'default';
  }
}

function applyBadgeState() { applyInstalledState(); }

document.addEventListener('DOMContentLoaded', () => {
  if (isInstalled()) applyInstalledState();
});

function getCoraciaLogo(n) {
  if (n <= 0) return 'assets/icons/Coracia_fatigué.svg';
  if (n === 1) return 'assets/icons/Coracia_1_sur_4.svg';
  if (n === 2) return 'assets/icons/Coracia_2_sur_4.svg';
  if (n === 3) return 'assets/icons/Coracia_3_sur_4.svg';
  return 'assets/icons/Coracia_4_sur_4.svg';
}

function handleQuizResult(capsule_id, score) {
  const capsule = window.CAPSULES ? window.CAPSULES.find(c => c.id === capsule_id) : null;
  const theme = capsule ? capsule.theme : '';
  let couleurs = parseInt(localStorage.getItem('coracia_couleurs') || '0');
  let benediction = localStorage.getItem('coracia_benediction') === 'true';
  const alreadyMax = (capsule_id === 5 || capsule_id === 6) && couleurs >= 4;
  let message = '', logoPath = '', special = false;

  if (alreadyMax) {
    special = true;
    message = 'Tu as rendu au sanctuaire toute sa splendeur.\nLe Coracia déploie ses ailes en ton honneur, gardien du lieu.';
    logoPath = getCoraciaLogo(4);
    return { message, logoPath, special };
  }

  if (score === 0) {
    if (couleurs > 0) {
      couleurs -= 1;
      message = 'Le sanctuaire s\'affaiblit...\nLe Coracia souffre de l\'indifférence des hommes.';
    } else if (benediction) {
      benediction = false;
      message = 'Ta bénédiction a protégé le Coracia.\nIl est de nouveau vulnérable.';
    } else {
      couleurs = -1;
      message = 'Le sanctuaire s\'affaiblit...\nLe Coracia souffre de l\'indifférence des hommes.';
    }
    logoPath = getCoraciaLogo(couleurs);
  } else if (score === 1) {
    message = 'Le Coracia observe.\nContinue ton chemin, voyageur.';
    logoPath = getCoraciaLogo(couleurs);
  } else if (score === 2) {
    if (couleurs < 4) couleurs += 1;
    message = 'Bien joué, voyageur !\nLe Coracia a retrouvé un peu de force.';
    logoPath = getCoraciaLogo(couleurs);
  } else if (score >= 3) {
    if (couleurs < 4) couleurs += 1;
    benediction = true;
    if (theme === 'Patrimoine') message = 'Ta compréhension du sanctuaire t\'octroie une bénédiction\nqui contre la malédiction des vandales du temps.';
    else if (theme === 'Eau & Géologie') message = 'Ta compréhension du sanctuaire t\'octroie une bénédiction\nqui contre la malédiction des profanateurs de l\'eau.';
    else if (theme === 'Biodiversité') message = 'Ta compréhension du sanctuaire t\'octroie une bénédiction\nqui contre la malédiction des prédateurs du silence.';
    else message = 'Ta compréhension du sanctuaire t\'octroie une bénédiction\nqui contre la malédiction des téméraires de la falaise.';
    logoPath = getCoraciaLogo(couleurs);
  }

  localStorage.setItem('coracia_couleurs', String(couleurs));
  localStorage.setItem('coracia_benediction', String(benediction));
  return { message, logoPath, special };
}

function markCapsuleCompletedQuiz(capsule_id) {
  const completed = getCompletedCapsules();
  if (!completed.includes(capsule_id)) {
    completed.push(capsule_id);
    localStorage.setItem('coracia_completed', JSON.stringify(completed));
  }
}

function getCompletedCapsules() {
  try { return JSON.parse(localStorage.getItem('coracia_completed') || '[]'); }
  catch { return []; }
}

function isCapsuleAccessible(capsule_id) {
  if (capsule_id === 1) return true;
  return getCompletedCapsules().includes(capsule_id - 1);
}

if (typeof window !== 'undefined') {
  window.STATE = {
    load: loadState,
    save: saveState,
    update: updateState,
    markCapsuleVisited,
    markCapsuleCompleted,
    getThemeKeyByCapsule,
    unlockCouleur,
    getNextCapsuleId,
    isCapsuleUnlocked,
    reset: resetState,
    markInstalled,
    isInstalled,
    markPopupSeen,
    wasPopupSeen,
    applyInstalledState,
    applyBadgeState,
    getCoraciaLogo,
    handleQuizResult,
    markCapsuleCompletedQuiz,
    getCompletedCapsules,
    isCapsuleAccessible
  };

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredInstallPrompt = e;
  });
}
