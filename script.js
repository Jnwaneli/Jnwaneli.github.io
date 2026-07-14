const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const clock = document.querySelector(".system-clock");
const packetCount = document.querySelector(".packet-count");
const cursorGlow = document.querySelector(".cursor-glow");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  siteNav.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" },
);

revealItems.forEach((item, index) => {
  if (item.closest(".hero")) item.style.transitionDelay = `${Math.min(index * 85, 340)}ms`;
  revealObserver.observe(item);
});

function updateSystemClock() {
  const now = new Date();
  clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

let packets = 12840;

function updatePackets() {
  packets += Math.floor(Math.random() * 9) + 2;
  packetCount.textContent = packets.toLocaleString("en-US");
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener(
  "pointermove",
  (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

document.querySelector(".current-year").textContent = new Date().getFullYear();
updateHeader();
updateSystemClock();
setInterval(updateSystemClock, 1000);
setInterval(updatePackets, 1450);

