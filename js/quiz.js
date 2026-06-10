let quizCapsuleId = 1;
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const MESSAGES_CORRECT = [
  "Bien joué, voyageur !",
  "Le sanctuaire te reconnaît.",
  "Tu écoutes bien la forêt.",
  "La sagesse t'accompagne.",
  "Continue ainsi, gardien."
];

const MESSAGES_INCORRECT = [
  "Le sanctuaire attendait mieux de toi...",
  "La forêt garde ses secrets pour les attentifs.",
  "Chaque erreur est une leçon, voyageur.",
  "Le Coracia espère que tu retiendras ceci."
];

function initQuiz() {
  const url = new URLSearchParams(window.location.search);
  const fromUrl = parseInt(url.get('capsule'));
  const fromStorage = parseInt(localStorage.getItem('coracia_quiz_capsule'));
  quizCapsuleId = fromUrl || fromStorage || 1;

  const entry = window.QUIZ.find(q => q.capsule_id === quizCapsuleId);

  if (!entry || !entry.questions || !entry.questions.length) {
    document.getElementById('quiz-root').innerHTML = `
      <div style="min-height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:32px 20px;">
        <p style="font-size:18px; margin-bottom:24px; color:var(--color-text);">Quiz indisponible pour cette capsule.</p>
        <button class="btn-primary" onclick="navigateTo('capsule.html?id=${quizCapsuleId}')">← Retour à la capsule</button>
      </div>
    `;
    return;
  }

  quizQuestions = entry.questions;
  quizIndex = 0;
  quizScore = 0;
  usedColors = [];
  renderQuestion();
}

