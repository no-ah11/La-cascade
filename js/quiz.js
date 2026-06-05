let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let usedColors = [];

function initQuiz() {
  quizIndex = 0;
  quizScore = 0;
  usedColors = [];
  renderQuestion();
}

function renderQuestion() {
  quizAnswered = false;
  if (quizIndex >= window.QUIZ.length) {
    renderResult();
    return;
  }

  const q = window.QUIZ[quizIndex];
  const root = document.getElementById('quiz-root');

  const progressSegs = window.QUIZ.map((_, i) => {
    if (i < quizIndex) return '<div class="quiz-progress-seg done"></div>';
    if (i === quizIndex) return '<div class="quiz-progress-seg active"></div>';
    return '<div class="quiz-progress-seg"></div>';
  }).join('');

  root.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; padding: 20px 0 8px;">
      <button class="btn-icon-round" id="quiz-back" aria-label="Retour">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style="flex:1; text-align:center;" class="italic">Question ${quizIndex + 1} / ${window.QUIZ.length}</div>
      <div style="width:44px;"></div>
    </div>

    <div class="quiz-progress">${progressSegs}</div>

    <div class="anim-fade-in" id="quiz-content">
      <div class="card-citation" style="margin-bottom:24px;">
        <div class="citation-icon">${getRollierSVG('#4DB8FF')}</div>
        <div class="citation-text">« ${q.citation_indice} »</div>
      </div>

      <h2 style="font-size:28px; margin-bottom:24px; line-height:1.25;">${q.question}</h2>

      <div id="quiz-answers">
        ${q.reponses.map((r, i) => `
          <button class="quiz-answer" data-index="${i}" onclick="selectAnswer(${i})">
            <div class="quiz-answer-letter">${r.lettre}</div>
            <div class="quiz-answer-text">${r.texte}</div>
            <div class="quiz-answer-result">Bien vu !</div>
          </button>
        `).join('')}
      </div>

      <div id="quiz-explanation"></div>
    </div>

    <div style="position:fixed; bottom:0; left:0; right:0; padding:16px 20px; background: linear-gradient(to top, var(--color-bg) 60%, transparent); z-index:50;">
      <div style="max-width:480px; margin:0 auto;">
        <button class="btn-primary" id="quiz-continue" style="display:none;" onclick="nextQuestion()">
          Continuer <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  `;

  const backBtn = document.getElementById('quiz-back');
  if (backBtn) {
    backBtn.onclick = () => {
      if (quizIndex > 0) {
        quizIndex--;
        renderQuestion();
      } else {
        navigateTo('apres-visite.html');
      }
    };
  }
}

function selectAnswer(index) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = window.QUIZ[quizIndex];
  const answers = document.querySelectorAll('.quiz-answer');
  const selected = q.reponses[index];

  answers.forEach((el, i) => {
    el.disabled = true;
    if (i === index) {
      el.classList.add(selected.correct ? 'correct' : 'incorrect');
    }
    if (q.reponses[i].correct && i !== index) {
      el.classList.add('correct');
    }
  });

  const explanation = document.getElementById('quiz-explanation');
  explanation.innerHTML = `<div class="quiz-explanation anim-fade-in">${q.explication}</div>`;

  if (selected.correct) {
    quizScore++;
    const available = window.ROLLIER_COLORS.filter(c => !usedColors.includes(c));
    const color = available.length ? available[Math.floor(Math.random() * available.length)] : window.ROLLIER_COLORS[Math.floor(Math.random() * window.ROLLIER_COLORS.length)];
    usedColors.push(color);
    const msg = window.ROLLIER_FELICITATIONS[quizIndex % window.ROLLIER_FELICITATIONS.length];
    spawnRollier(msg, color);
  }

  const cta = document.getElementById('quiz-continue');
  setTimeout(() => {
    cta.style.display = 'inline-flex';
    cta.style.animation = 'slideUp 400ms var(--ease-out) forwards';
  }, 600);
}

function nextQuestion() {
  const content = document.getElementById('quiz-content');
  if (content) {
    content.style.animation = 'slide-out-left 300ms var(--ease-out) forwards';
  }
  setTimeout(() => {
    quizIndex++;
    renderQuestion();
    const newContent = document.getElementById('quiz-content');
    if (newContent) newContent.style.animation = 'slide-in-right 350ms var(--ease-out) forwards';
  }, 300);
}

function renderResult() {
  const total = window.QUIZ.length;
  const score = quizScore;

  let message, emoji;
  if (score === total) { message = "Parfait, voyageur ! Le sanctuaire n'a plus de secrets pour toi."; emoji = "✦"; }
  else if (score >= 3) { message = "Belle exploration ! Continue à observer le sanctuaire."; emoji = "★"; }
  else { message = "La forêt garde encore ses mystères... Reviens la visiter."; emoji = "✧"; }

  const capsuleId = parseInt(localStorage.getItem('coracia_quiz_capsule')) || 1;
  const themeKey = window.STATE.getThemeKeyByCapsule(capsuleId);
  if (themeKey && score >= 3) {
    window.STATE.markCapsuleCompleted(capsuleId);
    window.STATE.unlockCouleur(themeKey);
  }

  const colorMap = { blue: '#4DB8FF', green: '#A8E63D', orange: '#F5A623', red: '#E05C3A' };
  const burstColor = colorMap[themeKey] || '#4DB8FF';

  window.STATE.update({ quiz_score: { correct: score, total: total } });

  const root = document.getElementById('quiz-root');
  root.innerHTML = `
    <div style="min-height: 90vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 40px 20px; text-align:center; position:relative;">
      <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:200px; height:200px; border-radius:50%; background: ${burstColor}; opacity:0; animation: color-burst 1.2s var(--ease-out) forwards;"></div>

      <div style="font-size:48px; margin-bottom:16px; opacity:0; animation: fadeIn 500ms var(--ease-out) 400ms forwards; position:relative; z-index:2;">${emoji}</div>

      <div style="font-family: var(--font-display); font-weight:700; font-size:64px; color: ${burstColor}; opacity:0; animation: slideUp 600ms var(--ease-out) 600ms forwards; position:relative; z-index:2;">${score}/${total}</div>

      <h2 style="margin-top:20px; font-size:24px; opacity:0; animation: fadeIn 500ms var(--ease-out) 900ms forwards; position:relative; z-index:2;">${message}</h2>

      ${themeKey && score >= 3 ? `
        <div style="margin-top:32px; padding:20px; background: var(--color-surface); border-radius: var(--radius-lg); border:1px solid ${burstColor}40; opacity:0; animation: slideUp 600ms var(--ease-out) 1200ms forwards; position:relative; z-index:2;">
          <div class="tracked" style="margin-bottom:8px;">Couleur restaurée</div>
          <div style="font-family: var(--font-display); font-size:22px; color: ${burstColor};">${window.COULEUR_LABELS[themeKey].nom}</div>
          <div class="muted" style="font-size:13px; margin-top:6px;">${window.COULEUR_LABELS[themeKey].desc}</div>
        </div>
      ` : ''}

      <button class="btn-primary" style="margin-top:36px; opacity:0; animation: fadeIn 500ms var(--ease-out) 1400ms forwards; position:relative; z-index:2;" onclick="navigateTo('apres-visite.html')">
        Voir ma progression <span aria-hidden="true">→</span>
      </button>
      <button class="btn-ghost" style="margin-top:12px; opacity:0; animation: fadeIn 500ms var(--ease-out) 1500ms forwards; position:relative; z-index:2;" onclick="navigateTo('carte.html')">
        Retour à la carte
      </button>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.initQuiz = initQuiz;
  window.selectAnswer = selectAnswer;
  window.nextQuestion = nextQuestion;
}
