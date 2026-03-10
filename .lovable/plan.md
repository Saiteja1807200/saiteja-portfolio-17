

# Use Uploaded Profile Image

The user has uploaded their profile photo directly. I'll copy it to the project's `src/assets/` folder and update both About files to import it locally instead of using the broken GitHub URL.

## Changes

### 1. Copy uploaded image
- Copy `user-uploads://profile.jpg` to `src/assets/profile.jpg`

### 2. `src/components/About.tsx`
- Remove `PROFILE_IMAGE_URL` constant
- Add `import profileImage from '@/assets/profile.jpg'`
- Use `profileImage` as the `src` for the `<img>` tag

### 3. `src/pages/About.tsx`
- Same changes as above