function renderQuestion() {
  quizAnswered = false;

  if (quizIndex >= quizQuestions.length) {
    renderResult();
    return;
  }

  const capsule = window.CAPSULES ? window.CAPSULES.find(c => c.id === quizCapsuleId) : null;
  const themeColor = capsule ? capsule.theme_color : '#50B1FE';
  const themeName  = capsule ? capsule.theme : '';
  const q = quizQuestions[quizIndex];
  const isLast = quizIndex + 1 === quizQuestions.length;

  const progressSegs = quizQuestions.map((_, i) => {
    if (i < quizIndex)  return '<div class="quiz-progress-seg done"></div>';
    if (i === quizIndex) return '<div class="quiz-progress-seg active"></div>';
    return '<div class="quiz-progress-seg"></div>';
  }).join('');

  const root = document.getElementById('quiz-root');
  root.innerHTML = `
    <div style="position:sticky; top:0; background:var(--color-bg); z-index:10; padding:calc(12px + var(--safe-top)) 0 10px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <button class="btn-icon-round" id="quiz-back" aria-label="Retour">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style="flex:1; text-align:center; font-size:15px; font-style:italic; color:var(--color-text-muted);">
          Questions · Étape ${quizCapsuleId}
        </div>
        <span class="badge" style="color:${themeColor}; border-color:${themeColor}40; font-size:11px; white-space:nowrap; flex-shrink:0;">${themeName}</span>
      </div>
      <div class="quiz-progress" style="margin:10px 0 0;">${progressSegs}</div>
    </div>

    <div class="anim-fade-in" id="quiz-content" style="padding-top:16px; padding-bottom:40px;">
      <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(80,177,254,0.2); border-radius:16px; padding:20px; margin-bottom:16px;">
        <div class="muted" style="font-size:12px; margin-bottom:10px; letter-spacing:0.05em;">Question ${quizIndex + 1} / ${quizQuestions.length}</div>
        <h2 style="font-size:clamp(17px,5vw,20px); font-weight:700; color:var(--color-text); line-height:1.35; margin-bottom:${q.citation_indice ? '10px' : '0'};">${q.question}</h2>
        ${q.citation_indice ? `<div style="font-size:13px; font-style:italic; color:#50B1FE; line-height:1.4;">« ${q.citation_indice} »</div>` : ''}
      </div>

      <div id="quiz-answers">
        ${q.reponses.map((r, i) => `
          <button class="quiz-answer" data-index="${i}" onclick="selectAnswer(${i})"
            style="width:100%; display:flex; align-items:flex-start; gap:12px;
                   background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15);
                   border-radius:12px; padding:14px 16px; margin-bottom:10px;
                   text-align:left; cursor:pointer;
                   transition:background 200ms, border-color 200ms;">
            <div style="font-weight:700; color:#50B1FE; flex-shrink:0; min-width:20px;">${r.lettre}</div>
            <div style="color:var(--color-text); line-height:1.4;">${r.texte}</div>
          </button>
        `).join('')}
      </div>

      <div id="quiz-explanation"></div>
      <div style="margin-top:16px;">
        <button class="btn-primary" id="quiz-continue" style="display:none;" onclick="nextQuestion()">
          ${isLast ? 'Voir mon résultat' : 'Question suivante'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('quiz-back').onclick = () => navigateTo(`capsule.html?id=${quizCapsuleId}`);
}

function selectAnswer(index) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQuestions[quizIndex];
  const answers = document.querySelectorAll('.quiz-answer');
  const selected = q.reponses[index];

  answers.forEach((el, i) => {
    el.disabled = true;
    el.style.cursor = 'default';
    if (q.reponses[i].correct) {
      el.style.background   = 'rgba(145,255,5,0.15)';
      el.style.borderColor  = '#91FF05';
    }
    if (i === index && !selected.correct) {
      el.style.background   = 'rgba(224,92,58,0.15)';
      el.style.borderColor  = '#E05C3A';
    }
  });

  const msgs = selected.correct ? MESSAGES_CORRECT : MESSAGES_INCORRECT;
  document.getElementById('quiz-explanation').innerHTML = `
    <div style="text-align:center; font-size:14px; font-style:italic;
                color:var(--color-text-muted); padding:12px 0;
                animation:fadeIn 300ms var(--ease-out) forwards;">
      ${msgs[Math.floor(Math.random() * msgs.length)]}
    </div>
  `;

  if (selected.correct) {
    quizScore++;
  }

  setTimeout(() => {
    const cta = document.getElementById('quiz-continue');
    if (cta) {
      cta.style.display = 'inline-flex';
      cta.style.animation = 'fadeIn 400ms var(--ease-out) forwards';
    }
  }, 1200);
}

function nextQuestion() {
  const content = document.getElementById('quiz-content');
  if (content) content.style.animation = 'slide-out-left 300ms var(--ease-out) forwards';
  setTimeout(() => {
    quizIndex++;
    renderQuestion();
    const newContent = document.getElementById('quiz-content');
    if (newContent) newContent.style.animation = 'slide-in-right 350ms var(--ease-out) forwards';
  }, 300);
}

function renderResult() {
  const capsule = window.CAPSULES ? window.CAPSULES.find(c => c.id === quizCapsuleId) : null;
  const themeColor = capsule ? capsule.theme_color : '#50B1FE';

  // Déverrouillage progressif — marquer quiz terminé quelle que soit la note
  window.STATE.markCapsuleCompletedQuiz(quizCapsuleId);

  // Maintenir l'ancien système couleurs (affiché dans apres-visite.html)
  const themeKey = window.STATE.getThemeKeyByCapsule(quizCapsuleId);
  if (themeKey && quizScore >= 2) {
    window.STATE.markCapsuleCompleted(quizCapsuleId);
    window.STATE.unlockCouleur(themeKey);
  }

  window.STATE.update({ quiz_score: { correct: quizScore, total: quizQuestions.length } });

  const { message } = window.STATE.handleQuizResult(quizCapsuleId, quizScore);
  const couleursMaj = parseInt(localStorage.getItem('coracia_couleurs') || '0');
  const logoPath = window.STATE.getCoraciaLogo(couleursMaj);

  const isLast  = quizCapsuleId === 6;
  const ctaLabel  = isLast ? 'Voir mon bilan' : 'Étape suivante';
  const ctaTarget = isLast ? 'apres-visite.html' : `capsule.html?id=${quizCapsuleId + 1}`;

  document.getElementById('quiz-root').innerHTML = `
    <div style="min-height:90vh; display:flex; flex-direction:column; align-items:center;
                justify-content:center; padding:40px 20px; text-align:center;">

      <img src="${logoPath}" alt="" class="anim-levitate"
        onerror="this.onerror=null; this.src='assets/icons/logo-sillans.svg';"
        style="width:80px; height:80px; display:block; margin-bottom:24px;
               opacity:0; animation:fadeIn 500ms var(--ease-out) 200ms forwards;" />

      <div style="font-family:var(--font-display); font-weight:700; font-size:72px;
                  color:${themeColor}; line-height:1; margin-bottom:8px;
                  opacity:0; animation:slideUp 600ms var(--ease-out) 400ms forwards;">
        ${quizScore}<span style="font-size:36px; opacity:0.6;"> / ${quizQuestions.length}</span>
      </div>

      <p style="font-size:clamp(14px,4vw,17px); font-style:italic; line-height:1.6;
                color:var(--color-text); max-width:280px; margin-bottom:36px;
                white-space:pre-line;
                opacity:0; animation:fadeIn 500ms var(--ease-out) 700ms forwards;">
        ${message}
      </p>

      <button class="btn-primary"
        style="opacity:0; animation:fadeIn 500ms var(--ease-out) 1000ms forwards;"
        onclick="navigateTo('${ctaTarget}')">
        ${ctaLabel} <span aria-hidden="true">→</span>
      </button>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.initQuiz = initQuiz;
  window.selectAnswer = selectAnswer;
  window.nextQuestion = nextQuestion;
}
