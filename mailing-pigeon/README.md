# MailingPigeon - WW1 Storytelling Template

> Light, whimsical storytelling page transitioning from Cher Ami's heroic tale to MailingPigeon product

## Features

- **WW1 Vintage Aesthetic** - Sepia tones, vintage typography, paper texture
- **Whimsical Animations** - Flying pigeon, typewriter effects, scroll reveals
- **Seamless Transition** - Story flows naturally into product
- **Engaging Visuals** - Vintage frames, stamps, military-inspired design

## File Structure

```
mailing-pigeon/
├── index.html      # Main template
├── styles.css      # WW2 vintage styling
├── animations.js   # Scroll-triggered animations
└── README.md       # This file + image prompts
```

---

## 🎨 Image Generation Prompts

### 1. `war-scene.png` (Battlefield Illustration)

**Style:** Light, whimsical WW1 illustration - NOT grim or dark

**For Midjourney/DALL-E:**
```
Whimsical vintage WW1 battlefield illustration, sepia tones, 
cartoon style like Tin Tin or Asterix, smoke clouds in sky, 
distant soldiers, dramatic but lighthearted, vintage poster art style,
warm sepia browns and creams, no gore or violence, heroic atmosphere,
8:5 landscape aspect ratio, --style whimsical --ar 16:10
```

**For Stable Diffusion/Leonardo:**
```
vintage WW1 battlefield illustration, sepia color palette, 
cartoon illustration style, smoke and clouds, heroic atmosphere,
vintage poster art, warm browns and creams, lighthearted,
no violence, Tin Tin art style, --ar 16:10
```

**Key Points:**
- Keep it **light and whimsical** (think Tin Tin, not Saving Private Ryan)
- Sepia/brown tones
- Smoke and drama but not scary
- Vintage poster art style
- 16:10 landscape ratio

---

### 2. `pigeon-hero.png` (Cher Ami Portrait)

**Style:** Heroic pigeon portrait - dignified and brave

**For Midjourney/DALL-E:**
```
Portrait of a heroic carrier pigeon, WW1 military style, 
wearing small message capsule on leg, dignified expression,
vintage sepia photograph style, warm browns and creams,
heroic pose, medal or ribbon visible, vintage military portrait,
circular frame, dignified and brave, lighthearted but respectful,
1:1 square aspect ratio, --style vintage --ar 1:1
```

**For Stable Diffusion/Leonardo:**
```
heroic carrier pigeon portrait, WW1 military style, 
message capsule on leg, sepia photograph, vintage portrait,
dignified expression, warm sepia tones, circular composition,
military medal, brave and noble, --ar 1:1
```

**Key Points:**
- Heroic, dignified pose
- Small message capsule visible on leg
- Sepia vintage photograph style
- Circular composition (will be framed in circle)
- 1:1 square ratio

---

### 3. `mailing-pigeon-logo.png` (Product Logo)

**Style:** Vintage WW1-inspired logo with pigeon

**For Midjourney/DALL-E:**
```
Vintage WW1 style logo, carrier pigeon silhouette, 
military badge design, sepia and blue colors, 
"MailingPigeon" text, vintage typography, badge shape,
pigeon carrying envelope or message, clean design,
vintage military insignia style, professional but whimsical,
3:2 aspect ratio, --style vintage --ar 3:2
```

**For Stable Diffusion/Leonardo:**
```
WW1 military badge logo, carrier pigeon silhouette,
vintage design, sepia and navy blue, badge shape,
pigeon with message, vintage typography, clean professional,
military insignia style, --ar 3:2
```

**Alternative:** You could also create this as a simple SVG/vector logo instead of an image.

**Key Points:**
- Military badge/insignia style
- Pigeon with message/envelope
- Sepia + navy blue color scheme
- Vintage typography
- Professional but approachable
- 3:2 ratio

---

## 🎨 Color Palette Reference

The template uses these WW1 vintage colors:
- **Sepia Dark:** `#3d2817` - Main text
- **Sepia Brown:** `#5c4033` - Borders, accents
- **Sepia Medium:** `#8b6f47` - Secondary text
- **Sepia Cream:** `#d4c4a8` - Backgrounds
- **Paper White:** `#faf8f3` - Main background
- **Red Accent:** `#c41e3a` - Highlights, stamps
- **Blue Accent:** `#1e3a5f` - Product colors, CTAs
- **Gold Accent:** `#d4af37` - Special highlights

---

## 📝 Customization

### Text Content
Edit the story sections in `index.html` - each section animates on scroll.

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
  --sepia-dark: #3d2817;
  --blue-accent: #1e3a5f;
  /* etc */
}
```

### Fonts
Change Google Fonts import in `index.html`:
- `Playfair Display` - Display/serif
- `IBM Plex Mono` - Body/monospace
- `Special Elite` - Vintage/military

---

## 🚀 After Adding Images

Once you download the 3 images:

1. Place them in the `mailing-pigeon/` directory
2. The HTML already references them:
   - `war-scene.png`
   - `pigeon-hero.png`
   - `mailing-pigeon-logo.png`
3. Images will automatically fade in on scroll

---

## ✨ Animation Features

- **Flying Pigeon** - Continuously animates across hero section
- **Typewriter Effect** - Text types out character by character
- **Scroll Reveals** - Elements fade in as you scroll
- **Word-by-Word** - Words pop in with bounce
- **Card Animations** - Capability cards slide up
- **Parallax** - Subtle depth effects

---

## 🎯 Design Philosophy

**Light & Whimsical:**
- Despite WW1 theme, keep it approachable
- Think Tin Tin, not Saving Private Ryan
- Heroic but not grim
- Respectful but engaging

**Seamless Transition:**
- Story flows naturally into product
- Visual elements connect both parts
- Same aesthetic throughout
- Pigeon imagery bridges story → product

---

## Credits

- Inspired by Cher Ami's heroic WW1 story
- Vintage WW1 poster art aesthetic
- Built with GSAP ScrollTrigger

## License

MIT - Free for personal and commercial use
