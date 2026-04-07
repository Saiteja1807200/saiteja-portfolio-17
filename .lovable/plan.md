## Plan: Add "Request Access" Feature for Portfolio Images

### Overview

Replace the static "Request access from Saiteja" text with an interactive request form. Visitors enter their company name, their name and optional message. Requests are stored in the database and visible in the admin panel, where you can approve them by generating an access link.

### Database Changes

- **New table `access_requests**`: `id`, `name` (text, required), `email` (text, required), `message` (text, nullable), `status` (text, default 'pending' — values: pending/approved/rejected), `created_at`
- **RLS policies**: anon can INSERT (submit requests); authenticated can SELECT, UPDATE (manage requests)

### UI Changes

1. **Request Access Dialog** — New `RequestAccessDialog` component:
  - Triggered by a "Request Access" button shown on the blurred image overlay (both `About.tsx` component and `About.tsx` page)
  - Dialog with company name, optional message fields
  - Inserts into `access_requests` table (no auth needed)
  - Shows success confirmation after submission
2. **Admin Panel — Access Requests Tab**:
  - Add a third tab "Requests" in `/admin/blog` alongside Blog and Access Links
  - Lists pending requests with name, email, message, date
  - "Approve" button generates an access token (with the requester's name as label) and changes status to approved
  - "Reject" button marks as rejected
  - Badge showing count of pending requests

### Files to Create/Modify

- **Create**: `src/components/RequestAccessDialog.tsx`
- **Create**: `src/components/admin/AccessRequestManager.tsx`
- **Create**: Migration for `access_requests` table
- **Modify**: `src/components/About.tsx` — add Request Access button in locked overlay
- **Modify**: `src/pages/About.tsx` — add Request Access button in locked overlay
- **Modify**: `src/pages/AdminBlog.tsx` — add Requests tab