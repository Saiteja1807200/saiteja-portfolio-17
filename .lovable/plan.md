

## Problem

The project cards appear with a light gray/white background because the site doesn't have `class="dark"` on the `<html>` element. The CSS variable `--card` in light mode is pure white (`0 0% 100%`), so `bg-card/50` renders as semi-transparent white — clashing with the dark-themed portfolio.

Additionally, the Projects section needs to be moved above the Skills section in the page layout.

## Plan

### 1. Fix card styling to match dark theme
In `src/components/Projects.tsx`:
- Replace `bg-card/50 backdrop-blur-sm` on cards with dark-themed classes: `bg-white/5 backdrop-blur-sm` (subtle dark glass effect)
- Update the expanded card overlay from `bg-card` to `bg-background border-white/10` so it also stays dark
- Update Badge classes from `bg-secondary/80` to `bg-white/10 text-foreground/80 border-white/10` for consistent dark appearance
- Update close button and other secondary background references similarly

### 2. Move Projects above Skills
In `src/pages/Index.tsx`:
- Reorder: `<Projects />` before `<Skills />` (swap lines 28-29)

