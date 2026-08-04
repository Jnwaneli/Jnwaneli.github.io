const appearanceFix = document.createElement('style');
appearanceFix.textContent = `
  html,
  body,
  body * {
    caret-color: transparent !important;
  }

  body,
  .site-shell,
  .intro-screen,
  main,
  section,
  article,
  div,
  h1,
  h2,
  h3,
  p,
  span,
  strong,
  small,
  li {
    -webkit-user-select: none !important;
    user-select: none !important;
  }

  .profile-card img {
    filter: none !important;
    -webkit-filter: none !important;
  }

  .circuit-background {
    z-index: 0 !important;
    opacity: 0.82;
    background:
      radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.035), transparent 32rem),
      #020202;
  }

  .circuit-background svg {
    width: 100%;
    height: 100%;
  }

  .pcb-grid {
    opacity: 0.2;
  }

  .pcb-trace {
    fill: none;
    stroke: rgba(255, 255, 255, 0.25);
    stroke-width: 1.45;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .pcb-trace.major {
    stroke: rgba(255, 255, 255, 0.38);
    stroke-width: 2.6;
  }

  .pcb-pulse {
    fill: none;
    stroke: rgba(255, 255, 255, 0.95);
    stroke-width: 2.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 4 96;
    stroke-dashoffset: 100;
    vector-effect: non-scaling-stroke;
    animation: pcb-energy var(--pulse-speed, 7s) linear infinite;
    animation-delay: var(--pulse-delay, 0s);
  }

  .pcb-via {
    fill: #050505;
    stroke: rgba(255, 255, 255, 0.5);
    stroke-width: 1.6;
    vector-effect: non-scaling-stroke;
  }

  .pcb-via.hot {
    fill: rgba(255, 255, 255, 0.88);
    stroke: #ffffff;
  }

  .pcb-chip {
    fill: rgba(5, 5, 5, 0.97);
    stroke: rgba(255, 255, 255, 0.6);
    stroke-width: 1.8;
    vector-effect: non-scaling-stroke;
  }

  .pcb-chip-core {
    fill: rgba(255, 255, 255, 0.035);
    stroke: rgba(255, 255, 255, 0.22);
    stroke-width: 1.1;
  }

  .pcb-pad {
    fill: rgba(255, 255, 255, 0.68);
  }

  @keyframes pcb-energy {
    from { stroke-dashoffset: 104; }
    to { stroke-dashoffset: -104; }
  }

  .site-shell {
    position: relative;
    z-index: 1 !important;
    background: linear-gradient(180deg, rgba(5, 5, 5, 0.62), rgba(5, 5, 5, 0.79));
  }

  .intro-screen {
    z-index: 1500 !important;
    background: rgba(0, 0, 0, 0.82) !important;
  }

  .intro-frame {
    background: rgba(8, 8, 8, 0.78) !important;
  }

  .intro-line {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }

  .intro-line-two {
    display: block !important;
    width: 100% !important;
    max-width: none !important;
    overflow: visible !important;
    white-space: nowrap !important;
    letter-spacing: -0.065em !important;
    line-height: 1 !important;
  }

  .intro-char {
    display: inline-block !important;
    opacity: 0;
    transform: translateY(34px) scale(0.94);
    transform-origin: 50% 100%;
    animation: intro-letter-build 0.58s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes intro-letter-build {
    from {
      opacity: 0;
      transform: translateY(34px) scale(0.94);
      filter: blur(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  .project-card[data-repository] {
    cursor: pointer;
  }

  .project-card[data-repository] * {
    cursor: pointer;
  }

  .project-card[data-repository]:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 4px;
  }

  .project-card[data-repository] .project-media {
    position: relative;
  }

  .project-card[data-repository] .project-media::after {
    position: absolute;
    right: 0.9rem;
    bottom: 0.9rem;
    padding: 0.42rem 0.6rem;
    border: 1px solid rgba(255, 255, 255, 0.72);
    background: rgba(0, 0, 0, 0.82);
    color: #ffffff;
    content: 'Open repository ↗';
    font: 500 0.68rem/1.2 "JetBrains Mono", monospace;
    letter-spacing: 0.04em;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
  }

  .project-card[data-repository]:hover .project-media::after,
  .project-card[data-repository]:focus-visible .project-media::after {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .intro-char,
    .pcb-pulse {
      opacity: 1;
      transform: none;
      filter: none;
      animation: none;
    }
  }
`;
document.head.appendChild(appearanceFix);

const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const introScreen = document.querySelector('#intro-screen');
const enterButton = document.querySelector('#enter-site');
const body = document.body;
const introStorageKey = 'jn-portfolio-entered';

