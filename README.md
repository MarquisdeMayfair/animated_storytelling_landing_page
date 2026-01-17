# Animated Storytelling Landing Page Template

> Inspired by [Wabi.ai](https://wabi.ai/#waitlist) narrative style with Edgar Allan Poe's "The Raven" theme

![Preview](hero-section.png)

## Features

- **GSAP ScrollTrigger Animations** - Smooth scroll-triggered text reveals and parallax effects
- **Cross-out Text Effect** - Animated strikethrough with replacement text reveal
- **Typewriter Effect** - Character-by-character text animation
- **Parallax Image Backgrounds** - Depth and atmosphere with image parallax
- **Gothic Typography** - Cormorant Garamond & Crimson Pro fonts
- **Ambient Particles** - Floating particle effects for atmosphere
- **Responsive Design** - Mobile-friendly with fluid typography
- **Reduced Motion Support** - Respects user accessibility preferences

## Files

```
├── index.html        # Main HTML structure
├── styles.css        # All styling with CSS variables
├── animations.js     # GSAP animations and scroll triggers
├── raven background.png  # Hero section background
├── library.png       # Parallax section 1
└── landscape.png     # Parallax section 2
```

## Quick Start

1. Clone or download this template
2. Replace images with your own
3. Edit text content in `index.html`
4. Customize colors in `styles.css` (CSS variables)
5. Deploy to Netlify, Vercel, or any static host

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --gold: #c4a962;           /* Primary accent */
  --crimson: #8b2635;        /* Secondary accent */
  --parchment: #e8e4dc;      /* Text color */
  --ink-black: #0a0a0b;      /* Background */
}
```

### Fonts

Change Google Fonts import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONT&display=swap" rel="stylesheet">
```

Update font variables:

```css
:root {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', serif;
}
```

### Images

Replace background images in `index.html`:

```html
<div class="hero-bg" style="background-image: url('your-hero-image.png');"></div>
<div class="parallax-bg" style="background-image: url('your-parallax-image.png');"></div>
```

### Text Content

Edit story sections in `index.html`. Each `.story-text` element will automatically animate on scroll.

## Animation Types

### Text Reveal
```html
<p class="story-text">
  <span class="text-reveal">Your text here</span>
</p>
```

### Large Display Text
```html
<p class="story-text large">
  <span class="text-reveal">Large headline text</span>
</p>
```

### Cross-out Effect
```html
<div class="cross-text-container">
  <span class="cross-text">
    Original text
    <svg class="cross-line" viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M0,5 Q25,2 50,6 Q75,10 100,4" stroke-linecap="round"/>
    </svg>
  </span>
  <span class="replacement-text">Replacement text</span>
</div>
```

### Highlighted Text
```html
<span class="highlight">emphasized word</span>
```

### Parallax Image Section
```html
<section class="parallax-section">
  <div class="parallax-bg" style="background-image: url('image.png');"></div>
  <div class="parallax-overlay"></div>
  <div class="parallax-content">
    <!-- Your content -->
  </div>
</section>
```

## AI Image Prompts

Generate matching backgrounds with these prompts:

### Dark Gothic Landscape
```
Create a dark, misty forest scene with bare twisted trees, volumetric fog, 
moonlight filtering through branches, gothic atmosphere, oil painting style, 
muted blues and grays, cinematic lighting, 16:9 aspect ratio
```

### Ancient Library
```
Generate an abandoned Victorian library interior with towering bookshelves,
flickering candlelight, dust motes in air, cobwebs, leather-bound books,
warm amber and brown tones, mysterious atmosphere, cinematic, 16:9
```

### Raven Portrait
```
Oil painting of a solitary raven perched on a dead branch, stormy sky 
background, dark brooding atmosphere, textured brushstrokes, blue-black 
feathers with subtle iridescence, Edgar Allan Poe inspired, 16:9
```

## Dependencies

- **GSAP** (loaded via CDN) - Animation library
- **GSAP ScrollTrigger** - Scroll-based animations
- **Google Fonts** - Cormorant Garamond & Crimson Pro

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## License

MIT - Free for personal and commercial use

---

Created with inspiration from [Wabi.ai](https://wabi.ai/#waitlist) storytelling design patterns.
