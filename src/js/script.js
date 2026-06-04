/* ═══════════════════════════════════════════════
   SatControl — main.js
   Sistema de Controle de Satélite
   ═══════════════════════════════════════════════ */
 
// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollFade();
  initNavActive();
  initThemeSwitcher();
  initSlideshow();
  initForm();
  initFooterYear();
});
 
/* ── Scroll Fade-in ── */
function initScrollFade() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
 
/* ── Active nav link on scroll ── */
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
 
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });
 
  sections.forEach(s => obs.observe(s));
}
 
/* ── Theme Switcher (3 cores) ── */
function initThemeSwitcher() {
  const btns = document.querySelectorAll('.theme-btn');
  const body = document.body;
 
  // Restore saved theme
  const saved = localStorage.getItem('orbital-theme') || 'space';
  applyTheme(saved);
 
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem('orbital-theme', theme);
    });
  });
 
  function applyTheme(theme) {
    body.classList.remove('theme-nebula', 'theme-solar');
    if (theme === 'nebula') body.classList.add('theme-nebula');
    if (theme === 'solar')  body.classList.add('theme-solar');
 
    btns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  }
}
 
/* ── Slideshow (3 slides) ── */
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slide-dot');
  let current  = 0;
  let timer;
 
  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
 
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
 
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }
 
  // Init
  goTo(0);
  startAuto();
 
  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });
 
  // Arrows
  const btnNext = document.getElementById('slide-next');
  const btnPrev = document.getElementById('slide-prev');
  if (btnNext) btnNext.addEventListener('click', () => { next(); startAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { prev(); startAuto(); });
}
 
/* ── Form Validation ── */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
 
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
 
    const fields = form.querySelectorAll('[data-required]');
    fields.forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('invalid');
        valid = false;
      } else {
        group.classList.remove('invalid');
      }
    });
 
    // Email validation
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const group = emailField.closest('.form-group');
      if (!emailRegex.test(emailField.value.trim())) {
        group.classList.add('invalid');
        group.querySelector('.error-msg').textContent = 'E-mail inválido.';
        valid = false;
      }
    }
 
    if (valid) {
      const success = document.getElementById('formSuccess');
      const btn = form.querySelector('.btn-send');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.style.display = 'none';
        if (success) success.style.display = 'block';
      }, 1200);
    }
  });
 
  // Remove invalid on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('invalid');
    });
  });
}
 
/* ── Footer Year ── */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}
/* ═══════════════════════════════════════════════
   SatControl — quiz.js
   Quiz: Sistema de Controle de Satélite (10 perguntas)
   ═══════════════════════════════════════════════ */
 
const QUESTIONS = [
  {
    q: "Qual é a principal função de um sistema de controle de satélite?",
    opts: [
      "Monitorar o clima terrestre",
      "Gerenciar trajetória, orientação e comunicação do satélite",
      "Transmitir TV a cabo",
      "Processar dados bancários"
    ],
    answer: 1
  },
  {
    q: "O que significa a sigla TT&C em sistemas espaciais?",
    opts: [
      "Tracking, Telemetry & Communication",
      "Transfer, Timing & Control",
      "Telemetry, Tracking & Command",
      "Technology, Testing & Calibration"
    ],
    answer: 2
  },
  {
    q: "Qual subsistema é responsável por manter a orientação correta do satélite?",
    opts: [
      "ADCS — Attitude Determination and Control System",
      "EPS — Electrical Power System",
      "OBC — On-Board Computer",
      "RF — Radio Frequency"
    ],
    answer: 0
  },
  {
    q: "O que é uma 'janela de passagem' no contexto de satélites?",
    opts: [
      "Um módulo de energia solar",
      "O intervalo em que o satélite está visível pela estação terrestre",
      "Um protocolo de comunicação criptografado",
      "A abertura física da antena de transmissão"
    ],
    answer: 1
  },
  {
    q: "Qual protocolo é amplamente usado na camada de enlace de satélites?",
    opts: [
      "HTTP/2",
      "Modbus TCP",
      "CCSDS (Consultative Committee for Space Data Systems)",
      "Zigbee"
    ],
    answer: 2
  },
  {
    q: "O que é telemetria no contexto espacial?",
    opts: [
      "Sistema de propulsão iônica",
      "Transmissão automática de dados de status do satélite à estação",
      "Processo de lançamento do foguete",
      "Cálculo da órbita geoestacionária"
    ],
    answer: 1
  },
  {
    q: "Em qual altitude está a órbita GEO (Geoestacionária)?",
    opts: [
      "Aproximadamente 400 km",
      "Aproximadamente 2.000 km",
      "Aproximadamente 20.200 km",
      "Aproximadamente 35.786 km"
    ],
    answer: 3
  },
  {
    q: "Qual é a principal vantagem de uma órbita LEO (Low Earth Orbit)?",
    opts: [
      "Cobertura permanente de um ponto na Terra",
      "Menor latência e custo de comunicação",
      "Ausência total de interferência atmosférica",
      "Período orbital de 24 horas"
    ],
    answer: 1
  },
  {
    q: "Qual tecnologia é fundamental para o posicionamento preciso de satélites?",
    opts: [
      "Bluetooth 5.0",
      "GNSS (Global Navigation Satellite System)",
      "NFC",
      "Wi-Fi 6E"
    ],
    answer: 1
  },
  {
    q: "O que é o 'delta-v' na mecânica orbital?",
    opts: [
      "A diferença de voltagem entre painéis solares",
      "Um codec de vídeo para transmissão espacial",
      "A variação de velocidade necessária para mudar a órbita",
      "A frequência de atualização do sistema de controle"
    ],
    answer: 2
  }
];
 
