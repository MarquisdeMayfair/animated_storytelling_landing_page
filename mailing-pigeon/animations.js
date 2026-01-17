/**
 * ═══════════════════════════════════════════════════════════════════
 * MAILINGPIGEON - WW2 STORYTELLING ANIMATIONS
 * Light, whimsical, engaging scroll-triggered effects
 * ═══════════════════════════════════════════════════════════════════
 */

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function markPlayed(el) {
  if (!el) return;
  el.dataset.played = 'true';
}

function hasPlayed(el) {
  return !!el?.dataset?.played;
}

function playCrossoutSwap(el, { immediate = false } = {}) {
  if (!el || hasPlayed(el)) return;

  const oldEl = el.querySelector('.crossout-old');
  const newEl = el.querySelector('.crossout-new');
  const path = el.querySelector('.crossout-line path');

  const tl = gsap.timeline({
    onComplete: () => markPlayed(el)
  });

  // Ensure initial state (in case of hot reload or partial page load)
  if (newEl) tl.set(newEl, { opacity: 0, y: 6 });
  if (path) tl.set(path, { strokeDashoffset: 140 });

  if (path) {
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    }, 0);
  }

  if (oldEl) {
    tl.to(oldEl, {
      opacity: 0.45,
      duration: 0.25,
      ease: 'power1.out'
    }, 0.35);
  }

  if (newEl) {
    tl.to(newEl, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out'
    }, 0.45);
  }

  if (immediate) {
    return tl;
  }

  return tl;
}

function initCrossoutSwaps() {
  const swaps = document.querySelectorAll('.crossout-swap');
  swaps.forEach((el) => {
    // Hero should ONLY trigger after the user scrolls (not on load)
    if (el.classList.contains('crossout-swap--hero')) {
      const triggerOnceOnScroll = () => {
        if (window.scrollY > 0) {
          playCrossoutSwap(el);
          window.removeEventListener('scroll', triggerOnceOnScroll);
        }
      };
      // In case user reloads mid-scroll
      triggerOnceOnScroll();
      window.addEventListener('scroll', triggerOnceOnScroll, { passive: true });
      return;
    }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => playCrossoutSwap(el),
      onEnterBack: () => playCrossoutSwap(el)
    });
  });
}

