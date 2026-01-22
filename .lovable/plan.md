
# Plan: Replace All Profile Images Globally

## Overview
This plan will replace your existing profile image (`saiteja-profile.jpg`) with your newly uploaded photo across all sections of the website, maintaining proper alt text "Saiteja Akinepelli" and preserving existing styling and accessibility attributes.

---

## Profile Image Locations Identified

I found profile images in the following locations:

| File | Line | Current Usage |
|------|------|---------------|
| `src/components/About.tsx` | 6, 89-92 | Imports and displays profile image in About section on homepage |
| `src/pages/About.tsx` | 8, 91-94 | Imports and displays profile image on /about page |
| `src/components/Contact.tsx` | 5 | Imports profile image (currently unused in component) |

**Note:** No CSS `background-image` profile images were found. No other profile/avatar images exist in the codebase.

---

## Implementation Steps

### Step 1: Copy New Profile Photo to Project Assets

**Action:** Copy the uploaded image to replace the existing profile photo

```
Source: user-uploads://saiteja_photo-3.jpg
Destination: src/assets/saiteja-profile.jpg
```

This will overwrite the existing file, so all components already importing from this path will automatically use the new image.

### Step 2: Verify Image References (No Code Changes Required)

Since all components already import from `@/assets/saiteja-profile.jpg`, no code changes are needed. The import statements are already correct:

**src/components/About.tsx (line 6):**
```tsx
import profileImage from '@/assets/saiteja-profile.jpg';
```

**src/pages/About.tsx (line 8):**
```tsx
import profileImage from '@/assets/saiteja-profile.jpg';
```

**src/components/Contact.tsx (line 5):**
```tsx
import profileImage from '@/assets/saiteja-profile.jpg';
```

### Step 3: Verify Alt Text (Already Correct)

Both image elements already have the proper alt text:

**src/components/About.tsx (line 91):**
```tsx
alt="Saiteja Akinepelli"
```

**src/pages/About.tsx (line 93):**
```tsx
alt="Saiteja Akinepelli"
```

---

## What Will Be Preserved

- Original image dimensions and aspect ratios
- Responsive behavior (`object-cover`, `aspect-[4/5]`)
- CSS styling and effects (gradient overlays, shadows)
- Accessibility attributes (alt text)
- Framer Motion animations
- Layout structure

---

## Files to be Modified

| File | Action |
|------|--------|
| `src/assets/saiteja-profile.jpg` | Replace with new uploaded photo |

---

## Technical Notes

- The existing `.jpg` filename will be used (not `.png`) to maintain compatibility with current imports
- No code changes are required since all imports already point to the correct asset path
- The new image will be bundled and optimized by Vite during build
- All three files that import the profile image will automatically use the new photo once the asset is replaced