let currentQ  = 0;
let score     = 0;
let answered  = false;
 
document.addEventListener('DOMContentLoaded', initQuiz);
 
function initQuiz() {
  const wrap = document.getElementById('quiz-container');
  if (!wrap) return;
 
  renderQuestion();
 
  const nextBtn = document.getElementById('quiz-next');
  if (nextBtn) nextBtn.addEventListener('click', handleNext);
 
  const restartBtn = document.getElementById('quiz-restart');
  if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
}
 
function renderQuestion() {
  const data   = QUESTIONS[currentQ];
  const total  = QUESTIONS.length;
  const letters= ['A', 'B', 'C', 'D'];
 
  // Progress
  document.getElementById('quiz-fill').style.width = `${(currentQ / total) * 100}%`;
  document.getElementById('quiz-counter').textContent = `PERGUNTA ${currentQ + 1} / ${total}`;
  document.getElementById('quiz-question').textContent = data.q;
 
  // Options
  const optWrap = document.getElementById('quiz-options');
  optWrap.innerHTML = '';
  data.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.dataset.letter = letters[i];
    btn.dataset.index  = i;
    btn.textContent    = opt;
    btn.addEventListener('click', () => handleAnswer(btn, i));
    optWrap.appendChild(btn);
  });
 
  // Reset feedback
  const fb = document.getElementById('quiz-feedback');
  fb.className = 'quiz-feedback';
  fb.textContent = '';
 
  // Next button
  document.getElementById('quiz-next').style.display = 'none';
 
  answered = false;
}
 
function handleAnswer(btn, idx) {
  if (answered) return;
  answered = true;
 
  const data     = QUESTIONS[currentQ];
  const isRight  = idx === data.answer;
  const fb       = document.getElementById('quiz-feedback');
  const allBtns  = document.querySelectorAll('.quiz-option');
 
  if (isRight) {
    score++;
    btn.classList.add('correct');
    fb.textContent = '✓ Correto!';
    fb.className   = 'quiz-feedback show correct-fb';
  } else {
    btn.classList.add('wrong');
    allBtns[data.answer].classList.add('correct');
    fb.textContent = `✗ Incorreto. A resposta certa era: "${QUESTIONS[currentQ].opts[data.answer]}"`;
    fb.className   = 'quiz-feedback show wrong-fb';
  }
 
  allBtns.forEach(b => b.disabled = true);
  document.getElementById('quiz-next').style.display = 'inline-flex';
}
 
function handleNext() {
  currentQ++;
  if (currentQ < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}
 
function showResult() {
  const total   = QUESTIONS.length;
  const percent = Math.round((score / total) * 100);
 
  // Hide quiz content
  document.getElementById('quiz-content').style.display = 'none';
 
  // Show result
  const result = document.getElementById('quiz-result');
  result.classList.add('show');
 
  document.getElementById('quiz-score').textContent = `${score}/${total}`;
  document.getElementById('quiz-percent').textContent = `${percent}% de acerto`;
 
  let msg = '';
  if (percent === 100) msg = '🏆 Perfeito! Você domina sistemas de controle de satélites!';
  else if (percent >= 70) msg = '🚀 Ótimo desempenho! Você tem bom conhecimento na área.';
  else if (percent >= 40) msg = '🛰️ Bom começo! Vale revisar os conceitos de TT&C e órbitas.';
  else msg = '📡 Continue estudando! A engenharia espacial é fascinante.';
 
  document.getElementById('quiz-result-msg').textContent = msg;
 
  // Final progress bar = 100%
  document.getElementById('quiz-fill').style.width = '100%';
}
 
function restartQuiz() {
  currentQ = 0;
  score    = 0;
  answered = false;
 
  document.getElementById('quiz-content').style.display = 'block';
  const result = document.getElementById('quiz-result');
  result.classList.remove('show');
 
  renderQuestion();
}