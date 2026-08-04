const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('open');
}

menuButton.addEventListener('click', () => {
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

document.querySelector('#year').textContent = new Date().getFullYear();
