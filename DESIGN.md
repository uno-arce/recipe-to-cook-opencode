# Design System: Recipe Visualizer App
**Project ID:** 9064531889417296628

## 1. Visual Theme & Atmosphere

**Creative North Star: "The Digital Greenhouse"**

This is a provocative dialogue between the raw, unapologetic honesty of Brutalism and the ethereal, high-tech elegance of Glassmorphism. It rejects the "templated" web by embracing a rigid, architectural grid—reminiscent of exposed concrete formwork—overlaid with delicate, frosted-glass modules that suggest a high-end editorial experience.

The aesthetic combines the heavy, grounded tones of moss and terracotta with the weightlessness of backdrop blurs, creating a space that feels organic and breathing, yet structurally indestructible. Sharp 0px corners reinforce the brutalist foundation, while sophisticated tonal shifts create depth.

## 2. Color Palette & Roles

### Primary Colors
- **Deep Moss Green (#243624):** Primary foundational authority and high-contrast text. Used for main navigation, primary buttons, and headline typography.
- **Moss Green Container (#3A4D39):** Primary container backgrounds, card surfaces, and elevated elements.

### Secondary Colors
- **Soft Terracotta (#974730):** Rhythmic accents and warmth. Used sparingly for CTAs, hover states, and decorative elements.
- **Terracotta Container (#FE987C):** Secondary container backgrounds and accent surfaces.

### Tertiary Colors
- **Dark Clay (#2E3425):** Grounding for interactive containers and supporting elements.
- **Clay Container (#444B3A):** Tertiary surfaces and supporting module backgrounds.

### Surface & Background Colors
- **Off-White Paper (#F9FAF5):** Primary background—the "floor" of the design. A neutral, textured-feeling canvas.
- **Surface Container Low (#F3F4EF):** Recessed foundation for content zones.
- **Surface Container High (#E8E9E4):** Raised platform for elevated content modules.
- **Surface Container Highest (#E2E3DE):** The highest surface level for cards and floating elements.

### Semantic Colors
- **Error (#BA1A1A):** System errors and destructive actions.
- **Error Container (#FFDAD6):** Error state backgrounds.

### Inverse/Overlay Colors
- **Inverse Surface (#2F312E):** Dark surfaces for high-contrast overlays.
- **Inverse Primary (#B7CDB2):** Primary color for inverted contexts.

### Surface Tints & Accents
- **Surface Tint (#50634E):** Subtle accent overlay on surfaces.
- **Outline (#747871):** Default borders and dividers.
- **Outline Variant (#C3C8BF):** Subtle borders, ghost borders at 20% opacity.

## 3. Typography Rules

### Font Families
- **Headlines & Display (Space Grotesk):** A bold, geometric sans-serif that acts as the "architecture" of the page. High-contrast and assertive.
- **Body & Titles (Manrope):** A clean, modern geometric sans-serif providing a soft counterpoint to heavy headlines.
- **Labels (Space Grotesk):** Monospaced-adjacent feel for technical metadata and small eyebrow headers.

### Typography Scale
- **Display-LG:** Hero statements with tight letter-spacing (-0.02em) to maximize brutalist weight.
- **Body-LG:** Long-form narrative text with generous line-height (1.6) for airy feel despite heavy color palette.
- **Label-MD:** All-caps for technical metadata and "raw/exposed" aesthetic.

## 4. Component Stylings

### Buttons
- **Primary Button:** Deep Moss Green background, white text, sharp 0px corners.
- **Secondary Button:** Glassmorphic background with a primary ghost border (20% opacity), sharp corners.
- **Tertiary Button:** Text-only with heavy underline (2px) using Terracotta color.

### Cards & Containers
- **Corner Style:** Sharp 0px corners (no border-radius)—strictly enforced.
- **Background:** Glassmorphic blur or surface-container-high.
- **Constraint:** No dividers; separate content using spacing scale (32px or 48px gaps).
- **Elevation:** Achieved via tonal layering—place surface-container-lowest card on surface-container-low background for "soft lift."

### Navigation Bar
- **Style:** Floating glass monolith.
- **Placement:** Pinned to top or detached floating island at bottom center.
- **Effect:** Heavy backdrop blur (24px) allowing content to bleed through.

### Input Fields
- **Style:** "Underlined" style only, or solid surface-container-highest block.
- **Focus State:** Bottom border shifts from outline-variant to primary with 2px thickness.

### Glassmorphism Implementation
- **Fill:** Surface at 60–80% opacity.
- **Effect:** backdrop-filter: blur(16px).
- **Inner Stroke:** 1px top-and-left white highlight (20% opacity) to simulate light hitting glass edge.

### Shadows
- **Ambient Shadow (Floating Elements):** 0px 20px 40px, on-surface at 6% opacity—mimics natural light diffusion.
- **Ghost Border Fallback:** outline-variant at 15% opacity, 1px weight. Never use high-contrast 100% opaque borders.

## 5. Layout Principles

### The "No-Line" Rule
Sectioning must never use standard 1px solid borders. Boundaries defined by:
1. **Background Shifts:** Transitioning from surface to surface-container-low.
2. **Exposed Grids:** Using outline-variant at 20% opacity to mimic architectural "seam lines."

### Surface Hierarchy & Nesting
Physical layering logic:
- **Base:** surface (The floor)
- **Zone:** surface-container-low (Recessed foundation)
- **Module:** surface-container-highest (Raised platform)
- **Floating Elements:** Glassmorphism (Frosted overlay)

### Spacing Strategy
- **Spacing Scale:** 3 (base unit)
- Use 32px or 48px gaps for content separation
- Extreme whitespace allowed—let the "concrete" breathe

### Grid & Asymmetry
- Embrace asymmetry—allow images to bleed off grid or overlap container edges
- Typography as graphic element—large headings can overlap different colored surface sections
- Rigid, architectural grid reminiscent of exposed concrete formwork

## 6. Do's and Don'ts

### Do:
- Embrace asymmetry and allow images to bleed off the grid
- Use extreme whitespace—let the concrete "breathe"
- Treat typography as a graphic element
- Use tonal gradients from primary to primary-container for hero buttons

### Don't:
- Use border-radius—every element must be sharp 90-degree angle
- Use pure black—always use on-surface or primary for text
- Use standard "Material Design" shadows
- Use icons with rounded ends—opt for sharp, geometric icon sets