/* ── Scroll progress bar ── */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
}, { passive: true });

/* ── Reveal on scroll ── */
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
revealItems.forEach((item) => revealObserver.observe(item));

/* ── Active nav link ── */
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === activeId);
      });
    });
  },
  { rootMargin: '-30% 0px -55% 0px', threshold: 0.1 }
);
sections.forEach((section) => sectionObserver.observe(section));

/* ── Theme toggle ── */
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('themePreference');
document.body.setAttribute('data-theme', storedTheme || 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('themePreference', next);
  });
}

/* ── Animated counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
counterEls.forEach((el) => counterObserver.observe(el));

/* ── Typing effect ── */
const roles = [
  'Full Stack Engineering',
  'Team Leadership',
  'Platform Architecture',
  'Product Management',
  'Open Source Contribution',
  'Data Engineering',
];

const typedEl = document.getElementById('typedRole');
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_END = 1800;
const PAUSE_START = 350;

function typeStep() {
  if (!typedEl) return;
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeStep, PAUSE_END);
      return;
    }
    setTimeout(typeStep, TYPE_SPEED);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeStep, PAUSE_START);
      return;
    }
    setTimeout(typeStep, DELETE_SPEED);
  }
}

typeStep();

/* ── Footer year ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Print / PDF resume ── */
const printResumeButton = document.getElementById('printResume');
if (printResumeButton) {
  printResumeButton.addEventListener('click', () => {
    const w = window.open('resume-one-page.html', '_blank', 'noopener');
    if (w) w.addEventListener('load', () => w.print());
  });
}
