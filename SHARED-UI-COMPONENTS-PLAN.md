# Shared UI Components Library - Project Plan

## Overview

A reusable React component library built with TypeScript, designed to be used across multiple projects. Components are built with reusability, accessibility, and customization as core principles.

## Project Structure

```
shared-ui-components/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Container.tsx
│   │   │   └── index.ts
│   │   ├── Forms/
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormTextarea.tsx
│   │   │   ├── FormSelect.tsx
│   │   │   ├── FormCheckbox.tsx
│   │   │   ├── FormRadio.tsx
│   │   │   ├── TagInput.tsx
│   │   │   ├── FormField.tsx
│   │   │   └── index.ts
│   │   ├── DataDisplay/
│   │   │   ├── DataTable.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── TreeView.tsx
│   │   │   ├── List.tsx
│   │   │   └── index.ts
│   │   ├── Feedback/
│   │   │   ├── Toast.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── index.ts
│   │   ├── Navigation/
│   │   │   ├── Pagination.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── index.ts
│   │   ├── Overlay/
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── index.ts
│   │   └── Common/
│   │       ├── Button.tsx
│   │       ├── SearchBar.tsx
│   │       ├── Icon.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useClickOutside.ts
│   │   └── index.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── index.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   ├── tokens.ts
│   │   └── global.css
│   └── index.ts
├── stories/                    # Storybook stories (optional)
├── tests/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .npmrc
└── README.md
```

## Tech Stack

- **React 18+** - Component framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** (optional) - Styling, or CSS Modules
- **Vitest** - Testing
- **Storybook** (optional) - Component documentation

## Component Build Priority

### Phase 1: Foundation Components (Build First)

These are the most basic, reusable components that other components depend on.

#### 1. Button
**Priority: CRITICAL**  
**Dependencies: None**

**Specifications:**
- Variants: `primary`, `secondary`, `success`, `danger`, `outline`, `ghost`, `link`
- Sizes: `sm`, `md`, `lg`
- States: `default`, `loading`, `disabled`
- Full width option
- Icon support (left/right)
- TypeScript: Full type safety with variants

**Props Interface:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

**Reusability Features:**
- Accepts className for custom styling
- All variants accessible via props
- Composable with icons
- Works in forms and standalone

**Example Usage:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button variant="danger" isLoading={isSubmitting}>
  Delete
</Button>
```

---

#### 2. FormInput
**Priority: CRITICAL**  
**Dependencies: Button (for clear button)**

**Specifications:**
- Text input with label, error, and helper text
- Validation states: `default`, `error`, `success`
- Types: `text`, `email`, `password`, `number`, `tel`, `url`, `search`
- Clear button option
- Icon support (left/right)
- Controlled and uncontrolled modes
- Accessibility: ARIA labels, error announcements

**Props Interface:**
```typescript
interface FormInputProps {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
}
```

**Reusability Features:**
- Works with any form library (React Hook Form, Formik, etc.)
- Flexible validation (controlled externally)
- Customizable styling
- Accessible by default

**Example Usage:**
```tsx
<FormInput
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>

<FormInput
  label="Search"
  name="search"
  type="search"
  leftIcon={<SearchIcon />}
  showClearButton
  onClear={() => setSearch('')}
/>
```

---

#### 3. Modal
**Priority: HIGH**  
**Dependencies: Button**

**Specifications:**
- Controlled component (open/close state)
- Size variants: `sm`, `md`, `lg`, `xl`, `full`
- Close on overlay click option
- Close on escape key
- Focus trap inside modal
- Scrollable content area
- Header, body, footer sections
- Accessibility: ARIA modal, focus management

**Props Interface:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
```

**Reusability Features:**
- Flexible content (header, body, footer)
- Works for dialogs, forms, confirmations
- Customizable size and behavior
- Portal-based (renders outside DOM hierarchy)

**Example Usage:**
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Delete"
  size="md"
>
  <p>Are you sure you want to delete this item?</p>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal>
