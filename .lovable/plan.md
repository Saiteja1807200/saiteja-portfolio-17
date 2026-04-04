# Blog Module with Lovable Cloud (Supabase)

## Overview

Add a full blog system to your portfolio with Supabase database, admin panel for creating/editing posts, and public blog pages -- all matching your existing dark theme and design patterns.

## Architecture

```text
/blog          → Blog list (public, grid layout)
/blog/:slug    → Blog detail (public, reading view)
/admin/blog    → Admin panel (password-protected, CRUD)
```

## Step 1: Enable Lovable Cloud + Database Setup

- Enable Lovable Cloud for the project
- Create `blog_posts` table with migration:
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `excerpt` (text)
  - `content` (text -- HTML/markdown)
  - `cover_image_url` (text)
  - `tags` (text array)
  - `published` (boolean, default false)
  - `created_at`, `updated_at` (timestamps)
- Enable RLS: public read for published posts, authenticated write
- Set up Supabase Storage bucket `blog-images` for cover image uploads

## Step 2: Supabase Client Integration

- Add Supabase client config (`src/integrations/supabase/`)
- Create typed queries for blog CRUD operations

## Step 3: Blog Components (in `src/components/blog/`)

- **BlogCard** -- Card with cover image, title, excerpt, tags, date. Uses existing Card component and design tokens
- **BlogList** -- Responsive grid of BlogCards with search bar and tag filter
- **BlogDetail** -- Clean reading layout with proper typography (uses `@tailwindcss/typography` prose classes -- already installed)
- **BlogEditor** -- Form with title, slug (auto-generated), content textarea (rich text via a lightweight editor), image upload, tag input
- **BlogImageUpload** -- Upload to Supabase Storage with preview and compression

## Step 4: Blog Pages (in `src/pages/`)

- `**Blog.tsx**` (`/blog`) -- Navbar + BlogList + Footer, matches existing page structure (same pattern as About.tsx)
- `**BlogPost.tsx**` (`/blog/:slug`) -- Navbar + BlogDetail + Footer
- `**AdminBlog.tsx**` (`/admin/blog`) -- Simple auth gate (Supabase email/password login), then BlogEditor with post list management

## Step 5: Routing + Navigation

- Add routes to `App.tsx` (3 new routes with PageTransition wrapper)
- Add "Blog" link to Navbar's `navLinks` array
- Add Blog link to mobile menu

## Step 6: SEO + Polish

- Dynamic `document.title` per blog post
- Slug-based URLs
- Lazy-loaded cover images
- Pagination on the blog list (load 9 posts per page)
- Sample seed blog post data

## Technical Details

- **Rich text editor**: Will use a simple markdown textarea with preview toggle (keeps bundle small; can upgrade to TipTap later)
- **Image handling**: Upload to Supabase Storage, store public URL in `cover_image_url`
- **Admin auth**: Supabase Auth email/password -- simple login form guards the admin route
- **No backend server needed**: All via Supabase client SDK (database, storage, auth)
- **Existing files modified**: Only `App.tsx` (add routes) and `Navbar.tsx` (add Blog nav link) -- everything else is new files
- - Implement slug auto-generation with uniqueness handling
- - Add draft vs publish workflow (published flag enforced in queries)
- - Define strict RLS policies:
-   - Public read only for published posts
-   - Write access restricted to admin users only
- - Optimize images before upload (resize + compression)
- - Use markdown as content format with preview support
- - Add loading, error, and empty states in UI
- - Implement server-side pagination using Supabase range queries
- - Restrict admin access to specific authorized users
- - Add meta_description field for SEO
- - (Optional) Auto-save drafts in editor

## File Structure

```text
src/
  components/blog/
    BlogCard.tsx
    BlogList.tsx
    BlogDetail.tsx
    BlogEditor.tsx
    BlogImageUpload.tsx
    AdminAuthGate.tsx
  pages/
    Blog.tsx
    BlogPost.tsx
    AdminBlog.tsx
```