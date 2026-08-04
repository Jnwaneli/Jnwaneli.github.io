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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 880) closeMenu();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
