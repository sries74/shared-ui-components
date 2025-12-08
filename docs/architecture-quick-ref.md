# 🏗️ Architecture Quick Reference

## 📦 Package Structure

```
@scott/shared-ui-components
│
├── 📤 EXPORTS
│   ├── index.js (CommonJS)
│   ├── index.esm.js (ESM)
│   ├── index.d.ts (TypeScript)
│   └── style.css (Styles)
│
├── 🎨 DESIGN SYSTEM
│   ├── Tokens (colors, spacing, typography)
│   ├── CSS Variables (theming)
│   └── Global Styles
│
├── 🧩 COMPONENTS (13 total)
│   │
│   ├── Common (2)
│   │   ├── Button ⭐
│   │   └── SearchBar
│   │
│   ├── Forms (4)
│   │   ├── FormInput ⭐
│   │   ├── FormTextarea
│   │   ├── FormSelect
│   │   └── TagInput
│   │
│   ├── DataDisplay (3)
│   │   ├── Card ⭐
│   │   ├── Badge
│   │   └── DataTable
│   │
│   ├── Navigation (1)
│   │   └── Tabs
│   │
│   ├── Feedback (2)
│   │   ├── Toast ⭐ (with Provider)
│   │   └── LoadingSpinner
│   │
│   └── Overlay (1)
│       └── Modal ⭐
│
└── 🪝 HOOKS (4)
    ├── useClickOutside
    ├── useFocusTrap
    ├── useDebounce
    └── useLocalStorage

⭐ = Foundation component (no dependencies)
```

---

## 🔄 Build Pipeline

```
┌─────────────────┐
│   src/index.ts  │  Entry Point
└────────┬────────┘
         │
    ┌────▼────┐
    │  Vite   │  Build Tool
    └────┬────┘
         │
    ┌────▼────────────────────────┐
    │  vite-plugin-dts            │  TypeScript Definitions
    │  @vitejs/plugin-react       │  React Transform
    └────┬────────────────────────┘
         │
    ┌────▼─────────────────────────┐
    │         dist/                │
    │  ├── index.js (CJS)          │
    │  ├── index.esm.js (ESM)      │
    │  ├── index.d.ts (Types)      │
    │  └── style.css (Styles)      │
    └──────────────────────────────┘
```

---

## 🎯 Component Dependency Tree

```
Level 0 (No Dependencies)
├── Button
├── Toast
├── Badge
├── LoadingSpinner
├── Tabs
└── All Hooks

Level 1 (Depends on Level 0)
├── FormInput (→ Button)
├── Modal (→ Button, useFocusTrap)
└── Card (→ Button optional)

Level 2 (Depends on Level 1)
├── FormTextarea (→ FormInput)
├── FormSelect (→ FormInput, useClickOutside)
├── SearchBar (→ FormInput, useDebounce)
└── TagInput (→ FormInput, Badge)

Level 3 (Depends on Level 2)
└── DataTable (→ Button, Badge, LoadingSpinner)
```

---

## 📥 Import Patterns

### Consumer Usage

```typescript
// 1. Import components
import { 
  Button, 
  FormInput, 
  Modal, 
  useToast 
} from '@scott/shared-ui-components';

// 2. Import types
import type { 
  ButtonProps, 
  ModalSize 
} from '@scott/shared-ui-components';

// 3. Import styles (once in root)
import '@scott/shared-ui-components/styles';
```

### Internal Structure

```typescript
// src/index.ts exports from:
export { Button } from './components/Common';
export { FormInput } from './components/Forms';
export { Modal } from './components/Overlay';
// etc...

// Each category has index.ts:
// components/Common/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

## 🎨 Theming System

```
CSS Variables (global.css)
    ↓
Design Tokens (tokens.ts)
    ↓
Component Styles (*.css)
    ↓
Component Props (variant, size, etc.)
```

### Override Hierarchy

```css
/* 1. Default tokens */
:root {
  --color-primary-500: #2196f3;
}

/* 2. User overrides */
:root {
  --color-primary-500: #your-color;
}

/* 3. Component-specific */
.btn--primary {
  background: var(--color-primary-500);
}

/* 4. Custom className */
.my-custom-button {
  /* Your styles */
}
```

---

## 🚀 Usage Flow

```
1. Install Package
   npm install @scott/shared-ui-components
   
2. Setup Providers (if needed)
   <ToastProvider>
     <App />
   </ToastProvider>
   
3. Import Styles
   import '@scott/shared-ui-components/styles';
   
4. Use Components
   <Button variant="primary">Click</Button>
   
5. Customize Theme (optional)
   :root { --color-primary-500: #custom; }
```

---

## 📊 File Size Breakdown

```
dist/
├── index.esm.js      ~XX KB (tree-shakeable)
├── index.js          ~XX KB (CommonJS)
├── index.d.ts        ~XX KB (types)
└── style.css         ~XX KB (all styles)

Note: Run 'npm run build' to see actual sizes
```

---

## 🔍 Quick Component Lookup

| Component | Category | Key Features | Dependencies |
|-----------|----------|--------------|--------------|
| Button | Common | Variants, sizes, loading | None |
| FormInput | Forms | Validation, icons, clear | Button |
| Modal | Overlay | Focus trap, keyboard nav | Button, useFocusTrap |
| Toast | Feedback | Auto-dismiss, positions | None (Provider) |
| Card | DataDisplay | Header/footer, hoverable | Button (opt) |
| FormTextarea | Forms | Auto-resize, char count | FormInput |
| FormSelect | Forms | Search, multi-select | FormInput, useClickOutside |
| Badge | DataDisplay | Variants, removable | None |
| LoadingSpinner | Feedback | Variants, full page | None |
| SearchBar | Common | Debounce, recent searches | FormInput, useDebounce |
| DataTable | DataDisplay | Sort, filter, paginate | Button, Badge, LoadingSpinner |
| TagInput | Forms | Add/remove, validate | FormInput, Badge |
| Tabs | Navigation | Variants, keyboard nav | None |

---

## 🎓 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build library
npm run preview      # Preview build

# Quality
npm test             # Run tests
npm run lint         # Lint code

# Demo
cd demo
npm run dev:network  # Demo on network
```

---

## 📝 Checklist for New Components

- [ ] Create component file in appropriate category
- [ ] Define TypeScript interface for props
- [ ] Add JSDoc comments with examples
- [ ] Create accompanying CSS file
- [ ] Export from category index.ts
- [ ] Export from main index.ts
- [ ] Add to README.md
- [ ] Write tests
- [ ] Update this documentation
