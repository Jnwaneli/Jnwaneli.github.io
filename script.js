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
`;
document.head.appendChild(appearanceFix);

const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const introScreen = document.querySelector('#intro-screen');
const enterButton = document.querySelector('#enter-site');
const body = document.body;
const introStorageKey = 'jn-portfolio-entered';

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
  if (window.innerWidth > 880) closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
