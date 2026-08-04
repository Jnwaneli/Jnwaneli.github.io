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
    opacity: 0.96;
    mix-blend-mode: screen;
    background:
      radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.055), transparent 34rem),
      #020202;
  }

  .circuit-background svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.16));
  }

  .pcb-grid {
    opacity: 0.35;
  }

  .pcb-trace {
    fill: none;
    stroke: rgba(255, 255, 255, 0.26);
    stroke-width: 1.55;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .pcb-trace.major {
    stroke: rgba(255, 255, 255, 0.38);
    stroke-width: 3.4;
  }

  .pcb-trace.soft {
    stroke: rgba(255, 255, 255, 0.16);
  }

  .pcb-pulse {
    fill: none;
    stroke: rgba(255, 255, 255, 0.98);
    stroke-width: 3.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 5 95;
    stroke-dashoffset: 100;
    vector-effect: non-scaling-stroke;
    filter: url(#pcb-energy-glow);
    animation: pcb-energy var(--pulse-speed, 6.8s) linear infinite;
    animation-delay: var(--pulse-delay, 0s);
  }

  .pcb-via {
    fill: #050505;
    stroke: rgba(255, 255, 255, 0.54);
    stroke-width: 1.8;
    vector-effect: non-scaling-stroke;
  }

  .pcb-via.hot {
    fill: rgba(255, 255, 255, 0.9);
    stroke: #ffffff;
    filter: url(#pcb-node-glow);
    animation: pcb-node-pulse 3.4s ease-in-out infinite;
    animation-delay: var(--node-delay, 0s);
  }

  .pcb-chip {
    fill: rgba(5, 5, 5, 0.96);
    stroke: rgba(255, 255, 255, 0.62);
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
  }

  .pcb-chip-core {
    fill: rgba(255, 255, 255, 0.04);
    stroke: rgba(255, 255, 255, 0.24);
    stroke-width: 1.2;
  }

  .pcb-pad {
    fill: rgba(255, 255, 255, 0.72);
    filter: url(#pcb-node-glow);
  }

  @keyframes pcb-energy {
    from {
      stroke-dashoffset: 105;
    }
    to {
      stroke-dashoffset: -105;
    }
  }

  @keyframes pcb-node-pulse {
    0%, 100% {
      opacity: 0.35;
      transform: scale(0.82);
    }
    50% {
      opacity: 1;
      transform: scale(1.18);
    }
  }

  .site-shell {
    position: relative;
    z-index: 1 !important;
    background: linear-gradient(180deg, rgba(5, 5, 5, 0.54), rgba(5, 5, 5, 0.72));
  }

  .intro-screen {
    z-index: 1500 !important;
    background: rgba(0, 0, 0, 0.77) !important;
  }

  .intro-frame {
    background: rgba(8, 8, 8, 0.68) !important;
    backdrop-filter: blur(2px);
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
    0% {
      opacity: 0;
      transform: translateY(34px) scale(0.94);
      filter: blur(5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  .project-thumbnail-link {
    position: relative;
    display: block;
    cursor: pointer;
    outline: none;
  }

  .project-thumbnail-link::after {
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

  .project-thumbnail-link:hover::after,
  .project-thumbnail-link:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }

  .project-thumbnail-link:focus-visible {
    box-shadow: inset 0 0 0 2px #ffffff;
  }

  @media (prefers-reduced-motion: reduce) {
    .intro-char,
    .pcb-pulse,
    .pcb-via.hot {
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
    'M-40 78H170V118H330V72H560V205H680',
    'M-40 118H125V168H285V132H475V244H680',
    'M-40 164H210V214H390V286H680',
    'M-40 210H160V260H310V330H535V350H680',
    'M-40 258H110V310H260V382H470V390H680',
    'M-40 306H190V350H350V430H680',
    'M-40 354H130V410H295V474H530V470H680',
    'M-40 402H220V458H420V510H680',
    'M-40 452H155V510H315V558H520V550H680',
    'M-40 502H105V560H270V604H680',
    'M-40 552H180V620H350V650H680',
    'M-40 604H120V670H300V708H520V700H680',
    'M-40 656H215V720H390V760H680',
    'M-40 710H150V774H325V818H680',
    'M-40 766H105V832H260V878H520V850H680',
    'M-40 824H195V888H410V912H680',
    'M1640 72H1435V118H1270V74H1035V205H920',
    'M1640 116H1490V168H1325V132H1135V244H920',
    'M1640 164H1415V214H1230V286H920',
    'M1640 210H1460V260H1310V330H1080V350H920',
    'M1640 258H1510V310H1360V382H1150V390H920',
    'M1640 306H1425V350H1260V430H920',
    'M1640 354H1485V410H1320V474H1080V470H920',
    'M1640 402H1405V458H1200V510H920',
    'M1640 452H1465V510H1305V558H1100V550H920',
    'M1640 502H1515V560H1350V604H920',
    'M1640 552H1440V620H1265V650H920',
    'M1640 604H1490V670H1310V708H1095V700H920',
    'M1640 656H1410V720H1235V760H920',
    'M1640 710H1470V774H1290V818H920',
    'M1640 766H1515V832H1360V878H1100V850H920',
    'M1640 824H1420V888H1210V912H920',
    'M230 -40V88H286V230H430V332H600V430H680',
    'M330 -40V115H390V252H520V355H640V430H680',
    'M470 -40V145H530V272H620V380H680',
    'M610 -40V120H650V276H680',
    'M1370 -40V88H1314V230H1170V332H1000V430H920',
    'M1270 -40V115H1210V252H1080V355H960V430H920',
    'M1130 -40V145H1070V272H980V380H920',
    'M990 -40V120H950V276H920',
    'M230 1040V900H300V770H450V668H600V570H680',
    'M360 1040V930H420V792H540V685H640V570H680',
    'M500 1040V910H560V790H630V650H680',
    'M620 1040V900H660V725H680',
    'M1370 1040V900H1300V770H1150V668H1000V570H920',
    'M1240 1040V930H1180V792H1060V685H960V570H920',
    'M1100 1040V910H1040V790H970V650H920',
    'M980 1040V900H940V725H920'
  ];

  const majorIndexes = new Set([0, 3, 7, 12, 16, 19, 23, 28, 32, 36, 40, 44]);
  const pulseIndexes = new Set([0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 31, 33, 36, 38, 40, 43, 45]);

  const traceMarkup = traces.map((path, index) => {
    const className = majorIndexes.has(index)
      ? 'pcb-trace major'
      : index % 4 === 0
        ? 'pcb-trace soft'
        : 'pcb-trace';
    return `<path class="${className}" d="${path}" />`;
  }).join('');

  const pulseMarkup = traces.map((path, index) => {
    if (!pulseIndexes.has(index)) return '';
    const speed = (5.2 + (index % 6) * 0.62).toFixed(2);
    const delay = (-0.45 * (index % 8)).toFixed(2);
    return `<path class="pcb-pulse" pathLength="100" d="${path}" style="--pulse-speed:${speed}s;--pulse-delay:${delay}s" />`;
  }).join('');

  const vias = [
    [170,118],[330,72],[560,205],[125,168],[285,132],[475,244],[210,214],[390,286],
    [160,260],[310,330],[535,350],[110,310],[260,382],[470,390],[190,350],[350,430],
    [130,410],[295,474],[530,470],[220,458],[420,510],[155,510],[315,558],[520,550],
    [180,620],[350,650],[215,720],[390,760],[150,774],[325,818],[195,888],[410,912],
    [1435,118],[1270,74],[1035,205],[1490,168],[1325,132],[1135,244],[1415,214],[1230,286],
    [1460,260],[1310,330],[1080,350],[1510,310],[1360,382],[1150,390],[1425,350],[1260,430],
    [1485,410],[1320,474],[1080,470],[1405,458],[1200,510],[1465,510],[1305,558],[1100,550],
    [1440,620],[1265,650],[1410,720],[1235,760],[1470,774],[1290,818],[1420,888],[1210,912],
    [286,88],[430,230],[600,332],[390,115],[520,252],[640,355],[1314,88],[1170,230],
    [1000,332],[1210,115],[1080,252],[960,355],[300,900],[450,770],[600,668],[1300,900],
    [1150,770],[1000,668]
  ];

  const viaMarkup = vias.map(([x, y], index) => {
    const hot = index % 7 === 0;
    const radius = hot ? 5.6 : index % 3 === 0 ? 4.8 : 3.6;
    const delay = (-0.28 * (index % 11)).toFixed(2);
    return `<circle class="pcb-via${hot ? ' hot' : ''}" cx="${x}" cy="${y}" r="${radius}" style="--node-delay:${delay}s" />`;
  }).join('');

  const leftPads = Array.from({ length: 8 }, (_, index) => {
    const y = 426 + index * 22;
    return `<rect class="pcb-pad" x="660" y="${y}" width="20" height="8" rx="2" />`;
  }).join('');
  const rightPads = Array.from({ length: 8 }, (_, index) => {
    const y = 426 + index * 22;
    return `<rect class="pcb-pad" x="920" y="${y}" width="20" height="8" rx="2" />`;
  }).join('');
  const topPads = Array.from({ length: 8 }, (_, index) => {
    const x = 708 + index * 24;
    return `<rect class="pcb-pad" x="${x}" y="400" width="8" height="20" rx="2" />`;
  }).join('');
  const bottomPads = Array.from({ length: 8 }, (_, index) => {
    const x = 708 + index * 24;
    return `<rect class="pcb-pad" x="${x}" y="580" width="8" height="20" rx="2" />`;
  }).join('');

  background.innerHTML = `
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <pattern id="pcb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        </pattern>
        <filter id="pcb-energy-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pcb-node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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

function linkProjectThumbnails() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const repositoryLink = card.querySelector('.repo-link');
    const media = card.querySelector(':scope > .project-media');

    if (!repositoryLink || !media || media.parentElement?.classList.contains('project-thumbnail-link')) return;

    const projectTitle = card.querySelector('h3')?.textContent?.trim() || 'project';
    const thumbnailLink = document.createElement('a');
    thumbnailLink.className = 'project-thumbnail-link';
    thumbnailLink.href = repositoryLink.href;
    thumbnailLink.target = '_blank';
    thumbnailLink.rel = 'noreferrer';
    thumbnailLink.title = `Open ${projectTitle} repository`;
    thumbnailLink.setAttribute('aria-label', `Open ${projectTitle} repository in a new tab`);

    media.replaceWith(thumbnailLink);
    thumbnailLink.appendChild(media);
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
  window.setTimeout(() => {
    introScreen.classList.add('is-hidden');
  }, 900);
}

createPcbBackground();
buildLetterIntro();
fitIntroName();
linkProjectThumbnails();

window.requestAnimationFrame(fitIntroName);
document.fonts?.ready?.then(fitIntroName);

let introAlreadySeen = false;
try {
  introAlreadySeen = sessionStorage.getItem(introStorageKey) === 'true';
} catch (error) {
  introAlreadySeen = false;
}

if (introAlreadySeen) {
  enterPortfolio({ instant: true });
}

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
