/**
 * ═══════════════════════════════════════════════════════════════════
 * CRAZY ONES - INLINE ANIMATIONS
 * Apple/Wabi.ai inspired scroll-triggered effects
 * ═══════════════════════════════════════════════════════════════════
 */

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─────────────────────────────────────────────────────────────────
// HERO ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  
  // Badge
  tl.to('.hero-badge', {
    opacity: 1,
    y: 0,
    duration: 1
  }, 0.3);
  
  // Words stagger
  tl.to('.word-animate', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.1
  }, 0.5);
  
  // Scroll cue
  tl.to('.scroll-cue', {
    opacity: 1,
    duration: 1
  }, 1.5);
}

// ─────────────────────────────────────────────────────────────────
// LINE REVEAL ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initLineReveals() {
  gsap.utils.toArray('.line-reveal').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// CHARACTER BY CHARACTER REVEAL
// ─────────────────────────────────────────────────────────────────
function initCharReveals() {
  gsap.utils.toArray('.char-reveal').forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    // Create spans for each character
    const chars = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      element.appendChild(span);
      return span;
    });
    
    element.style.opacity = '1';
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out'
        });
      },
      once: true
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// UNDERLINE ANIMATION
// ─────────────────────────────────────────────────────────────────
function initUnderlines() {
  gsap.utils.toArray('.underline-animate').forEach(element => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => element.classList.add('is-visible'),
      onLeaveBack: () => element.classList.remove('is-visible')
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// STRIKE THROUGH ANIMATION
// ─────────────────────────────────────────────────────────────────
function initStrikeThrough() {
  gsap.utils.toArray('.strike-through').forEach(element => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => element.classList.add('is-visible'),
      onLeaveBack: () => element.classList.remove('is-visible')
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// FADE UP ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initFadeUps() {
  gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// WORD POP ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initWordPops() {
  const containers = document.querySelectorAll('.statement-text');
  
  containers.forEach(container => {
    const words = container.querySelectorAll('.word-pop');
    
    gsap.to(words, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// QUOTE WORD ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initQuoteWords() {
  const quoteWords = document.querySelectorAll('.quote-word');
  
  quoteWords.forEach(word => {
    const delay = parseFloat(word.dataset.delay) || 0;
    
    gsap.to(word, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.big-quote',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      delay: delay
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// TYPEWRITER EFFECT
// ─────────────────────────────────────────────────────────────────
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;
  
  const originalText = element.textContent;
  element.textContent = '';
  
  let hasPlayed = false;
  
  ScrollTrigger.create({
    trigger: element,
    start: 'top 75%',
    onEnter: () => {
      if (hasPlayed) return;
      hasPlayed = true;
      
      gsap.to(element, {
        duration: originalText.length * 0.04,
        text: {
          value: originalText,
          delimiter: ''
        },
        ease: 'none'
      });
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// IMAGE REVEAL ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initImageReveals() {
  gsap.utils.toArray('.frame-image').forEach(img => {
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      onStart: () => img.classList.add('is-visible')
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// SVG ICON DRAW ANIMATIONS (legacy for any remaining SVGs)
// ─────────────────────────────────────────────────────────────────
function initIconDraws() {
  gsap.utils.toArray('.icon-svg').forEach(svg => {
    const paths = svg.querySelectorAll('.draw-path');
    const rays = svg.querySelectorAll('.ray');
    const sparkles = svg.querySelectorAll('.sparkle');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    
    // Fade in SVG
    tl.to(svg, {
      opacity: 1,
      duration: 0.3
    });
    
    // Draw paths
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power2.inOut'
    }, 0.2);
    
    // Animate rays
    if (rays.length) {
      tl.to(rays, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.1
      }, '-=0.5');
    }
    
    // Animate sparkles
    if (sparkles.length) {
      tl.to(sparkles, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        yoyo: true,
        repeat: 2
      }, '-=0.3');
    }
    
    // Start rotation if applicable
    if (svg.classList.contains('rotating-icon')) {
      tl.add(() => svg.classList.add('is-visible'), '+=0.2');
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// COMPARISON DIVIDER
// ─────────────────────────────────────────────────────────────────
function initComparison() {
  const divider = document.querySelector('.divider-line');
  if (!divider) return;
  
  gsap.to(divider, {
    scaleY: 1,
    scaleX: 1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.comparison-block',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// FINALE ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initFinale() {
  // Line by line reveal
  const lines = document.querySelectorAll('.line-by-line .line');
  
  gsap.to(lines, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.finale-text',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Finale reveal
  const finaleWord = document.querySelector('.finale-word');
  const finaleHighlight = document.querySelector('.finale-highlight');
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.finale-reveal',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });
  
  if (finaleWord) {
    tl.to(finaleWord, {
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  if (finaleHighlight) {
    tl.to(finaleHighlight, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.3');
  }
  
  // Logo reveal
  const logo = document.querySelector('.apple-logo');
  const logoPaths = document.querySelectorAll('.logo-path');
  
  if (logo) {
    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: logo,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
    
    logoTl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
    
    logoTl.to(logoPaths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: 'power2.inOut'
    }, '-=0.3');
    
    logoTl.to(logoPaths, {
      fill: 'currentColor',
      duration: 0.5
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// PARALLAX EFFECTS
// ─────────────────────────────────────────────────────────────────
function initParallax() {
  if (prefersReducedMotion) return;
  
  gsap.utils.toArray('[data-parallax]').forEach(element => {
    const speed = parseFloat(element.dataset.parallax) || 0.1;
    
    gsap.to(element, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// FLOATING SHAPES
// ─────────────────────────────────────────────────────────────────
function initShapes() {
  if (prefersReducedMotion) return;
  
  gsap.utils.toArray('.shape').forEach(shape => {
    const speed = parseFloat(shape.dataset.speed) || 0.5;
    
    gsap.to(shape, {
      y: `${-100 * speed}`,
      ease: 'none',
      scrollTrigger: {
        trigger: shape.closest('.section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// STAGGER WORDS IN PARAGRAPHS
// ─────────────────────────────────────────────────────────────────
function initStaggerWords() {
  gsap.utils.toArray('.stagger-words').forEach(paragraph => {
    // Skip if already processed
    if (paragraph.dataset.processed) return;
    paragraph.dataset.processed = 'true';
    
    const text = paragraph.innerHTML;
    const words = text.split(/(\s+)/).map(word => {
      if (word.match(/^\s+$/)) return word;
      // Preserve HTML tags
      if (word.includes('<')) return word;
      return `<span class="stagger-word" style="display:inline-block;opacity:0;transform:translateY(20px)">${word}</span>`;
    }).join('');
    
    paragraph.innerHTML = words;
    
    const wordSpans = paragraph.querySelectorAll('.stagger-word');
    
    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: paragraph,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// GRADIENT ORB PARALLAX
// ─────────────────────────────────────────────────────────────────
function initOrbParallax() {
  if (prefersReducedMotion) return;
  
  gsap.utils.toArray('.gradient-orb').forEach((orb, i) => {
    gsap.to(orb, {
      y: `${-200 - i * 50}`,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// INITIALIZE ALL
// ─────────────────────────────────────────────────────────────────
function init() {
  document.fonts.ready.then(() => {
    initHero();
    initLineReveals();
    initCharReveals();
    initUnderlines();
    initStrikeThrough();
    initFadeUps();
    initWordPops();
    initQuoteWords();
    initTypewriter();
    initImageReveals();
    initIconDraws();
    initComparison();
    initFinale();
    initParallax();
    initShapes();
    initStaggerWords();
    initOrbParallax();
    
    ScrollTrigger.refresh();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

/**
 * ═══════════════════════════════════════════════════════════════════
 * INLINE ANIMATION CHEATSHEET
 * ═══════════════════════════════════════════════════════════════════
 * 
 * CLASSES TO USE:
 * 
 * .line-reveal      - Fade up line by line
 * .char-reveal      - Character by character reveal
 * .word-pop         - Pop in each word with scale
 * .fade-up          - Simple fade up
 * .underline-animate - Animated underline on scroll
 * .strike-through   - Animated strikethrough
 * .text-gradient    - Rainbow gradient text
 * .stagger-words    - Auto-split and stagger words
 * 
 * DATA ATTRIBUTES:
 * 
 * data-parallax="0.1"  - Parallax scroll speed
 * data-delay="0.5"     - Animation delay
 * data-speed="0.5"     - Shape float speed
 * 
 * ═══════════════════════════════════════════════════════════════════
 */
