

# Fix White Flash on Hero & Broken Links Between Pages

## Issues Identified

1. **White blank screen on Hero (2 seconds)**: The Aurora WebGL component takes time to initialize (creating renderer, compiling shaders, first frame). During this time, the hero section has no background, showing a white/blank area. Additionally, all hero content uses `initial={{ opacity: 0 }}` animations that take 0.3-0.5s with staggered delays up to 0.3s.

2. **Links breaking when switching pages**: The Hero "Get In Touch" button uses `<a href="/contact">` instead of React Router's `<Link to="/contact">`. This causes a full page reload instead of client-side navigation, breaking the SPA routing and AnimatePresence transitions.

## Plan

### 1. Fix Hero links to use React Router
In `src/components/Hero.tsx`:
- Import `Link` from `react-router-dom`
- Change `<a href="/contact">` to `<Link to="/contact">`
- Keep the external resume link as `<a>` (it's correct since it opens externally)

### 2. Fix white flash on Hero section
In `src/components/Hero.tsx`:
- Add a dark background color to the hero section (`bg-background`) so the area isn't blank white while Aurora initializes
- Set the Aurora container div to have a matching background as fallback

In `src/components/Aurora.tsx`:
- No changes needed; adding a CSS background fallback on the parent is sufficient

### 3. Reduce initial animation delay
- Keep animations but they're fine as-is; the main flash is from the missing background color, not the animation delays

