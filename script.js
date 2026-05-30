const GITHUB_USERNAME = 'Individeveloper';

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

function handleScroll() {
  const scrollY = window.scrollY;

  // Navbar
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link
  updateActiveNavLink();
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ========================================
// MOBILE NAV TOGGLE
// ========================================

const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  if (navLinksContainer.classList.contains('open')) {
    icon.className = 'fas fa-xmark';
  } else {
    icon.className = 'fas fa-bars';
  }
});

// Close mobile nav when clicking a link
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================

const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Add random slide directions to some elements to make it dynamic
document.querySelectorAll('.about-card').forEach((el, i) => {
  if (i % 2 === 0) el.classList.add('slide-left');
  else el.classList.add('slide-right');
});

document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('scale-up');
});

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach((el) => observer.observe(el));

// ========================================
// COUNTER ANIMATION
// ========================================

const counters = document.querySelectorAll('.stat-number[data-count]');
let countersAnimated = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  counterObserver.observe(statsSection);
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}

// ========================================
// TYPING ANIMATION
// ========================================

const typingText = document.getElementById('typingText');
if (typingText) {
  const words = ['Inspire', 'Innovate', 'Engage', 'Deliver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isPaused) {
      setTimeout(typeEffect, 1500);
      isPaused = false;
      return;
    }

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      isPaused = true;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect slightly delayed
  setTimeout(typeEffect, 1000);
}

// ========================================
// CURSOR GLOW EFFECT (DISABLED FOR CARTOON STYLE)
// ========================================

const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

// ========================================
// 3D TILT EFFECT (DISABLED FOR CARTOON STYLE)
// ========================================

// 3D tilt effect is removed because flat hard shadows don't look good with 3D rotation.

function handleTilt(e) {}
function resetTilt(e) {}

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================

const magneticBtns = document.querySelectorAll('.magnetic-btn');

if (!window.matchMedia("(max-width: 768px)").matches) {
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
}

// ========================================
// PARTICLE CANVAS
// ========================================

const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Fewer particles on mobile
    const particleCount = width > 768 ? 50 : 20;
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 8 + 4; // Bigger sizes
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      // Use solid theme colors (original)
      const colors = ['124, 92, 252', '94, 234, 212', '244, 114, 182'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
      
      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;
    }

    draw() {
      ctx.fillStyle = `rgb(${this.color})`;
      ctx.strokeStyle = `#0f172a`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Draw a square for variety
      ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      ctx.fill();
      ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', init);
  init();
  animate();
}

// ========================================
// BACK TO TOP
// ========================================

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-primary');
  const originalContent = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Sending...</span>';
  btn.style.pointerEvents = 'none';

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      btn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
      btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      contactForm.reset();
    } else {
      btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Error</span>';
      btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    }
  } catch (error) {
    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Error</span>';
    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
  }

  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.style.pointerEvents = '';
    btn.style.background = '';
  }, 3000);
});

// ========================================
// SMOOTH REVEAL ON LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Force initial check
  handleScroll();

  // Trigger hero animations
  const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('is-visible');
    }, 200 + i * 150);
  });
  
  // Load portfolio projects from JSON
  loadProjects();
});
// ========================================
// LOAD PROJECTS FROM JSON
// ========================================

const CATEGORY_ICONS = { games: 'fa-gamepad', web: 'fa-globe', mobile: 'fa-mobile-screen-button' };
const CATEGORY_LABELS = { games: 'Game', web: 'Web', mobile: 'Mobile' };

const STATUS_CONFIG = {
  'completed':   { label: 'Completed',    cls: 'status--done',    icon: 'fa-check' },
  'in-progress': { label: 'In Progress',  cls: 'status--wip',     icon: 'fa-code' },
  'coming-soon': { label: 'Coming Soon',  cls: 'status--coming',  icon: 'fa-clock' },
};

