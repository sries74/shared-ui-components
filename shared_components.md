# Shared UI Components Library

A comprehensive, reusable React component library built with TypeScript, providing a consistent design system and user experience across applications.

## Installation

```bash
npm install @scott/shared-ui-components
```

## List Available Components

To see all available components, hooks, and types in the library, run:

```bash
npm run list-components
```

This will display a formatted list of all components organized by category, along with available hooks and TypeScript types.

## Import Syntax

### Basic Import

```typescript
import { ComponentName } from '@scott/shared-ui-components';
```

### Multiple Components

```typescript
import { Button, Card, FormInput, Badge } from '@scott/shared-ui-components';
```

### Import with Types

```typescript
import { Button, type ButtonProps } from '@scott/shared-ui-components';
```

### Import Styles

```typescript
import '@scott/shared-ui-components/dist/style.css';
```

## Import Example

```typescript
import React from 'react';
import { 
  Button, 
  Card, 
  FormInput, 
  Badge,
  type ButtonProps,
  type CardProps 
} from '@scott/shared-ui-components';
import '@scott/shared-ui-components/dist/style.css';

function MyComponent() {
  return (
    <Card>
      <FormInput 
        label="Email" 
        name="email" 
        type="email"
        placeholder="Enter your email"
      />
      <Button variant="primary" size="md">
        Submit
      </Button>
      <Badge variant="success">Active</Badge>
    </Card>
  );
}
```

## Available Components

| Component | Import Name | Category | Description |
|-----------|-------------|----------|-------------|
| Button | `Button` | Common | Versatile button component with multiple variants, sizes, and states |
| SearchBar | `SearchBar` | Common | Search input with debouncing, recent searches, and loading states |
| FormInput | `FormInput` | Forms | Text input with label, error handling, validation states, and icon support |
| FormTextarea | `FormTextarea` | Forms | Multi-line text input with auto-resize, character count, and validation |
| FormSelect | `FormSelect` | Forms | Select dropdown supporting single/multi-select, searchable options, and groups |
| TagInput | `TagInput` | Forms | Tag input for adding/removing tags with validation and autocomplete |
| Card | `Card` | Data Display | Flexible container with optional header and footer sections |
| Badge | `Badge` | Data Display | Small status indicator or label component for tags and notifications |
| DataTable | `DataTable` | Data Display | Data table with sorting, filtering, pagination, and row selection |
| LoadingSpinner | `LoadingSpinner` | Feedback | Loading indicator with multiple variants and sizes |
| ToastProvider | `ToastProvider` | Feedback | Toast notification provider (context) |
| useToast | `useToast` | Feedback | Hook for showing toast notifications |
| Modal | `Modal` | Overlay | Modal dialog with focus trap, keyboard navigation, and portal rendering |
| Tabs | `Tabs` | Navigation | Tab navigation component with keyboard support and multiple variants |

## Component Categories

### Common Components

- **Button**: Primary action buttons with variants (primary, secondary, success, danger, outline, ghost, link)
- **SearchBar**: Search interface with debouncing and recent search history

### Form Components

- **FormInput**: Single-line text input with validation
- **FormTextarea**: Multi-line text input with auto-resize
- **FormSelect**: Dropdown select with single/multi-select support
- **TagInput**: Tag management input with validation

### Data Display Components

- **Card**: Content container with header/footer support
- **Badge**: Status indicators and labels
- **DataTable**: Advanced data table with sorting and filtering

### Feedback Components

- **LoadingSpinner**: Loading indicators for async operations
- **ToastProvider** / **useToast**: Toast notification system

### Overlay Components

- **Modal**: Modal dialogs with accessibility features

### Navigation Components

- **Tabs**: Tab navigation with keyboard support

## TypeScript Support

All components are fully typed with TypeScript. Import types for props:

```typescript
import type { 
  ButtonProps,
  FormInputProps,
  CardProps,
  BadgeProps,
  DataTableProps,
  ModalProps,
  TabsProps
} from '@scott/shared-ui-components';
```

## Styling

The library uses CSS variables for theming. Import the global stylesheet to get the default theme:

```typescript
import '@scott/shared-ui-components/dist/style.css';
```

You can override CSS variables to customize the theme:

```css
:root {
  --color-primary-500: #2196f3;
  --spacing-base: 1rem;
  --radius-md: 0.5rem;
  /* ... more variables */
}
```

## Hooks

The library also exports useful hooks:

| Hook | Import Name | Description |
|------|-------------|-------------|
| useClickOutside | `useClickOutside` | Detect clicks outside an element |
| useFocusTrap | `useFocusTrap` | Trap focus within an element (for modals) |
| useDebounce | `useDebounce` | Debounce a value |
| useLocalStorage | `useLocalStorage` | Sync state with localStorage |

## Usage Notes

- All components are built with accessibility in mind (ARIA labels, keyboard navigation, focus management)
- Components follow a consistent API pattern
- All form components support error states and validation
- Components are fully customizable via props and CSS variables
- The library is tree-shakeable - only import what you need

## Requirements

- React 18.0.0 or higher
- React DOM 18.0.0 or higher

## License

[Your License Here]
