---
name: Serene Devotion
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#404944'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#202f40'
  on-tertiary: '#ffffff'
  tertiary-container: '#374557'
  on-tertiary-container: '#a3b2c8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d4e4fa'
  tertiary-fixed-dim: '#b9c8de'
  on-tertiary-fixed: '#0d1c2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-sm:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  stack-gap: 16px
  section-gap: 40px
  touch-target: 48px
---

## Brand & Style
The design system is anchored in the concept of *Sakinah* (tranquility). It targets individuals seeking a deeper, more focused connection during prayer. The visual narrative combines **Modern Minimalism** with **Ethno-Spiritual** accents to create a digital sanctuary. 

The aesthetic avoids the "clutter" often found in religious apps, opting instead for a meditative interface that prioritizes focus and intentionality. The emotional response should be one of immediate calm—akin to entering a quiet, well-lit musalla. The style utilizes soft depth, organic layering, and high-quality white space to reduce cognitive load and promote a "flow state" in spiritual practice.

## Colors
The palette is derived from nature and traditional Islamic artistry.
- **Primary (Deep Emerald):** Used for key brand moments, active states, and primary navigation elements. It represents growth and serenity.
- **Secondary (Gold Leaf):** Used sparingly for high-value highlights, achievement states, and spiritual focal points.
- **Background (Parchment/Cream):** A warm, off-white base that is gentler on the eyes than pure white, evoking the feel of high-quality paper or polished stone.
- **Accent (Soft Sage):** Used for secondary containers and subtle categorizations, bridging the gap between the deep green and the light background.

## Typography
The typographic system creates a dialogue between the traditional and the functional. 
- **Headings:** Use *Libre Caslon Text*. Its elegant serifs and classic proportions lend an air of authority and timelessness to spiritual quotes and section titles.
- **Body & Interface:** Use *Manrope*. A modern, highly legible sans-serif that ensures clarity in educational content and flashcards. 
- **Arabic Text:** When rendering Quranic script, use a dedicated Naskh-style font with increased line-height (minimum 2.0) to accommodate diacritics without crowding.

## Layout & Spacing
This design system employs a **fluid-to-fixed layout** optimized for mobile-first usage. The layout relies on generous margins to frame content as if it were a precious manuscript.

- **Margins:** A standard 24px horizontal margin on mobile devices provides "breathing room" and prevents the eye from feeling trapped.
- **Vertical Rhythm:** A strict 8px baseline grid is used. Larger 40px gaps between sections are encouraged to create clear mental "chapters" for the user.
- **Flashcard Layout:** Cards should use a 1:1 or 4:5 aspect ratio with centered content to maximize focus on a single concept at a time.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Ambient Shadows**. 
- **Surface Strategy:** The lowest level is the Parchment background. Interactive elements sit on a Sage-tinted white surface.
- **Shadows:** Use extremely soft, long-spread shadows with a hint of the Primary green in the shadow color (e.g., #064E3B at 4% opacity). This creates an "ethereal lift" rather than a heavy physical drop.
- **Backdrop Blurs:** For overlays and navigation bars, use a high-saturation background blur (20px+) to maintain the sense of depth without losing the meditative context of the screen behind it.

## Shapes
The shape language is organic and inviting. 
- **Corners:** Use `rounded-2xl` (1.5rem / 24px) for primary containers and cards. This high degree of rounding removes visual tension and mimics the soft architecture often found in modern Islamic design.
- **Buttons:** Buttons are fully pill-shaped to denote comfort and ease of interaction.
- **Decorative Motifs:** Geometric patterns should be subtle, used only as low-opacity masks within containers, never as foreground elements.

## Components
- **Buttons:** Primary buttons use the Deep Emerald fill with White or Gold text. Secondary buttons are outlined in Sage with a transparent fill.
- **Flashcards:** Large-format cards with `rounded-2xl` corners. Use a subtle Gold top-border (2px) to signify a "Premium" or "Featured" lesson. Text inside must be center-aligned with `body-lg`.
- **Progress Indicators:** Use thin, elegant lines in Gold to show completion. Avoid chunky progress bars.
- **Lists:** Items should be separated by generous whitespace rather than hard lines. Use a small geometric "dot" or icon for bullet points.
- **Input Fields:** Soft cream background with a subtle Deep Emerald bottom border on focus. No heavy boxes.
- **Prayer Timer/Focus Component:** A circular ring with a slow, pulsating glow (Gold) to indicate an active session, helping the user breathe and focus.