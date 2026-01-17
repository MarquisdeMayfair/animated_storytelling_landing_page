# Here's to the Crazy Ones - Animated Storytelling Template

> Apple "Think Different" manifesto with wabi.ai-style inline animations

## Features

### Inline Animation Effects
- **Word-by-word reveal** - Words animate in with stagger
- **Character-by-character** - Letter-by-letter typewriter effect  
- **Line reveal** - Lines fade up sequentially
- **Underline animation** - Underlines draw on scroll
- **Strike-through** - Animated cross-out effect
- **Word pop** - Words scale in with bounce
- **SVG icon draw** - Icons draw their paths on scroll
- **Rainbow gradient text** - Animated gradient backgrounds

### Visual Effects
- Floating gradient orbs background
- Parallax scroll effects
- Geometric shape animations
- Logo reveal with path drawing

## File Structure

```
crazy-ones/
├── index.html      # Main template
├── styles.css      # All styling
├── animations.js   # GSAP animations
└── README.md       # This file + image prompts
```

## Quick Start

1. Open `index.html` in browser
2. Generate images using prompts below
3. Replace placeholder SVG icons with your images
4. Customize text content
5. Deploy!

---

## 🎨 AI Image Generation Prompts

### For NanoBanana / Midjourney / DALL-E / Stable Diffusion

#### 1. Lightbulb (Innovation/Ideas)
```
A glowing lightbulb floating in darkness, neon wireframe style, 
gradient colors from coral red to golden yellow, minimalist, 
black background, subtle glow effect, think different vibes, 
Apple aesthetic, 1:1 aspect ratio, high contrast
```

**Alternative prompt:**
```
Abstract lightbulb made of flowing light particles, 
warm gradient (orange to yellow), floating in void, 
creative inspiration concept, futuristic minimal style, 
dark background with subtle purple ambient glow
```

#### 2. Eye/Vision (Seeing Differently)
```
Stylized human eye with galaxy/cosmos inside the iris, 
purple and blue gradient, minimal line art style, 
visionary concept, black background, ethereal glow, 
Apple keynote aesthetic, clean geometric lines
```

**Alternative prompt:**
```
Abstract eye symbol, neon purple to blue gradient, 
geometric wireframe style, perception concept, 
dark minimal background, subtle lens flare, 
futuristic clean design
```

#### 3. Gears/Change (Transformation)
```
Interlocking gears made of light, green to teal gradient, 
floating in space, mechanical innovation concept, 
minimalist style, dark background, soft glow, 
clean tech aesthetic, progress symbolism
```

**Alternative prompt:**
```
Single elegant gear icon, emerald green neon glow, 
wireframe style with gradient fill, transformation concept,
black background, subtle particle effects, 
Apple design language
```

#### 4. Brain/Mind (Thinking)
```
Abstract brain visualization, neural network style, 
rainbow gradient connections, thoughts and creativity concept,
dark background, bioluminescent glow, 
minimal futuristic design, intelligence symbolism
```

#### 5. Rocket/Progress (Moving Forward)
```
Minimalist rocket ship, gradient trail from pink to blue,
launching upward, progress and ambition concept,
dark space background with stars, clean lines,
startup energy, Apple keynote style
```

#### 6. Puzzle Piece (Misfits)
```
Single puzzle piece that doesn't fit, glowing edges,
coral to gold gradient, misfit concept, rebellion,
dark background, floating in space, unique shape,
standing out from the crowd symbolism
```

---

## 🔧 Setting Up Image Generation in Cursor

### Option 1: Manual Generation (Recommended)
1. Copy prompts above
2. Use [Midjourney](https://midjourney.com), [DALL-E](https://openai.com/dall-e), [Leonardo.ai](https://leonardo.ai), or [NanoBanana](https://nanobanana.ai)
3. Download images and place in this folder
4. Update HTML to reference your images:

```html
<!-- Replace this: -->
<div class="placeholder-image lightbulb">
  <svg>...</svg>
</div>

<!-- With this: -->
<div class="image-frame">
  <img src="lightbulb.png" alt="Innovation">
</div>
```

### Option 2: MCP Server for Image Generation

You could potentially add an MCP server for image generation. Check these options:

**Potential MCP Servers (community/custom):**
- Replicate API MCP
- Stability AI MCP
- OpenAI DALL-E MCP

**To add an MCP server in Cursor:**
1. Open Settings → MCP Servers
2. Add server configuration
3. Restart Cursor

**Example `.cursor/mcp.json` config (hypothetical):**
```json
{
  "mcpServers": {
    "image-gen": {
      "command": "npx",
      "args": ["-y", "@your-mcp/image-generator"],
      "env": {
        "REPLICATE_API_KEY": "your-key-here"
      }
    }
  }
}
```

*Note: As of now, there's no official image generation MCP built into Cursor. The SVG placeholders in this template work as functional icons until you add real images.*

---

## Animation Classes Cheatsheet

| Class | Effect |
|-------|--------|
| `.word-animate` | Word pops in |
| `.line-reveal` | Line fades up |
| `.char-reveal` | Character by character |
| `.text-gradient` | Rainbow gradient text |
| `.underline-animate` | Animated underline |
| `.strike-through` | Animated strikethrough |
| `.word-pop` | Bouncy word entrance |
| `.fade-up` | Simple fade up |
| `.stagger-words` | Auto-split word stagger |

## Data Attributes

| Attribute | Usage |
|-----------|-------|
| `data-parallax="0.1"` | Parallax scroll speed |
| `data-delay="0.5"` | Animation delay |
| `data-speed="0.5"` | Float animation speed |

---

## Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
  --gradient-1: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  --gradient-2: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
  --gradient-3: linear-gradient(135deg, #11998E 0%, #38EF7D 100%);
}
```

### Fonts
Change in HTML head:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONT&display=swap" rel="stylesheet">
```

---

## Credits

- Inspired by [Apple's "Think Different"](https://en.wikipedia.org/wiki/Think_different) campaign
- Animation style from [Wabi.ai](https://wabi.ai)
- Built with [GSAP](https://greensock.com/gsap/)

## License

MIT - Free for personal and commercial use