```

---

#### 4. Toast
**Priority: HIGH**  
**Dependencies: None**

**Specifications:**
- Types: `success`, `error`, `warning`, `info`
- Auto-dismiss with configurable duration
- Manual dismiss option
- Stack multiple toasts
- Position: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`
- Animation: Slide in/out
- Icon support per type

**Props Interface:**
```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // milliseconds, 0 = no auto-dismiss
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Toast Provider/Context
interface ToastContextType {
  showToast: (props: ToastProps) => void;
  success: (message: string, options?: Partial<ToastProps>) => void;
  error: (message: string, options?: Partial<ToastProps>) => void;
  warning: (message: string, options?: Partial<ToastProps>) => void;
  info: (message: string, options?: Partial<ToastProps>) => void;
}
```

**Reusability Features:**
- Context-based API (easy to use anywhere)
- Configurable positioning
- Works for all notification needs
- Non-blocking UI

**Example Usage:**
```tsx
// Setup provider
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Use anywhere
const { success, error } = useToast();

success('Item saved successfully!');
error('Failed to save item', { duration: 5000 });
```

---

#### 5. Card
**Priority: HIGH**  
**Dependencies: Button (optional, for actions)**

**Specifications:**
- Header, body, footer sections
- Hover effects option
- Clickable option
- Border and shadow variants
- Padding variants

**Props Interface:**
```typescript
interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Reusability Features:**
- Flexible content structure
- Works for lists, dashboards, content display
- Composable with other components

**Example Usage:**
```tsx
<Card
  header={<h3>Rule Name</h3>}
  footer={<Button>View Details</Button>}
  hoverable
>
  <p>Rule description...</p>
</Card>
```

---

### Phase 2: Essential Components

#### 6. FormTextarea
**Priority: HIGH**  
**Dependencies: FormInput (shared styles/patterns)**

**Specifications:**
- Similar to FormInput but for multi-line text
- Auto-resize option
- Character count option
- Min/max rows

**Props Interface:**
```typescript
interface FormTextareaProps extends Omit<FormInputProps, 'type'> {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}
```

---

#### 7. FormSelect
**Priority: HIGH**  
**Dependencies: FormInput (shared styles)**

**Specifications:**
- Single and multi-select
- Searchable option
- Option groups
- Custom option rendering
- Clear button

**Props Interface:**
```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

interface FormSelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  value?: string | number | (string | number)[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string | number | (string | number)[]) => void;
}
```

---

#### 8. Badge
**Priority: MEDIUM**  
**Dependencies: None**

**Specifications:**
- Variants: `default`, `primary`, `success`, `warning`, `error`, `info`
- Sizes: `sm`, `md`, `lg`
- Dot variant (for notifications)
- Removable option

**Props Interface:**
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}
```

---

#### 9. LoadingSpinner
**Priority: MEDIUM**  
**Dependencies: None**

**Specifications:**
- Sizes: `sm`, `md`, `lg`
- Variants: `spinner`, `dots`, `pulse`
- Full page overlay option
- With text option

**Props Interface:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  fullPage?: boolean;
  text?: string;
  className?: string;
}
```

---

#### 10. SearchBar
**Priority: MEDIUM**  
**Dependencies: FormInput, useDebounce hook**

**Specifications:**
- Debounced search
- Clear button
- Loading state
- Recent searches (optional)
- Keyboard shortcuts

**Props Interface:**
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  showRecentSearches?: boolean;
  onSearch?: (value: string) => void;
  className?: string;
}
```

---

### Phase 3: Advanced Components

#### 11. DataTable
**Priority: MEDIUM**  
**Dependencies: Button, Badge, LoadingSpinner**

**Specifications:**
- Sortable columns
- Filterable columns
- Pagination
- Row selection
- Custom cell rendering
- Responsive
- Virtual scrolling (for large datasets)

**Props Interface:**
```typescript
interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => any;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string | number;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>;
  loading?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  pagination?: {
    pageSize: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
  };
}
```

---

#### 12. TagInput
**Priority: MEDIUM**  
**Dependencies: FormInput, Badge**

