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
    wasPopupSeen
  };
}
