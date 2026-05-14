// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(13, 17, 23, 0.98)';
  } else {
    navbar.style.background = 'rgba(13, 17, 23, 0.92)';
  }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(item => {
        item.style.color = item.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Fade-in animation on scroll
const fadeEls = document.querySelectorAll(
  '.project-card, .timeline-item, .blog-card, .stat-card, .skill-group'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
