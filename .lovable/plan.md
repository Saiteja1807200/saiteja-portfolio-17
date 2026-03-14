

## Plan: Open Project Modal Directly from Dropdown

Currently, clicking a project in the dropdown just scrolls to the projects section. The fix is to pass the selected project ID via React Router state and have the Projects component read it to auto-expand the modal.

### Changes

**1. `src/components/Navbar.tsx`**
- When a specific project is clicked, navigate with `state: { scrollTo: 'projects', expandProject: item.id }`
- If already on `/`, dispatch a custom event or use a shared mechanism to set the expanded project

**2. `src/pages/Index.tsx`**
- Read `location.state` for `scrollTo` and `expandProject`
- Scroll to projects section and pass `expandProject` as a prop to `<Projects />`

**3. `src/components/Projects.tsx`**
- Accept an optional `initialExpandedId` prop
- Use it to set the initial `expandedId` state, so the modal opens automatically
- Also scroll the projects section into view when this prop is set

### Flow
1. User clicks "Home Hero" in dropdown
2. Navbar navigates to `/` with state `{ scrollTo: 'projects', expandProject: 1 }`
3. Index reads state, scrolls to `#projects`, passes `expandProject` to Projects
4. Projects component sets `expandedId = 1`, modal opens immediately

