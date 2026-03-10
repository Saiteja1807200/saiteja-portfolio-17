

## Issues Identified

1. **Accent gradient bar still showing** on the expanded card (line 213) — needs to be removed
2. **Layout animation glitch** — when a card expands, `layoutId` causes the card placeholder in the grid to visually transition/morph, showing an awkward background shift
3. **Light effect needs more intensity** — brighter glow and a shadow behind cards
4. **Smoother open/close transitions** needed

## Plan

### 1. Remove the accent gradient bar from expanded card (`src/components/Projects.tsx`)
- Delete line 213: `<div className={cn('absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r', selectedProject.accentColor)} />`

### 2. Fix layout transition glitch — stop using `layoutId`
The `layoutId` shared layout animation causes the card background to visually morph between positions, creating the unwanted transition artifact. Replace with a simple scale/fade animation:
- Remove `layoutId` from both the card (line 131) and the expanded card (line 200)
- Use standard `initial`/`animate`/`exit` props on the expanded card for a smooth scale+fade entrance/exit
- The card in the grid should no longer hide with `opacity-0` — just keep it visible behind the overlay

### 3. Make light effect more intense (`src/index.css`)
- Increase the light arc size in the conic gradient (from 15% to ~25% of the circle)
- Increase default opacity from 0.7 to 0.85, hover to 1
- Add `box-shadow` glow matching each card's `--light-color` to `.border-light-wrapper`
- Add a subtle animated glow shadow: `box-shadow: 0 0 20px var(--light-color)` with reduced opacity

### 4. Smoother expanded card transitions (`src/components/Projects.tsx`)
- Expanded card: `initial={{ opacity: 0, scale: 0.92 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0, scale: 0.92 }}`
- Use `transition={{ duration: 0.3, ease: 'easeOut' }}`
- Backdrop: slightly longer fade duration (0.3s)

