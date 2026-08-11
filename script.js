/**
 * Dr. Brajesh Kumar - Professional Portfolio JavaScript
 * Modern Vanilla JS implementation (Scroll handlers, Animations, Counter, Nav)
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // CONFIGURATION
  // Editable contact target URL (e.g. mailto: or custom contact channel)
  // -------------------------------------------------------------
  const CONTACT_URL = '#contact';

  // Apply contact URL to contact button
  const contactBtn = document.getElementById('contact-btn');
  if (contactBtn) {
    contactBtn.href = CONTACT_URL;
  }

  // -------------------------------------------------------------
  // 1. SCROLL PROGRESS BAR & HEADER SCROLLED STATE
  // -------------------------------------------------------------
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.getElementById('main-header');

  const updateScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll progress bar
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = `${scrollPercent}%`;
      }
    }

    // Header scrolled class
    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll(); // initial check

  // -------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // -------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    if (mobileToggle) mobileToggle.classList.add('active');
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // -------------------------------------------------------------
  // 3. ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const highlightNav = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // -------------------------------------------------------------
  // 4. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
  // -------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // -------------------------------------------------------------
  // 5. ANIMATED NUMBER COUNTER (EXPERIENCE SECTION)
  // -------------------------------------------------------------
  const counterElement = document.getElementById('experience-counter');
  let counterAnimated = false;

  const animateCounter = () => {
    if (!counterElement || counterAnimated) return;

    const target = parseInt(counterElement.getAttribute('data-target') || '12', 10);
    const duration = 1800; // ms
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counterElement.textContent = target;
        clearInterval(timer);
      } else {
        counterElement.textContent = Math.floor(current);
      }
    }, stepTime);

    counterAnimated = true;
  };

  const expSection = document.getElementById('experience');
  if (expSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter();
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(expSection);
  } else {
    animateCounter();
  }

  // -------------------------------------------------------------
  // 6. PARALLAX EFFECT ON FEATURED BANNER
  // -------------------------------------------------------------
  const bannerBg = document.querySelector('.portrait-banner-bg');
  const bannerSection = document.querySelector('.featured-portrait-section');

  if (bannerBg && bannerSection) {
    window.addEventListener('scroll', () => {
      const rect = bannerSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const speed = 0.2;
        const yPos = (rect.top - windowHeight / 2) * speed;
        bannerBg.style.transform = `scale(1.08) translateY(${yPos}px)`;
      }
    }, { passive: true });
  }
});