function buildProjectCard(project, category) {
  const catIcon  = CATEGORY_ICONS[category] || 'fa-folder';
  const catLabel = CATEGORY_LABELS[category] || category;
  const iconCls  = project.icon || 'fa-code';
  const statusCfg = STATUS_CONFIG[project.status] || STATUS_CONFIG['coming-soon'];

  const linksHtml = [
    project.github ? `<a href="${project.github}" target="_blank" class="portfolio-link inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 bg-[#121218] text-white" aria-label="GitHub"><i class="fab fa-github"></i></a>` : '',
    project.demo   ? `<a href="${project.demo}"   target="_blank" class="portfolio-link inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 bg-[#121218] text-white" aria-label="Demo"><i class="fas fa-arrow-up-right-from-square"></i></a>` : '',
  ].join('');

  const tagsHtml = project.tags.map(t => `<span class="rounded-full border border-white/20 px-2 py-1">${t}</span>`).join('');

  const item = document.createElement('div');
  item.className = 'portfolio-item animate-on-scroll';
  item.innerHTML = `
    <div class="portfolio-card group relative overflow-hidden rounded-none border-4 border-white bg-[#2a2a35] shadow-[6px_6px_0_0_#ff5757]" data-tilt>
      <div class="portfolio-image relative flex h-40 items-center justify-center" style="background:${project.gradient};">
        <div class="portfolio-image-content text-white"><i class="fas ${iconCls} fa-3x"></i></div>
        ${project.featured ? '<div class="portfolio-featured-badge absolute left-4 top-4 rounded-full bg-[#ffcf33] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#121218]"><i class="fas fa-star"></i> Featured</div>' : ''}
      </div>
      <div class="portfolio-overlay absolute inset-0 bg-[#121218]/90 opacity-0 transition duration-300 group-hover:opacity-100">
        <div class="portfolio-info flex h-full flex-col justify-between p-5">
          <div class="portfolio-info-top flex items-center justify-between gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#d1d1e0]">
            <span class="portfolio-category-tag inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1"><i class="fas ${catIcon}"></i> ${catLabel}</span>
            <span class="portfolio-status-badge ${statusCfg.cls} inline-flex items-center gap-2 rounded-full px-3 py-1"><i class="fas ${statusCfg.icon}"></i> ${statusCfg.label}</span>
          </div>
          <div>
            <h4 class="mt-4 text-sm font-semibold text-white">${project.title}</h4>
            <p class="mt-2 text-xs leading-relaxed text-[#d1d1e0]">${project.description}</p>
          </div>
          <div class="portfolio-footer mt-4 flex items-center justify-between gap-3">
            <div class="portfolio-tech flex flex-wrap gap-2 text-[0.65rem] text-[#d1d1e0]">${tagsHtml}</div>
            ${linksHtml ? `<div class="portfolio-links flex items-center gap-2 text-white">${linksHtml}</div>` : ''}
          </div>
        </div>
      </div>
    </div>`;
  return item;
}

async function loadProjects() {
  try {
    const data = {
      "games": [
        {
          "id": "game-coming-soon",
          "title": "Coming Soon",
          "description": "My latest game project is currently in development. Stay tuned for updates!",
          "tags": ["In Development"],
          "status": "coming-soon",
          "gradient": "linear-gradient(135deg, #00d26a 0%, #00e073 100%)",
          "icon": "fa-clock",
          "github": null,
          "demo": null,
          "featured": false
        }
      ],
      "web": [
        {
          "id": "web-coming-soon",
          "title": "Coming Soon",
          "description": "My latest web project is currently in development. Stay tuned for updates!",
          "tags": ["In Development"],
          "status": "coming-soon",
          "gradient": "linear-gradient(135deg, #7c5cfc 0%, #a855f7 100%)",
          "icon": "fa-clock",
          "github": null,
          "demo": null,
          "featured": false
        }
      ],
      "mobile": [
        {
          "id": "mobile-coming-soon",
          "title": "Coming Soon",
          "description": "My latest mobile app project is currently in development. Stay tuned for updates!",
          "tags": ["In Development"],
          "status": "coming-soon",
          "gradient": "linear-gradient(135deg, #00e073 0%, #5eead4 100%)",
          "icon": "fa-clock",
          "github": null,
          "demo": null,
          "featured": false
        }
      ]
    };

    ['games', 'web', 'mobile'].forEach(cat => {
      const grid = document.getElementById(`${cat}-grid`);
      if (!grid || !data[cat]) return;
      grid.innerHTML = '';
      data[cat].forEach(project => {
        const card = buildProjectCard(project, cat);
        grid.appendChild(card);
      });
      // Re-observe newly added animated elements
      grid.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
      // Re-enable tilt on new cards (desktop only)
      if (!window.matchMedia('(max-width: 768px)').matches) {
        grid.querySelectorAll('[data-tilt]').forEach(el => {
          el.addEventListener('mousemove', handleTilt);
          el.addEventListener('mouseleave', resetTilt);
        });
      }
    });
  } catch (err) {
    console.warn('Could not load projects:', err);
  }
}

