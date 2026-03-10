

## Changes

### 1. Make light always visible and slow-moving (`src/index.css`)
- Remove the `border-pulse` animation — the light should always be visible (opacity always 1), not fading in/out sequentially
- Slow down `border-spin` from 6s to ~8s for a slower, more elegant travel
- Set opacity to a constant value (e.g., 0.7 default, 1 on hover)
- Add `.border-light-wrapper:hover::before { opacity: 1; }` for brighter glow on hover

### 2. Remove the accent gradient bar on top of cards (`src/components/Projects.tsx`)
- Delete line 145: the `<div>` with `absolute top-0 ... h-1 rounded-b-full bg-gradient-to-r` — this is the colored line at the top of each card

