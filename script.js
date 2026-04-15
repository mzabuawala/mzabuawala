const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('nav a');
const themeToggle = document.getElementById('themeToggle');
const printResumeButton = document.getElementById('printResume');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const storedTheme = localStorage.getItem('themePreference');
if (storedTheme) {
  document.body.setAttribute('data-theme', storedTheme);
} else {
  document.body.setAttribute('data-theme', 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('themePreference', nextTheme);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeId = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === activeId);
      });
    });
  },
  {
    rootMargin: '-30% 0px -55% 0px',
    threshold: 0.1,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (printResumeButton) {
  printResumeButton.addEventListener('click', () => {
    const resumeWindow = window.open('resume-one-page.html', '_blank', 'noopener');
    if (resumeWindow) {
      resumeWindow.addEventListener('load', () => {
        resumeWindow.print();
      });
    }
  });
}