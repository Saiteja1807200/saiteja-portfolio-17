

# Add Traveling Light Border Effect to Project Cards

## What
Add an animated glowing light that travels along the border of each project card sequentially — card 1 lights up, then card 2, then card 3, and repeats. This creates a "light beam tracing the border" effect.

## How

### 1. Add CSS animation in `src/index.css`
- Define a `@keyframes border-light-travel` animation that rotates a `conic-gradient` around the card (0deg → 360deg)
- Each card gets a staggered `animation-delay` so the light moves from one card to the next sequentially
- The effect uses a pseudo-element (`::before`) with a rotating conic gradient behind the card, masked by the card's own background to show only the border glow

### 2. Update card markup in `src/components/Projects.tsx`
- Wrap each card in a container div with the `border-light` class
- Add `overflow-hidden` and `rounded-2xl` to the wrapper
- The inner card sits on top, leaving a 1-2px gap that reveals the animated gradient border
- Each card gets a CSS variable `--delay` based on its index (e.g., `0s`, `2s`, `4s`) so the light sequentially travels card-to-card

### Technical approach
- **Conic gradient technique**: A `::before` pseudo-element with a spinning conic gradient (transparent → accent color → transparent) creates the illusion of light traveling along the border
- **Sequential animation**: Total cycle = 6s. Card 1 glows at 0-2s, card 2 at 2-4s, card 3 at 4-6s, using `animation-delay` per card
- **Colors**: Each card's light matches its accent color (blue, violet, emerald) via CSS custom properties

