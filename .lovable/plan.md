

## Plan: Add Projects Dropdown Menu to Navbar

### 1. Add Projects Dropdown to Navbar (`src/components/Navbar.tsx`)
- Import dropdown menu components and ChevronDown icon
- Replace the flat navLinks array with a structure supporting dropdowns
- Add a "Projects" dropdown menu item containing:
  - Link to scroll to Projects section on home page
  - Links for individual projects (Home Hero, Number Plate Recognition, Recruitment Fraud Detection) that navigate to home page and open project modal
- Keep other nav items (Home, About, Resume, Contact) as regular links
- Style dropdown to match existing navbar design with hover effects

### Implementation Approach
- Use `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` components
- Dropdown trigger shows "Projects" with a chevron icon
- Clicking "Projects" section link scrolls to `#projects` on home page
- Clicking individual project links navigates to `/` and passes state to auto-expand that project modal
- Mobile menu will show Projects as a collapsible section or simple link

### Files to Modify
- `src/components/Navbar.tsx` - Add dropdown menu for Projects

