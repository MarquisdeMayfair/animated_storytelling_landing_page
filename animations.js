/**
 * ═══════════════════════════════════════════════════════════════════
 * ANIMATED STORYTELLING PAGE - GSAP ANIMATIONS
 * Inspired by wabi.ai narrative style
 * ═══════════════════════════════════════════════════════════════════
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────
// UTILITY: Check for reduced motion preference
// ─────────────────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─────────────────────────────────────────────────────────────────
// AMBIENT PARTICLES
// ─────────────────────────────────────────────────────────────────
function createParticles() {
  if (prefersReducedMotion) return;
  
  const container = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    particle.style.width = `${1 + Math.random() * 2}px`;
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

// ─────────────────────────────────────────────────────────────────
// HERO ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Animate hero background
  tl.to('.hero-bg', {
    scale: 1,
    duration: 2,
    ease: 'power2.out'
  }, 0);
  
  // Eyebrow
  tl.to('.hero-eyebrow', {
    opacity: 1,
    y: 0,
    duration: 1
  }, 0.5);
  
  // Title lines with stagger
  tl.to('.title-line', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2
  }, 0.7);
  
  // Subtitle
  tl.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, 1.5);
  
  // CTA Button
  tl.to('.cta-btn', {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, 1.8);
  
  // Scroll indicator
  tl.to('.scroll-indicator', {
    opacity: 0.7,
    duration: 1
  }, 2.2);
  
  // Parallax effect on hero background
  if (!prefersReducedMotion) {
    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// STORY SECTION ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initStoryAnimations() {
  // Verse numbers
  gsap.utils.toArray('.verse-number').forEach(verse => {
    gsap.to(verse, {
      opacity: 0.15,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: verse,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Text reveals
  gsap.utils.toArray('.text-reveal').forEach((text, i) => {
    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Highlight effect
  gsap.utils.toArray('.highlight').forEach(highlight => {
    gsap.to(highlight.querySelector('::after') || highlight, {
      scrollTrigger: {
        trigger: highlight,
        start: 'top 80%',
        onEnter: () => highlight.parentElement?.parentElement?.classList.add('is-visible')
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// CROSS-OUT TEXT EFFECT
// ─────────────────────────────────────────────────────────────────
function initCrossOutEffect() {
  const crossContainers = document.querySelectorAll('.cross-text-container');
  
  crossContainers.forEach(container => {
    const crossText = container.querySelector('.cross-text');
    const crossLine = container.querySelector('.cross-line');
    const replacement = container.querySelector('.replacement-text');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
    
    // Show original text
    tl.to(crossText, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    // Animate the cross-out line
    tl.to(crossLine, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '+=0.3');
    
    // Fade original text
    tl.to(crossText, {
      opacity: 0.4,
      duration: 0.4
    }, '-=0.3');
    
    // Reveal replacement
    tl.to(replacement, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.2');
  });
}

// ─────────────────────────────────────────────────────────────────
// DECORATIVE FLOURISH ANIMATION
// ─────────────────────────────────────────────────────────────────
function initFlourishAnimations() {
  gsap.utils.toArray('.flourish-path').forEach(path => {
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: path,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// DRAMATIC PAUSE ANIMATION
// ─────────────────────────────────────────────────────────────────
function initDramaticPause() {
  const dots = document.querySelectorAll('.pause-dot');
  
  gsap.to(dots, {
    opacity: 1,
    duration: 0.5,
    stagger: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.dramatic-pause',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// LENORE NAME REVEAL
// ─────────────────────────────────────────────────────────────────
function initLenoreReveal() {
  const lenore = document.querySelector('.lenore-text');
  if (!lenore) return;
  
  gsap.to(lenore, {
    opacity: 1,
    scale: 1.1,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: lenore,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Glow pulse effect
  if (!prefersReducedMotion) {
    gsap.to(lenore, {
      textShadow: '0 0 60px rgba(196, 169, 98, 0.8)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: lenore,
        start: 'top 80%'
      }
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// PARALLAX SECTIONS
// ─────────────────────────────────────────────────────────────────
function initParallaxSections() {
  if (prefersReducedMotion) return;
  
  gsap.utils.toArray('.parallax-section').forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    
    gsap.to(bg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// QUOTE TYPEWRITER EFFECT
// ─────────────────────────────────────────────────────────────────
function initTypewriter() {
  const quoteText = document.getElementById('quoteText');
  if (!quoteText) return;
  
  const originalText = quoteText.innerHTML;
  quoteText.innerHTML = '';
  quoteText.style.visibility = 'visible';
  
  let hasPlayed = false;
  
  ScrollTrigger.create({
    trigger: quoteText,
    start: 'top 75%',
    onEnter: () => {
      if (hasPlayed) return;
      hasPlayed = true;
      
      let i = 0;
      const chars = originalText.split('');
      
      function typeChar() {
        if (i < chars.length) {
          // Handle HTML tags
          if (chars[i] === '<') {
            let tag = '';
            while (chars[i] !== '>' && i < chars.length) {
              tag += chars[i];
              i++;
            }
            tag += chars[i];
            i++;
            quoteText.innerHTML += tag;
          } else {
            quoteText.innerHTML += chars[i];
            i++;
          }
          
          const delay = prefersReducedMotion ? 5 : (chars[i - 1] === ' ' ? 30 : 25);
          setTimeout(typeChar, delay);
        }
      }
      
      typeChar();
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// SPLIT TEXT & ECHO ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initSplitTextAnimations() {
  // Split lines
  const splitLines = document.querySelectorAll('.split-line');
  
  gsap.to(splitLines, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.split-text',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Echo effect
  const echoes = document.querySelectorAll('.echo');
  
  echoes.forEach((echo, i) => {
    const delay = parseFloat(echo.dataset.delay) || i * 0.3;
    
    gsap.to(echo, {
      opacity: 1 - (i * 0.3),
      y: i * 10,
      duration: 1,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.echo-text',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// RAVEN SILHOUETTE DRAW
// ─────────────────────────────────────────────────────────────────
function initRavenDraw() {
  const ravenPath = document.querySelector('.raven-path');
  if (!ravenPath) return;
  
  gsap.to(ravenPath, {
    strokeDashoffset: 0,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.raven-silhouette',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// NEVERMORE REVEAL
// ─────────────────────────────────────────────────────────────────
function initNevermoreReveal() {
  const never = document.querySelector('.never');
  const more = document.querySelector('.more');
  
  if (!never || !more) return;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.nevermore',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  tl.to(never, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  tl.to(more, {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.3');
  
  // Shake effect on "more"
  if (!prefersReducedMotion) {
    tl.to(more, {
      x: '+=3',
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      ease: 'power1.inOut'
    }, '+=0.2');
  }
}

// ─────────────────────────────────────────────────────────────────
// FINALE ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initFinaleAnimations() {
  gsap.to('.finale-verse', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.finale-verse',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  gsap.to('.finale-cta', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.finale-cta',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// SMOOTH SCROLL TO SECTION (Enter button)
// ─────────────────────────────────────────────────────────────────
function initSmoothScroll() {
  const enterBtn = document.getElementById('enterBtn');
  if (!enterBtn) return;
  
  enterBtn.addEventListener('click', () => {
    const target = document.getElementById('opening');
    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: target, offsetY: 0 },
        ease: 'power3.inOut'
      });
    } else {
      // Fallback without ScrollTo plugin
      document.getElementById('opening')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// INITIALIZE ALL ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function init() {
  // Wait for fonts to load
  document.fonts.ready.then(() => {
    createParticles();
    initHeroAnimations();
    initStoryAnimations();
    initCrossOutEffect();
    initFlourishAnimations();
    initDramaticPause();
    initLenoreReveal();
    initParallaxSections();
    initTypewriter();
    initSplitTextAnimations();
    initRavenDraw();
    initNevermoreReveal();
    initFinaleAnimations();
    initSmoothScroll();
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

/**
 * ═══════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * TO CUSTOMIZE THIS TEMPLATE:
 * 
 * 1. IMAGES:
 *    - Replace 'raven background.png', 'library.png', 'landscape.png'
 *    - Update the background-image URLs in index.html
 * 
 * 2. TEXT:
 *    - Edit the story content in index.html
 *    - Each .story-text element will animate on scroll
 * 
 * 3. COLORS:
 *    - Modify CSS variables in styles.css :root
 *    - Key colors: --gold, --crimson, --parchment
 * 
 * 4. FONTS:
 *    - Change Google Fonts import in index.html
 *    - Update --font-display and --font-body in styles.css
 * 
 * 5. ANIMATIONS:
 *    - Adjust durations and easing in this file
 *    - ScrollTrigger 'start' values control when animations begin
 * 
 * 6. SECTIONS:
 *    - Add new .story-section elements
 *    - Use .parallax-section for image backgrounds
 * 
 * ═══════════════════════════════════════════════════════════════════
 */