function initProps() {
  // Bullet hole “impact” on the failure list
  gsap.utils.toArray('.bullet-hole').forEach((el) => {
    const delay = Number.parseFloat(el.dataset.delay ?? '0') || 0;
    gsap.to(el, {
      opacity: 0.85,
      scale: 1,
      rotation: -6,
      duration: 0.7,
      ease: 'back.out(1.4)',
      delay,
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Commando pigeon (main product hero) pop + float
  const commando = document.querySelector('.product-commando-img');
  if (commando) {
    gsap.to(commando, {
      opacity: 1,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: commando,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    if (!prefersReducedMotion) {
      gsap.to(commando, {
        y: '-=8',
        rotation: '+=1.2',
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // Poster reveal
  const poster = document.querySelector('.poster-img');
  if (poster) {
    gsap.to(poster, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: poster,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}

function initMissionFlyby() {
  const img = document.querySelector('.mission-flyby-img');
  if (!img) return;

  if (prefersReducedMotion) {
    gsap.to(img, {
      opacity: 0.65,
      duration: 0.6,
      scrollTrigger: {
        trigger: '#still-flew',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    return;
  }

  gsap.fromTo(
    img,
    { opacity: 0, xPercent: -55, yPercent: 10, rotation: -6, scale: 0.92 },
    {
      opacity: 0.7,
      xPercent: 35,
      yPercent: -6,
      rotation: 6,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#still-flew',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

function initRadio() {
  const widget = document.getElementById('radioWidget');
  if (!widget) return;

  const label = widget.querySelector('.tune-label');
  const meta = widget.querySelector('.tune-meta');

  // Click cycle: 1 -> tunein + song3, 2 -> tunein + song2, 3 -> tunein + song1, 4 -> stop, then repeat
  const tuneIn = 'tunein.mp3';
  const tracks = [
    'ches ami song 3.mp3',
    'Ches Ami second song 2.mp3',
    'Ches Ami song 1.mp3'
  ];

  let clickCount = 0;
  let audio = null;
  let prelude = null;
  let playToken = 0;

  const setPlayingUI = (playing, which = null) => {
    widget.classList.toggle('is-playing', playing);
    if (label) label.textContent = playing ? `on air ${which ?? ''}`.trim() : 'tune in';
    if (meta) meta.textContent = playing ? 'click to switch / stop' : 'click';
  };

  const stop = () => {
    playToken += 1;
    if (prelude) {
      prelude.onended = null;
      prelude.pause();
      prelude.currentTime = 0;
    }
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayingUI(false);
  };

  const playWithTuneIn = async (idx) => {
    const token = ++playToken;
    const src = tracks[idx];

    if (!prelude) prelude = new Audio();
    if (!audio) audio = new Audio();

    // Stop anything currently playing
    prelude.onended = null;
    prelude.pause();
    prelude.currentTime = 0;
    audio.pause();
    audio.currentTime = 0;

    // Play tune-in first
    prelude.src = tuneIn;
    prelude.loop = false;

    const startMain = async () => {
      if (token !== playToken) return;
      audio.src = src;
      audio.loop = false;
      try {
        await audio.play();
        setPlayingUI(true, String(idx + 1));
      } catch (e) {
        setPlayingUI(false);
        // eslint-disable-next-line no-console
        console.warn('Main track play blocked or failed:', e);
      }
    };

    try {
      // Update UI immediately (so dial animates as soon as you click)
      setPlayingUI(true, String(idx + 1));
      await prelude.play();
      // If tune-in ends naturally, start main track
      prelude.onended = startMain;

      // If tune-in is very short, also schedule a fallback start
      setTimeout(() => {
        if (token === playToken && audio.paused) startMain();
      }, 1200);
    } catch (e) {
      // If tune-in can't play, attempt main track anyway
      // eslint-disable-next-line no-console
      console.warn('Tune-in play blocked or failed:', e);
      await startMain();
    }
  };

  const onActivate = () => {
    clickCount = (clickCount + 1) % 4;
    if (clickCount === 0) {
      stop();
      return;
    }
    playWithTuneIn(clickCount - 1);
  };

  widget.addEventListener('click', onActivate);
  widget.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  });

  // Reveal widget on scroll
  gsap.to(widget, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: widget,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// HERO ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Stamp
  tl.to('.hero-stamp', {
    opacity: 1,
    rotation: -5,
    scale: 1,
    duration: 0.8
  }, 0.2);
  
  // Title lines
  tl.to('.title-line', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2
  }, 0.5);
  
  // Typewriter effect
  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    const text = "...but the message had to get through!";
    typewriterEl.textContent = '';
    
    tl.to(typewriterEl, {
      duration: text.length * 0.05,
      text: {
        value: text,
        delimiter: ''
      },
      ease: 'none'
    }, 1.5);
  }
  
  // Flying pigeon
  if (!prefersReducedMotion) {
    const pigeon = document.getElementById('pigeon-flying');
    if (pigeon) {
      tl.to(pigeon, {
        opacity: 0.6,
        x: '-=200',
        duration: 2,
        ease: 'power1.inOut'
      }, 1);
      
      // Continuous flying animation
      gsap.to(pigeon, {
        x: '-=100',
        duration: 3,
        repeat: -1,
        ease: 'power1.inOut',
        yoyo: true
      });
      
      // Flying pigeon image reveal
      const flyingImg = pigeon.querySelector('.flying-pigeon-img');
      if (flyingImg) {
        tl.to(flyingImg, {
          opacity: 0.7,
          duration: 1
        }, 1.2);
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────
// STORY LINE REVEALS
// ─────────────────────────────────────────────────────────────────
function initStoryLines() {
  gsap.utils.toArray('.story-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
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
// IMAGE REVEALS
// ─────────────────────────────────────────────────────────────────
function initImageReveals() {
  gsap.utils.toArray('.story-image, .pigeon-image, .logo-image, .hospital-image, .poster-img').forEach(img => {
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// STORY TEXT REVEALS
// ─────────────────────────────────────────────────────────────────
function initStoryTexts() {
  gsap.utils.toArray('.story-text').forEach(text => {
    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// BULLET POINTS
// ─────────────────────────────────────────────────────────────────
function initBullets() {
  gsap.utils.toArray('.bullet').forEach((bullet, i) => {
    gsap.to(bullet, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: bullet,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// INJURY ITEMS
// ─────────────────────────────────────────────────────────────────
function initInjuries() {
  gsap.utils.toArray('.injury-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// WORD REVEALS
// ─────────────────────────────────────────────────────────────────
function initWordReveals() {
  gsap.utils.toArray('.word-reveal').forEach((word, i) => {
    gsap.to(word, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: word.closest('.heroic-line'),
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// HOSPITAL LINES
// ─────────────────────────────────────────────────────────────────
function initHospitalLines() {
  gsap.utils.toArray('.hospital-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.2
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// REASON LINES
// ─────────────────────────────────────────────────────────────────
function initReasonLines() {
  gsap.utils.toArray('.reason-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.2
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// TRANSITION ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initTransition() {
  gsap.to('.transition-line', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.transition-line',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  gsap.utils.toArray('.failure-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT INTRO
// ─────────────────────────────────────────────────────────────────
function initProductIntro() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.product-intro',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  tl.to('.mission-line', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  tl.to('.principle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=0.4');
}

// ─────────────────────────────────────────────────────────────────
// CAPABILITY CARDS
// ─────────────────────────────────────────────────────────────────
function initCapabilities() {
  gsap.utils.toArray('.capability-card').forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });
  
  gsap.to('.section-heading', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section-heading',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Standing pigeon GIF animation
  gsap.to('.standing-pigeon-wrapper', {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.capabilities-stage',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// COMPARISON ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initComparison() {
  gsap.to('.comparison-line', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.comparison-line',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
  
  gsap.utils.toArray('.resistance-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });
  
  gsap.utils.toArray('.response-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });
  
  gsap.utils.toArray('.strategy-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// FINISH SECTION
// ─────────────────────────────────────────────────────────────────
function initFinish() {
  gsap.to('.finish-heading', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.finish-heading',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
  
  gsap.to('.audience-line', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.audience-line',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
  
  gsap.utils.toArray('.audience-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });
  
  gsap.utils.toArray('.mantra-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.2
    });
  });
}

// ─────────────────────────────────────────────────────────────────
// FINALE ANIMATIONS
// ─────────────────────────────────────────────────────────────────
function initFinale() {
  gsap.utils.toArray('.finale-line').forEach((line, i) => {
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
      delay: i * 0.3
    });
  });
  
  gsap.utils.toArray('.salute-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });
  
  gsap.to('.cta-button', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.cta-button',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// PARALLAX EFFECTS
// ─────────────────────────────────────────────────────────────────
function initParallax() {
  if (prefersReducedMotion) return;
  
  // Subtle parallax on sections
  gsap.utils.toArray('.section').forEach((section, i) => {
    if (i % 2 === 0) {
      gsap.to(section, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// INITIALIZE ALL
// ─────────────────────────────────────────────────────────────────
function init() {
  document.fonts.ready.then(() => {
    initHero();
    initCrossoutSwaps();
    initProps();
    initMissionFlyby();
    initRadio();
    initStoryLines();
    initImageReveals();
    initStoryTexts();
    initBullets();
    initInjuries();
    initWordReveals();
    initHospitalLines();
    initReasonLines();
    initTransition();
    initProductIntro();
    initCapabilities();
    initComparison();
    initFinish();
    initFinale();
    initParallax();
    
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
