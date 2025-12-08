# Shared UI Components Library

A reusable React component library built with TypeScript, designed to be used across multiple projects. Components are built with reusability, accessibility, and customization as core principles.

## Features

- 🎨 **Fully typed** with TypeScript
- ♿ **Accessible** by default (ARIA labels, keyboard navigation, focus management)
- 🎯 **Customizable** via props and CSS variables
- 📦 **Tree-shakeable** exports
- 🎭 **Themeable** with CSS variables
- 🚀 **Modern** React 18+ with hooks

## Installation

```bash
npm install @scott/shared-ui-components
```

## Usage

### Basic Setup

```tsx
import { ToastProvider } from '@scott/shared-ui-components';
import '@scott/shared-ui-components/styles';

function App() {
  return (
    <ToastProvider position="top-right">
      {/* Your app content */}
    </ToastProvider>
  );
}
```

**Note:** The styles are automatically included when you import components, but you can also import them separately if needed.

### Components

#### Button

```tsx
import { Button } from '@scott/shared-ui-components';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button variant="danger" isLoading={isSubmitting}>
  Delete
</Button>
```

#### FormInput

```tsx
import { FormInput } from '@scott/shared-ui-components';

<FormInput
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

#### Modal

```tsx
import { Modal, Button } from '@scott/shared-ui-components';

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

#### Toast

```tsx
import { useToast } from '@scott/shared-ui-components';

function MyComponent() {
  const { success, error } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Item saved successfully!');
    } catch (err) {
      error('Failed to save item', { duration: 5000 });
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

#### Card

```tsx
import { Card, Button } from '@scott/shared-ui-components';

<Card
  header={<h3>Rule Name</h3>}
  footer={<Button>View Details</Button>}
  hoverable
>
  <p>Rule description...</p>
</Card>
```

#### FormTextarea

```tsx
import { FormTextarea } from '@scott/shared-ui-components';

<FormTextarea
  label="Description"
  name="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  autoResize
  showCharCount
  maxLength={500}
/>
```

#### FormSelect

```tsx
import { FormSelect } from '@scott/shared-ui-components';

<FormSelect
  label="Country"
  name="country"
  options={countries}
  value={selectedCountry}
  onChange={(value) => setSelectedCountry(value)}
  searchable
/>
```

#### Badge

```tsx
import { Badge } from '@scott/shared-ui-components';

<Badge variant="success">Active</Badge>
<Badge variant="error" removable onRemove={() => console.log('removed')}>
  New
</Badge>
```

#### LoadingSpinner

```tsx
import { LoadingSpinner } from '@scott/shared-ui-components';

<LoadingSpinner size="md" variant="spinner" />
<LoadingSpinner fullPage text="Loading..." />
```

#### SearchBar

```tsx
import { SearchBar } from '@scott/shared-ui-components';

<SearchBar
  value={searchTerm}
  onChange={setSearchTerm}
  debounceMs={300}
  isLoading={isSearching}
  showRecentSearches
/>
```

#### DataTable

```tsx
import { DataTable } from '@scott/shared-ui-components';

const columns = [
  { key: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { key: 'email', header: 'Email', accessor: (row) => row.email, filterable: true },
];

<DataTable
  data={users}
  columns={columns}
  sortable
  filterable
  selectable
  pagination={{ pageSize: 10 }}
/>
```

#### TagInput

```tsx
import { TagInput } from '@scott/shared-ui-components';

<TagInput
  tags={tags}
  onChange={setTags}
  placeholder="Add tags..."
  maxTags={10}
  suggestions={['react', 'typescript', 'javascript']}
  validate={(tag) => tag.length >= 2}
/>
```

#### Tabs

```tsx
import { Tabs } from '@scott/shared-ui-components';

<Tabs
  tabs={[
    { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  variant="pills"
  orientation="horizontal"
/>
```

## Components

### Phase 1: Foundation Components ✅

- ✅ **Button** - Multiple variants, sizes, and states
- ✅ **FormInput** - Text input with validation and icons
- ✅ **Modal** - Dialog with focus trap and keyboard navigation
- ✅ **Toast** - Context-based notifications
- ✅ **Card** - Flexible content container

### Phase 2: Essential Components ✅

- ✅ **FormTextarea** - Multi-line text input with auto-resize and character count
- ✅ **FormSelect** - Single and multi-select dropdown with search
- ✅ **Badge** - Labels, tags, and status indicators
- ✅ **LoadingSpinner** - Loading states with multiple variants
- ✅ **SearchBar** - Debounced search with recent searches

### Phase 3: Advanced Components ✅

- ✅ **DataTable** - Sortable, filterable table with pagination and row selection
- ✅ **TagInput** - Add/remove tags with validation and autocomplete
- ✅ **Tabs** - Tab navigation with keyboard support and multiple variants

## Hooks

- `useClickOutside` - Detect clicks outside an element
- `useFocusTrap` - Trap focus within a container
- `useDebounce` - Debounce values for search, API calls
- `useLocalStorage` - Sync state with localStorage

## Theming

The library uses CSS variables for theming. You can customize colors, spacing, typography, and more by overriding CSS variables:

```css
:root {
  --color-primary-500: #2196f3;
  --spacing-base: 1rem;
  --font-size-base: 1rem;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test
```

## License

MIT

