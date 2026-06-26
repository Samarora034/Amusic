---
name: Vivid Sonic
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#e2bfb0'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#a98a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb693'
  primary: '#ffb693'
  on-primary: '#561f00'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#a04100'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#9a9898'
  on-tertiary-container: '#313130'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system is built for a premium, high-fidelity music streaming experience. The brand personality is immersive, energetic, and sophisticated, targeting audiophiles and modern listeners who value aesthetic depth as much as audio quality. 

The visual direction utilizes **Glassmorphism** combined with a **Corporate Modern** underlying structure. This creates a "night mode" atmosphere where content feels layered and ethereal. We leverage deep charcoal surfaces to allow high-quality artist imagery and vibrant accents to pop, evoking the feeling of a high-end physical audio console reimagined for a digital space.

## Colors

The palette is anchored in a deep **Charcoal (#0A0A0B)** to provide a canvas that absorbs light and emphasizes depth. 

- **Primary:** A vibrant Neon Orange (#FF6B00) used for high-priority actions and active states.
- **Secondary:** An Electric Purple (#8B5CF6) used for secondary accents, gradients, and moods.
- **Glass Effects:** Translucent layers are achieved using a highly desaturated white at low opacity (5-10%), paired with a subtle white border to define edges against the dark background.

## Typography

The typographic hierarchy prioritizes impact and clarity. **Montserrat** is utilized for display and headline levels to provide a geometric, bold character that feels premium and "loud." **Inter** is used for all functional and body copy to ensure maximum legibility at smaller scales and during long browsing sessions.

Key headlines use tight letter-spacing to appear more cohesive and architectural. Labels and metadata use uppercase Inter to differentiate secondary information from primary content titles.

## Layout & Spacing

This design system uses a **Fluid Grid** with generous safe margins to create a sense of "breathable" luxury. 

- **Desktop:** 12-column grid with 64px outer margins and 24px gutters. Content is often grouped into large-format cards spanning 3 or 4 columns.
- **Mobile:** 4-column grid with 20px margins. Horizontal scrolling "carousels" are preferred over vertical lists for artist discovery to maximize screen real estate for imagery.
- **Rhythm:** All spacing (padding, margins, gaps) must be a multiple of the 8px base unit to maintain a rigorous mathematical harmony across the interface.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and **Backdrop Blurs**. Rather than traditional black shadows, this system uses:

1.  **Backdrop Filter:** Elements like navigation bars and player controls use `blur(20px)` and a semi-transparent fill to feel as if they are floating above the content.
2.  **Inner Glows:** To simulate high-fidelity hardware, buttons and active cards may use a subtle 1px top-border glow (white at 15% opacity).
3.  **Vignettes:** Artist pages and album views should use deep black vignettes at the edges of imagery to blend seamlessly into the charcoal background.

## Shapes

The shape language is consistently **Rounded**. 

- Standard elements (Cards, Input Fields) use a 0.5rem (8px) radius.
- Large interactive containers and featured artist cards use a 1rem (16px) radius to feel softer and more approachable.
- All circular elements (Play buttons, Avatars) must be true circles (50% radius) to contrast against the grid-based layout.

## Components

### Buttons
- **Primary:** Neon Orange background with Black Inter Bold text. No shadow, but a subtle outer glow on hover.
- **Glass:** Transparent background with a `border_glass` outline and backdrop blur. Used for secondary actions like "View All."

### Cards (Album/Playlist)
- Glassmorphic base with a 1px border. 
- Image aspect ratio is strictly 1:1 for albums and 16:9 for featured banners.
- On hover, the image should scale slightly (1.05x) and the backdrop blur should intensify.

### The Player Bar
- Fixed to the bottom of the viewport.
- Uses a heavy backdrop blur (30px) and a `background_glass` fill.
- The progress bar utilizes the Primary Neon Orange for the active track and a low-opacity Purple for the remaining duration.

### Chips & Tags
- Used for genres (e.g., "Techno", "Jazz"). 
- Pill-shaped with a dark secondary purple background and light purple text for a "neon sign" effect.

### Input Fields
- Darker than the background (#000000) with a 1px `border_glass`. 
- Active state changes the border color to Neon Orange.