**Specifications:**
- Add tags on Enter
- Remove tags
- Duplicate prevention
- Max tags limit
- Autocomplete suggestions
- Validation

**Props Interface:**
```typescript
interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  suggestions?: string[];
  validate?: (tag: string) => boolean | string;
  className?: string;
}
```

---

#### 13. Tabs
**Priority: MEDIUM**  
**Dependencies: None**

**Specifications:**
- Controlled and uncontrolled
- Variants: `default`, `pills`, `underline`
- Vertical tabs option
- Keyboard navigation

**Props Interface:**
```typescript
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  orientation?: 'horizontal' | 'vertical';
}
```

---

### Phase 4: Layout Components

#### 14. Layout
**Priority: MEDIUM**  
**Dependencies: Header, Sidebar**

**Specifications:**
- Header, sidebar, main content areas
- Responsive sidebar (collapsible on mobile)
- Fixed or sticky header
- Customizable layout areas

---

#### 15. Sidebar
**Priority: MEDIUM**  
**Dependencies: None**

**Specifications:**
- Collapsible
- Responsive (drawer on mobile)
- Menu items with icons
- Active state
- Nested menus

---

### Phase 5: Hooks

#### useDebounce
**Priority: HIGH**  
**Purpose:** Debounce values for search, API calls

```typescript
function useDebounce<T>(value: T, delay: number): T;
```

#### useApi
**Priority: HIGH**  
**Purpose:** Handle API calls with loading/error states

```typescript
function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies?: any[]
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};
```

#### useLocalStorage
**Priority: MEDIUM**  
**Purpose:** Sync state with localStorage

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void];
```

#### useClickOutside
**Priority: MEDIUM**  
**Purpose:** Detect clicks outside element (for dropdowns, modals)

```typescript
function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void
): void;
```

---

## Reusability Guidelines

### 1. Props Design
- **Accept className**: Always allow custom styling via className prop
- **Composition over configuration**: Prefer children and render props over many boolean flags
- **Controlled/Uncontrolled**: Support both patterns where applicable
- **Default values**: Provide sensible defaults for all optional props

### 2. TypeScript
- **Full type safety**: Export all prop interfaces
- **Generic components**: Use generics for data-driven components (DataTable, List)
- **Type inference**: Make types infer correctly from usage

### 3. Styling
- **CSS Variables**: Use CSS variables for theming
- **No hardcoded colors**: All colors should come from theme
- **Responsive by default**: Mobile-first approach
- **Accessibility**: Proper contrast ratios, focus states

### 4. Accessibility
- **ARIA attributes**: Proper ARIA labels and roles
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Proper focus trapping and restoration
- **Screen reader support**: Semantic HTML and announcements

### 5. Performance
- **Memoization**: Use React.memo for expensive components
- **Lazy loading**: Support code splitting
- **Virtual scrolling**: For large lists/tables
- **Debouncing**: Built-in for search/input components

### 6. Documentation
- **JSDoc comments**: Document all props and methods
- **Examples**: Provide usage examples
- **Storybook**: Visual documentation (optional but recommended)

## Development Workflow

### 1. Setup
```bash
npm create vite@latest shared-ui-components -- --template react-ts
cd shared-ui-components
npm install
```

### 2. Build Order
1. Set up project structure
2. Create theme/styling system
3. Build Phase 1 components (Button, FormInput, Modal, Toast, Card)
4. Test each component
5. Build Phase 2 components
6. Continue through phases

### 3. Testing
- Unit tests for each component
- Accessibility tests
- Visual regression tests (optional)

### 4. Publishing
- Version using semantic versioning
- Publish to GitHub Packages
- Update changelog

## Package.json Configuration

```json
{
  "name": "@yourusername/shared-ui-components",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": [
    "dist"
  ],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## Next Steps

1. Initialize project on VPS
2. Set up project structure
3. Configure build tools (Vite, TypeScript)
4. Create theme/styling system
5. Build Phase 1 components
6. Test and document
7. Publish to GitHub Packages

