// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.getElementById('navbar');
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
// CURSOR GLOW EFFECT
// ========================================

const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && !window.matchMedia("(max-width: 768px)").matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // Highlight glow on interactive elements
  const interactables = document.querySelectorAll('a, button, .portfolio-card, .service-card, .about-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.background = 'radial-gradient(circle, rgba(94, 234, 212, 0.08) 0%, transparent 70%)';
      cursorGlow.style.width = '600px';
      cursorGlow.style.height = '600px';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.background = 'radial-gradient(circle, rgba(124, 92, 252, 0.06) 0%, transparent 70%)';
      cursorGlow.style.width = '500px';
      cursorGlow.style.height = '500px';
    });
  });
}

// ========================================
// 3D TILT EFFECT
// ========================================

const tiltElements = document.querySelectorAll('[data-tilt]');

if (!window.matchMedia("(max-width: 768px)").matches) {
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', handleTilt);
    el.addEventListener('mouseleave', resetTilt);
  });
}

function handleTilt(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  
  const x = e.clientX - rect.left; // x position within the element
  const y = e.clientY - rect.top;  // y position within the element
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
  const rotateY = ((x - centerX) / centerX) * 10;
  
  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
  const el = e.currentTarget;
  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
}

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
      this.size = Math.random() * 2;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5;
      // Use theme colors randomly
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
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
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

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-primary');
  const originalContent = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-check"></i><span>Pesan Terkirim!</span>';
  btn.style.pointerEvents = 'none';
  btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.style.pointerEvents = '';
    btn.style.background = '';
    contactForm.reset();
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
});
