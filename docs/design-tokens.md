# Property Eye - Design Tokens

This document outlines the design system for Property Eye, including colors, typography, spacing, and other design tokens.

## Brand Colors

### Primary Colors

#### Deep Navy Blue (`#00072C`)
- **Hex**: `#00072C`
- **Usage**: Primary brand color, headers, navigation, primary buttons
- **CSS Variable**: `--primary`

#### Golden Yellow (`#FFBD09`)
- **Hex**: `#FFBD09`
- **Usage**: Secondary brand color, accents, highlights, CTAs
- **CSS Variable**: `--secondary` / `--accent`

### UI Colors

#### Progress Bar Blue (`#4D66EA`)
- **Hex**: `#4D66EA`
- **Usage**: Progress bars and indicators
- **CSS Class**: `bg-progress` / `text-progress`

### Color System

Colors are defined using Hex codes.

#### Light Theme
```css
--background: #FFFFFF             /* White */
--foreground: #00072C             /* Deep Navy Blue */
--primary: #00072C                /* Deep Navy Blue */
--primary-foreground: #FFFFFF     /* White */
--secondary: #FFBD09              /* Golden Yellow */
--secondary-foreground: #00072C   /* Deep Navy Blue */
```

#### Dark Theme
```css
--background: #00072C             /* Deep Navy Blue */
--foreground: #FFFFFF             /* White */
--primary: #FFBD09                /* Golden Yellow */
--primary-foreground: #00072C     /* Deep Navy Blue */
--secondary: #1E293B              /* Slate 800 */
--secondary-foreground: #FFFFFF   /* White */
```

## Typography

### Font Family
- **Primary Font**: Poppins
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Source**: Google Fonts

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extra Bold**: 800

## Spacing

Using Tailwind's default spacing scale (based on 0.25rem = 4px):

- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)

## Component Colors

### Buttons
- **Primary Button**: `bg-primary` with `text-primary-foreground`
- **Secondary Button**: `bg-secondary` with `text-secondary-foreground`
- **Outline Button**: `border-secondary` with `text-secondary`

### Cards
- **Background**: `bg-card`
- **Foreground**: `text-card-foreground`
- **Border**: `border-border`

### Sidebar
- **Background**: `bg-sidebar` (Deep Navy Blue in both themes)
- **Foreground**: `text-sidebar-foreground` (White)
- **Accent**: `bg-sidebar-accent` (Golden Yellow in light, Lighter Navy in dark)

## Semantic Colors

### Destructive (Error/Danger)
- **Light**: `#EF4444` (Red)
- **Dark**: `#7F1D1D` (Darker Red)

### Muted (Subtle/Disabled)
- **Light**: `#F1F5F9` (Light Gray)
- **Dark**: `#1E293B` (Dark Navy)

### Border/Input
- **Light**: `#E2E8F0` (Light Gray)
- **Dark**: `#1E293B` (Dark Navy)

## Usage in Code

### Tailwind Classes
```tsx
// Primary color
<div className="bg-primary text-primary-foreground">

// Progress Bar
<div className="bg-progress">
```

### CSS Variables
```css
/* Direct usage */
.custom-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

---

*Last Updated: November 21, 2025*
