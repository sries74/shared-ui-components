# 📚 Shared UI Components - Codebase Analysis

**Generated:** 2025-12-08  
**Repository:** `/home/scott/dev/shared-ui-components`  
**Package:** `@scott/shared-ui-components`

---

## 🎯 Project Overview

This is a **production-ready React component library** built with TypeScript, designed for reusability across multiple projects. The library provides a comprehensive set of UI components with a focus on:

- ✅ **Type Safety** - Full TypeScript support with strict mode
- ♿ **Accessibility** - ARIA labels, keyboard navigation, focus management
- 🎨 **Customization** - CSS variables for theming, flexible props
- 📦 **Tree-shakeable** - ESM and CommonJS exports
- 🚀 **Modern React** - Built with React 18+ hooks and patterns

---

## 🏗️ Architecture

### Build System

**Vite** is used as the build tool with the following configuration:

```typescript
// Library Mode Configuration
{
  entry: 'src/index.ts',
  formats: ['es', 'cjs'],
  externals: ['react', 'react-dom']
}
```

**Key Features:**
- **Dual Format Output:** ESM (`index.esm.js`) and CommonJS (`index.js`)
- **Type Definitions:** Auto-generated `.d.ts` files via `vite-plugin-dts`
- **Peer Dependencies:** React and ReactDOM are externalized
- **CSS Bundling:** Global styles bundled into `dist/style.css`

### Project Structure

```
src/
├── components/          # All UI components organized by category
│   ├── Common/         # Button, SearchBar
│   ├── Forms/          # FormInput, FormSelect, FormTextarea, TagInput
│   ├── DataDisplay/    # Card, Badge, DataTable
│   ├── Navigation/     # Tabs
│   ├── Feedback/       # Toast, LoadingSpinner
│   └── Overlay/        # Modal
├── hooks/              # Reusable React hooks
│   ├── useClickOutside.ts
│   ├── useDebounce.ts
│   ├── useFocusTrap.ts
│   └── useLocalStorage.ts
├── styles/             # Design system
│   ├── global.css      # Global styles and CSS variables
│   ├── tokens.ts       # Design tokens (colors, spacing, typography)
│   └── theme.ts        # Theme configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.ts            # Main entry point
```

---

## 🎨 Design System

### Design Tokens

The library uses a **comprehensive token system** defined in `src/styles/tokens.ts`:

**Color Palette:**
- Primary (Blue): 10 shades from 50-900
- Secondary (Purple): 10 shades
- Success (Green), Error (Red), Warning (Orange), Info (Teal)
- Neutral Grays: 10 shades

**Spacing Scale:**
```typescript
xs: 4px, sm: 8px, md: 12px, base: 16px, 
lg: 24px, xl: 32px, 2xl: 40px, 3xl: 48px, 4xl: 64px
```

**Typography:**
- Font Families: System sans-serif, Monospace
- Font Sizes: xs (12px) → 4xl (36px)
- Font Weights: 400, 500, 600, 700
- Line Heights: tight (1.25), normal (1.5), relaxed (1.75)

**Other Tokens:**
- Border Radius: sm → 2xl + full (9999px)
- Shadows: sm → 2xl + inner
- Transitions: fast (150ms), base (200ms), slow (300ms)
- Z-Index: Layered system from dropdown (1000) to tooltip (1070)

### CSS Architecture

**Global Styles** (`global.css`):
- CSS Custom Properties for theming
- Component-specific styles co-located with components
- BEM-like naming convention (e.g., `btn`, `btn--primary`, `btn__icon`)

---

## 📦 Component Inventory

### ✅ Phase 1: Foundation (Complete)

#### 1. **Button** (`components/Common/Button.tsx`)
- **Variants:** primary, secondary, success, danger, outline, ghost, link
- **Sizes:** sm, md, lg
- **States:** loading, disabled
- **Features:** Full width, left/right icons, ARIA support
- **Dependencies:** None

#### 2. **FormInput** (`components/Forms/FormInput.tsx`)
- **Types:** text, email, password, number, tel, url, search
- **Features:** Validation states, clear button, icons, helper text
- **Accessibility:** ARIA labels, error announcements
- **Dependencies:** Button (for clear button)

#### 3. **Modal** (`components/Overlay/Modal.tsx`)
- **Sizes:** sm, md, lg, xl, full
- **Features:** Focus trap, keyboard navigation (ESC to close), overlay click
- **Sections:** Header, body, footer
- **Accessibility:** ARIA modal, focus management
- **Dependencies:** Button, useFocusTrap hook

#### 4. **Toast** (`components/Feedback/Toast.tsx`)
- **Types:** success, error, warning, info
- **Features:** Auto-dismiss, manual close, action buttons
- **Positions:** 6 positions (top/bottom × left/center/right)
- **API:** Context-based with `useToast()` hook
- **Dependencies:** None

#### 5. **Card** (`components/DataDisplay/Card.tsx`)
- **Variants:** default, outlined, elevated
- **Features:** Header, footer, hoverable, clickable
- **Padding:** none, sm, md, lg
- **Dependencies:** Button (optional)

