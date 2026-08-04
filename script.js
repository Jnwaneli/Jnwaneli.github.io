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
  }

  .circuit-background svg {
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.24));
  }

  .circuit-paths path {
    stroke: rgba(255, 255, 255, 0.30) !important;
    stroke-width: 1.8 !important;
    stroke-dasharray: 22 14 !important;
    animation-duration: 14s !important;
  }

  .circuit-nodes circle {
    fill: rgba(255, 255, 255, 0.76) !important;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.50));
  }

  .site-shell {
    position: relative;
    z-index: 1 !important;
    background: linear-gradient(180deg, rgba(5, 5, 5, 0.60), rgba(5, 5, 5, 0.78));
  }

  .intro-screen {
    z-index: 1500 !important;
    background: rgba(0, 0, 0, 0.86) !important;
  }

  .intro-frame {
    background: rgba(8, 8, 8, 0.76) !important;
    backdrop-filter: blur(3px);
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
    .intro-char {
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
