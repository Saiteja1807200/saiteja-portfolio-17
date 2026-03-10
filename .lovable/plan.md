

# Fix Profile Image URL

## Problem
The current URL (`https://raw.githubusercontent.com/Saiteja1807200/Assets/main/profile.jpg`) points to a non-existent repository. The actual image is hosted at `saiteja-portfolio-39` repo.

## Correct URL
```
https://raw.githubusercontent.com/Saiteja1807200/saiteja-portfolio-39/main/src/assets/profile.jpg
```

## Changes

### 1. `src/components/About.tsx` (line 7)
Update `PROFILE_IMAGE_URL` constant to the correct URL.

### 2. `src/pages/About.tsx` (line 10)
Update `PROFILE_IMAGE_URL` constant to the correct URL.

Both files already use `PROFILE_IMAGE_URL` for the image source, so only the constant value needs changing.