### ✅ Phase 2: Essential (Complete)

#### 6. **FormTextarea** (`components/Forms/FormTextarea.tsx`)
- **Features:** Auto-resize, character count, min/max rows
- **Extends:** FormInput patterns
- **Dependencies:** FormInput (shared styles)

#### 7. **FormSelect** (`components/Forms/FormSelect.tsx`)
- **Features:** Single/multi-select, searchable, option groups
- **Custom:** Option rendering
- **Dependencies:** FormInput (shared styles), useClickOutside

#### 8. **Badge** (`components/DataDisplay/Badge.tsx`)
- **Variants:** default, primary, success, warning, error, info
- **Sizes:** sm, md, lg
- **Features:** Dot variant, removable
- **Dependencies:** None

#### 9. **LoadingSpinner** (`components/Feedback/LoadingSpinner.tsx`)
- **Variants:** spinner, dots, pulse
- **Sizes:** sm, md, lg
- **Features:** Full page overlay, text label
- **Dependencies:** None

#### 10. **SearchBar** (`components/Common/SearchBar.tsx`)
- **Features:** Debounced search, clear button, loading state
- **Optional:** Recent searches, keyboard shortcuts
- **Dependencies:** FormInput, useDebounce hook

### ✅ Phase 3: Advanced (Complete)

#### 11. **DataTable** (`components/DataDisplay/DataTable.tsx`)
- **Features:** Sortable, filterable, pagination, row selection
- **Custom:** Cell rendering, responsive design
- **Generic:** Type-safe with TypeScript generics
- **Dependencies:** Button, Badge, LoadingSpinner

#### 12. **TagInput** (`components/Forms/TagInput.tsx`)
- **Features:** Add/remove tags, duplicate prevention, max limit
- **Validation:** Custom validation function
- **Autocomplete:** Suggestion support
- **Dependencies:** FormInput, Badge

#### 13. **Tabs** (`components/Navigation/Tabs.tsx`)
- **Variants:** default, pills, underline
- **Orientation:** horizontal, vertical
- **Features:** Keyboard navigation, controlled/uncontrolled
- **Dependencies:** None

---

## 🪝 Custom Hooks

### 1. **useClickOutside** (`hooks/useClickOutside.ts`)
**Purpose:** Detect clicks outside an element  
**Use Cases:** Dropdowns, modals, popovers  
```typescript
useClickOutside(ref, () => setIsOpen(false));
```

### 2. **useFocusTrap** (`hooks/useFocusTrap.ts`)
**Purpose:** Trap focus within a container  
**Use Cases:** Modals, dialogs  
**Features:** Restores focus on unmount

### 3. **useDebounce** (`hooks/useDebounce.ts`)
**Purpose:** Debounce values  
**Use Cases:** Search inputs, API calls  
```typescript
const debouncedValue = useDebounce(searchTerm, 300);
```

### 4. **useLocalStorage** (`hooks/useLocalStorage.ts`)
**Purpose:** Sync state with localStorage  
**Use Cases:** User preferences, form data persistence  
```typescript
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

---

## 📤 Export Strategy

### Main Entry Point (`src/index.ts`)

**Components:**
- Organized by category (Common, Forms, DataDisplay, etc.)
- Both component and type exports
- Tree-shakeable imports

**Example Usage:**
```typescript
import { Button, FormInput, Modal } from '@scott/shared-ui-components';
import type { ButtonProps } from '@scott/shared-ui-components';
```

**Styles:**
```typescript
import '@scott/shared-ui-components/styles';
```

### Package.json Exports

```json
{
  "main": "./dist/index.js",           // CommonJS
  "module": "./dist/index.esm.js",     // ESM
  "types": "./dist/index.d.ts",        // TypeScript
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  }
}
```

---

## 🎭 Demo Application

**Location:** `/demo`  
**Purpose:** Live component showcase and testing

**Features:**
- Vite dev server with HMR
- React Router for navigation
- Network mode for testing on other devices
- Separate package.json (not published)

**Scripts:**
```bash
npm run dev:network  # Access from other devices
npm run preview      # Preview production build
```

---

## 🧪 Testing Strategy

**Test Framework:** Vitest  
**Current Status:** Test infrastructure set up

**Recommended Tests:**
- ✅ Unit tests for each component
- ✅ Accessibility tests (ARIA, keyboard navigation)
- ✅ Hook tests
- ✅ Integration tests for complex components (DataTable, Modal)

---

## 📦 Distribution Options

### Current Status: **Not Published**

### Option 1: npm Registry (Public)
```bash
npm publish --access public
```
**Pros:** Globally accessible, CDN support  
**Cons:** Public visibility

### Option 2: GitHub Packages (Private/Public)
**Setup Required:**
1. Add repository to package.json
2. Configure publishConfig
3. Authenticate with GitHub

**Pros:** Private packages, team access control  
**Cons:** Requires GitHub authentication

### Option 3: npm link (Local Development)
```bash
# In this directory
npm link