function createPcbBackground() {
  const background = document.querySelector('.circuit-background');
  if (!background) return;

  const traces = [
    'M-40 92H180V128H330V82H560V214H680',
    'M-40 150H120V202H280V158H475V264H680',
    'M-40 218H205V266H395V340H680',
    'M-40 288H155V338H320V400H540V420H680',
    'M-40 360H105V414H260V482H470V490H680',
    'M-40 438H205V486H420V540H680',
    'M-40 516H150V570H320V620H520V610H680',
    'M-40 594H115V650H280V694H680',
    'M-40 672H185V730H355V760H680',
    'M-40 750H150V812H330V852H680',
    'M-40 828H205V890H420V920H680',
    'M1640 92H1420V128H1270V82H1040V214H920',
    'M1640 150H1480V202H1320V158H1125V264H920',
    'M1640 218H1395V266H1205V340H920',
    'M1640 288H1445V338H1280V400H1060V420H920',
    'M1640 360H1495V414H1340V482H1130V490H920',
    'M1640 438H1395V486H1180V540H920',
    'M1640 516H1450V570H1280V620H1080V610H920',
    'M1640 594H1485V650H1320V694H920',
    'M1640 672H1415V730H1245V760H920',
    'M1640 750H1450V812H1270V852H920',
    'M1640 828H1395V890H1180V920H920',
    'M250 -40V95H310V235H455V340H610V430H680',
    'M430 -40V130H500V280H620V390H680',
    'M1350 -40V95H1290V235H1145V340H990V430H920',
    'M1170 -40V130H1100V280H980V390H920',
    'M250 1040V905H320V770H465V665H610V570H680',
    'M450 1040V920H520V790H630V650H680',
    'M1350 1040V905H1280V770H1135V665H990V570H920',
    'M1150 1040V920H1080V790H970V650H920'
  ];

  const majorIndexes = new Set([0, 3, 5, 8, 11, 14, 16, 19, 22, 24, 26, 28]);
  const pulseIndexes = new Set([0, 3, 6, 11, 14, 17, 22, 24, 26, 28]);

  const traceMarkup = traces.map((path, index) => (
    `<path class="pcb-trace${majorIndexes.has(index) ? ' major' : ''}" d="${path}" />`
  )).join('');

  const pulseMarkup = traces.map((path, index) => {
    if (!pulseIndexes.has(index)) return '';
    const speed = (6.2 + (index % 4) * 0.7).toFixed(2);
    const delay = (-0.6 * (index % 6)).toFixed(2);
    return `<path class="pcb-pulse" pathLength="100" d="${path}" style="--pulse-speed:${speed}s;--pulse-delay:${delay}s" />`;
  }).join('');

  const vias = [
    [180,128],[330,82],[560,214],[120,202],[280,158],[475,264],[205,266],[395,340],
    [155,338],[320,400],[540,420],[105,414],[260,482],[470,490],[205,486],[420,540],
    [150,570],[320,620],[520,610],[185,730],[355,760],[205,890],[420,920],
    [1420,128],[1270,82],[1040,214],[1480,202],[1320,158],[1125,264],[1395,266],[1205,340],
    [1445,338],[1280,400],[1060,420],[1495,414],[1340,482],[1130,490],[1395,486],[1180,540],
    [1450,570],[1280,620],[1080,610],[1415,730],[1245,760],[1395,890],[1180,920],
    [310,95],[455,235],[610,340],[1290,95],[1145,235],[990,340],[320,905],[465,770],
    [610,665],[1280,905],[1135,770],[990,665]
  ];

  const viaMarkup = vias.map(([x, y], index) => {
    const hot = index % 8 === 0;
    return `<circle class="pcb-via${hot ? ' hot' : ''}" cx="${x}" cy="${y}" r="${hot ? 5.2 : 3.8}" />`;
  }).join('');

  const leftPads = Array.from({ length: 7 }, (_, index) => {
    const y = 434 + index * 22;
    return `<rect class="pcb-pad" x="660" y="${y}" width="20" height="8" rx="2" />`;
  }).join('');
  const rightPads = Array.from({ length: 7 }, (_, index) => {
    const y = 434 + index * 22;
    return `<rect class="pcb-pad" x="920" y="${y}" width="20" height="8" rx="2" />`;
  }).join('');
  const topPads = Array.from({ length: 7 }, (_, index) => {
    const x = 716 + index * 24;
    return `<rect class="pcb-pad" x="${x}" y="400" width="8" height="20" rx="2" />`;
  }).join('');
  const bottomPads = Array.from({ length: 7 }, (_, index) => {
    const x = 716 + index * 24;
    return `<rect class="pcb-pad" x="${x}" y="580" width="8" height="20" rx="2" />`;
  }).join('');

  background.innerHTML = `
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <pattern id="pcb-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="1" />
        </pattern>
      </defs>
      <rect class="pcb-grid" width="1600" height="1000" fill="url(#pcb-grid)" />
      <g aria-hidden="true">${traceMarkup}</g>
      <g aria-hidden="true">${pulseMarkup}</g>
      <g aria-hidden="true">${viaMarkup}</g>
      <g aria-hidden="true">
        <rect class="pcb-chip" x="680" y="400" width="240" height="200" rx="8" />
        <rect class="pcb-chip-core" x="726" y="444" width="148" height="112" rx="4" />
        ${leftPads}${rightPads}${topPads}${bottomPads}
      </g>
    </svg>
  `;
}