# In consuming project
npm link @scott/shared-ui-components
```
**Pros:** Instant updates, no publishing  
**Cons:** Local machine only

### Option 4: Local Path
```json
"dependencies": {
  "@scott/shared-ui-components": "file:../shared-ui-components"
}
```
**Pros:** Simple, version controlled  
**Cons:** Relative paths, not portable

---

## 🔧 Development Workflow

### Building the Library
```bash
npm run build
```
**Output:**
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ESM bundle
- `dist/index.d.ts` - TypeScript definitions
- `dist/style.css` - Bundled styles

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Development Mode
```bash
npm run dev
```

---

## 🎯 Key Design Patterns

### 1. **Composition Over Configuration**
Components accept `children` and render props rather than many boolean flags.

```tsx
<Modal>
  <Modal.Footer>
    <Button>Cancel</Button>
  </Modal.Footer>
</Modal>
```

### 2. **Controlled/Uncontrolled Support**
Components work both ways:
```tsx
// Controlled
<FormInput value={value} onChange={setValue} />

// Uncontrolled
<FormInput defaultValue="initial" />
```

### 3. **Flexible Styling**
All components accept `className` for custom styling:
```tsx
<Button className="custom-button" />
```

### 4. **TypeScript Generics**
Data-driven components use generics:
```tsx
interface User { name: string; email: string; }
<DataTable<User> data={users} columns={columns} />
```

### 5. **Context-Based APIs**
Complex features use React Context:
```tsx
<ToastProvider>
  <App />
</ToastProvider>

// Anywhere in app
const { success } = useToast();
success('Saved!');
```

---

## 🚀 Performance Considerations

### Bundle Size Optimization
- **Tree-shaking:** ESM exports allow unused code elimination
- **External Dependencies:** React/ReactDOM not bundled
- **CSS Extraction:** Separate CSS file for caching

### Runtime Performance
- **React.memo:** Used for expensive components
- **Debouncing:** Built into SearchBar and hooks
- **Virtual Scrolling:** Planned for DataTable with large datasets

---

## ♿ Accessibility Features

### ARIA Support
- Proper roles and labels on all interactive elements
- Live regions for dynamic content (toasts, errors)
- State announcements (loading, disabled)

### Keyboard Navigation
- Full keyboard support for all components
- Focus management in modals and dropdowns
- Tab order preservation

### Focus Management
- Focus trap in modals
- Focus restoration after close
- Visible focus indicators

### Screen Reader Support
- Semantic HTML
- Descriptive labels
- Error announcements

---

## 📊 Component Dependency Graph

```
Button (no deps)
  ├── FormInput
  │   ├── FormTextarea
  │   ├── SearchBar
  │   └── TagInput
  ├── Modal
  ├── Card
  └── DataTable

Toast (no deps)
  └── ToastProvider

Badge (no deps)
  └── TagInput
  └── DataTable

LoadingSpinner (no deps)
  └── DataTable

Tabs (no deps)

Hooks (no deps)
  ├── useDebounce → SearchBar
  ├── useFocusTrap → Modal
  ├── useClickOutside → FormSelect
  └── useLocalStorage
```

---

## 🔮 Future Enhancements

### Phase 4: Layout Components (Planned)
- Layout
- Header
- Sidebar
- Container

### Phase 5: Additional Components (Planned)
- Drawer
- Dropdown
- Pagination
- Breadcrumbs
- TreeView
- EmptyState
- Alert

### Infrastructure Improvements
- Storybook for visual documentation
- Visual regression testing
- Performance benchmarks
- Bundle size tracking

---

## 📝 Best Practices

### For Consumers

1. **Import styles once** in your root component:
   ```tsx
   import '@scott/shared-ui-components/styles';
   ```

2. **Use TypeScript** for full type safety:
   ```tsx
   import type { ButtonProps } from '@scott/shared-ui-components';
   ```

3. **Customize with CSS variables**:
   ```css
   :root {
     --color-primary-500: #your-color;
   }
   ```

4. **Wrap app with providers**:
   ```tsx
   <ToastProvider>
     <App />
   </ToastProvider>
   ```

### For Contributors

1. **Follow naming conventions:** BEM-like CSS, PascalCase components
2. **Export types:** Always export prop interfaces
3. **Document with JSDoc:** Add usage examples
4. **Test accessibility:** Keyboard navigation, screen readers
5. **Keep components focused:** Single responsibility principle

---

## 📚 Resources

- **Plan Document:** `SHARED-UI-COMPONENTS-PLAN.md`
- **README:** `README.md`
- **Demo App:** `/demo`
- **Type Definitions:** `src/types/index.ts`
- **Design Tokens:** `src/styles/tokens.ts`

---

## 🎓 Learning Path

**For New Users:**
1. Read the README for installation and basic usage
2. Explore the demo app to see components in action
3. Check component prop interfaces for customization options
4. Review design tokens for theming

**For Contributors:**
1. Review the project plan (SHARED-UI-COMPONENTS-PLAN.md)
2. Understand the build system (vite.config.ts)
3. Study existing components for patterns
4. Follow the phase-based development approach

---

**Last Updated:** 2025-12-08  
**Status:** Production Ready (Phases 1-3 Complete)  
**Next Steps:** Publish to registry or use locally via npm link