function buildLetterIntro() {
  const lines = document.querySelectorAll('.intro-line');
  let characterIndex = 0;

  lines.forEach((line, lineIndex) => {
    const text = line.textContent.trim();
    line.textContent = '';
    line.setAttribute('aria-label', text);

    Array.from(text).forEach((character) => {
      const span = document.createElement('span');
      span.className = 'intro-char';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = character === ' ' ? '\u00a0' : character;
      span.style.animationDelay = `${260 + characterIndex * 48 + lineIndex * 140}ms`;
      line.appendChild(span);
      characterIndex += 1;
    });
  });
}

function fitIntroName() {
  const nameLine = document.querySelector('.intro-line-two');
  const frame = document.querySelector('.intro-frame');
  if (!nameLine || !frame) return;

  const frameStyle = window.getComputedStyle(frame);
  const availableWidth = frame.clientWidth
    - Number.parseFloat(frameStyle.paddingLeft)
    - Number.parseFloat(frameStyle.paddingRight);

  let fontSize = Math.min(78, Math.max(34, window.innerWidth * 0.082));
  nameLine.style.fontSize = `${fontSize}px`;

  while (nameLine.scrollWidth > availableWidth && fontSize > 28) {
    fontSize -= 1;
    nameLine.style.fontSize = `${fontSize}px`;
  }
}

function makeProjectCardsClickable() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const repositoryLink = card.querySelector('.repo-link');
    if (!repositoryLink) return;

    const url = repositoryLink.href;
    const projectTitle = card.querySelector('h3')?.textContent?.trim() || 'project';

    card.dataset.repository = url;
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `Open ${projectTitle} repository in a new tab`);

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

function closeMenu() {
  if (!menuButton || !siteNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('open');
}

function enterPortfolio({ instant = false } = {}) {
  if (!introScreen) return;

  body.classList.add('site-entered');
  body.classList.remove('intro-open');

  try {
    sessionStorage.setItem(introStorageKey, 'true');
  } catch (error) {
    // The transition still works when browser storage is unavailable.
  }

  if (instant) {
    introScreen.classList.add('is-hidden');
    return;
  }

  introScreen.classList.add('is-leaving');
  window.setTimeout(() => introScreen.classList.add('is-hidden'), 900);
}

createPcbBackground();
buildLetterIntro();
fitIntroName();
makeProjectCardsClickable();

window.requestAnimationFrame(fitIntroName);
document.fonts?.ready?.then(fitIntroName);

let introAlreadySeen = false;
try {
  introAlreadySeen = sessionStorage.getItem(introStorageKey) === 'true';
} catch (error) {
  introAlreadySeen = false;
}

if (introAlreadySeen) enterPortfolio({ instant: true });

enterButton?.addEventListener('click', () => enterPortfolio());

menuButton?.addEventListener('click', () => {
  if (!siteNav) return;
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

function clearPageCaret(event) {
  if (event?.target?.closest?.('input, textarea, [contenteditable="true"]')) return;

  const selection = window.getSelection();
  if (selection && selection.rangeCount) selection.removeAllRanges();

  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement && !activeElement.matches('a, button, input, textarea, [contenteditable="true"]')) {
    activeElement.blur();
  }
}

['pointerdown', 'mousedown', 'mouseup', 'click', 'dblclick', 'selectstart'].forEach((eventName) => {
  document.addEventListener(eventName, (event) => {
    if (eventName === 'selectstart' && !event.target.closest('input, textarea, [contenteditable="true"]')) {
      event.preventDefault();
    }
    clearPageCaret(event);
    window.requestAnimationFrame(() => clearPageCaret(event));
  }, true);
});

document.addEventListener('selectionchange', () => {
  const activeElement = document.activeElement;
  if (activeElement?.matches?.('input, textarea, [contenteditable="true"]')) return;
  const selection = window.getSelection();
  if (selection && selection.rangeCount) selection.removeAllRanges();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  fitIntroName();
  if (window.innerWidth > 880) closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
