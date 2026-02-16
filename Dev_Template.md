# Development Template - @sries74/shared-ui-components

Complete guide for developing, testing, documenting, and publishing your React component library.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Development Setup](#development-setup)
3. [Component Development Workflow](#component-development-workflow)
4. [Storybook Integration](#storybook-integration)
5. [Testing](#testing)
6. [Building & Publishing](#building--publishing)
7. [Project Structure](#project-structure)
8. [Best Practices](#best-practices)

---

## 🎯 Project Overview

**Package Name**: `@sries74/shared-ui-components`  
**Version**: `1.0.0`  
**Registry**: GitHub Packages  
**Repository**: https://github.com/sries74/shared-ui-components

### Technology Stack

- **Framework**: React 18.2
- **Language**: TypeScript 5.2
- **Build Tool**: Vite 5.0
- **Styling**: CSS Modules
- **Testing**: Vitest
- **Documentation**: Storybook (optional)
- **Linting**: ESLint + TypeScript ESLint

---

## 🚀 Development Setup

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/sries74/shared-ui-components.git
cd shared-ui-components

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server for testing components |
| `npm run build` | Build the library for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run tests with Vitest |
| `npm run lint` | Lint code with ESLint |
| `npm run list-components` | List all available components |

---

## 🛠️ Component Development Workflow

### 1. Create a New Component

#### Directory Structure

```
src/components/
├── Common/          # Buttons, inputs, basic elements
├── DataDisplay/     # Cards, badges, tables
├── Forms/           # Form inputs, selects, textareas
├── Navigation/      # Tabs, menus, breadcrumbs
├── Overlay/         # Modals, tooltips, popovers
└── Feedback/        # Toasts, spinners, alerts
```

#### Component Template

Create `src/components/[Category]/[ComponentName].tsx`:

```tsx
import React from 'react';
import './[ComponentName].css';

export interface [ComponentName]Props {
  /** Description of prop */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Size of the component */
  size?: 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
}) => {
  return (
    <div className={`component-name component-name--${variant} component-name--${size} ${className}`}>
      {children}
    </div>
  );
};
```

Create `src/components/[Category]/[ComponentName].css`:

```css
.component-name {
  /* Base styles */
  display: block;
  box-sizing: border-box;
}

/* Variants */
.component-name--primary {
  /* Primary variant styles */
}

.component-name--secondary {
  /* Secondary variant styles */
}

/* Sizes */
.component-name--small {
  /* Small size styles */
}

.component-name--medium {
  /* Medium size styles */
}

.component-name--large {
  /* Large size styles */
}
```

### 2. Export the Component

Update `src/components/[Category]/index.ts`:

```typescript
export { [ComponentName] } from './[ComponentName]';
export type { [ComponentName]Props } from './[ComponentName]';
```

Update `src/index.ts`:

```typescript
export * from './components/[Category]';
```

### 3. Test the Component

Create `tests/[ComponentName].test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { [ComponentName] } from '../src/components/[Category]/[ComponentName]';

describe('[ComponentName]', () => {
  it('renders correctly', () => {
    render(<[ComponentName]>Test</ [ComponentName]>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<[ComponentName] variant="primary">Test</[ComponentName]>);
    expect(container.firstChild).toHaveClass('component-name--primary');
  });
});
```

---

## 📚 Storybook Integration

Storybook provides an interactive UI for developing and documenting components.

### Install Storybook

```bash
npx storybook@latest init
```

This will:
- Install Storybook dependencies
- Create `.storybook/` configuration
- Add Storybook scripts to `package.json`
- Create example stories

### Create a Story

Create `src/components/[Category]/[ComponentName].stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { [ComponentName] } from './[ComponentName]';

const meta: Meta<typeof [ComponentName]> = {
  title: '[Category]/[ComponentName]',
  component: [ComponentName],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};
```

### Run Storybook

```bash
npm run storybook
```

Storybook will open at `http://localhost:6006`

### Build Storybook for Deployment

```bash
npm run build-storybook
```

This creates a static site in `storybook-static/` that can be deployed to GitHub Pages, Netlify, etc.

---

## 🧪 Testing

### Unit Tests with Vitest

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../src/components/Category/ComponentName';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should render with default props', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const { container } = render(<ComponentName className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

---

## 📦 Building & Publishing

### Build the Library

```bash
npm run build
```

This creates:
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Compiled styles

### Version Management

```bash
# Patch version (1.0.0 -> 1.0.1) - Bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) - New features
npm version minor

# Major version (1.0.0 -> 2.0.0) - Breaking changes
npm version major
```

### Publish to GitHub Packages

```bash
# Build the library
npm run build

# Publish
npm publish

# Push version tag to GitHub
git push --tags
git push
```

### Automated Publishing Script

Create `scripts/publish.sh`:

```bash
#!/bin/bash
set -e

echo "🔍 Running linter..."
npm run lint

echo "🧪 Running tests..."
npm test

echo "📦 Building package..."
npm run build

echo "📋 Current version: $(node -p "require('./package.json').version")"
read -p "Enter version bump (patch/minor/major): " version_type

npm version $version_type

echo "🚀 Publishing to GitHub Packages..."
npm publish

echo "📤 Pushing to GitHub..."
git push --tags
git push

echo "✅ Published successfully!"
```

Make it executable:

```bash
chmod +x scripts/publish.sh
```

---

## 📁 Project Structure

```
shared-ui-components/
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── demo/                    # Demo application
│   ├── src/
│   └── index.html
├── dist/                    # Built library (generated)
├── docs/                    # Documentation
│   ├── PUBLISHING.md
│   ├── VAULT-SETUP.md
│   └── architecture-quick-ref.md
├── scripts/                 # Build and utility scripts
│   ├── list-components.js
│   └── publish-vault.sh
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── Common/
│   │   ├── DataDisplay/
│   │   ├── Feedback/
│   │   ├── Forms/
│   │   ├── Navigation/
│   │   └── Overlay/
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles and tokens
│   │   ├── global.css
│   │   ├── theme.ts
│   │   └── tokens.ts
│   ├── types/               # TypeScript type definitions
│   └── index.ts             # Main entry point
├── stories/                 # Storybook stories
├── tests/                   # Test files
├── .gitignore
├── .npmrc                   # npm configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ✨ Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Composition**: Build complex components from simpler ones
3. **Prop Types**: Always define TypeScript interfaces for props
4. **Default Props**: Provide sensible defaults
5. **Accessibility**: Use semantic HTML and ARIA attributes

### Styling

1. **CSS Modules**: Use scoped styles to avoid conflicts
2. **BEM Naming**: Use Block-Element-Modifier naming convention
3. **Design Tokens**: Use variables from `src/styles/tokens.ts`
4. **Responsive**: Design mobile-first, progressive enhancement
5. **Theme Support**: Support light/dark themes when applicable

### TypeScript

1. **Strict Mode**: Keep `strict: true` in tsconfig.json
2. **Explicit Types**: Avoid `any`, use specific types
3. **Interfaces**: Use interfaces for component props
4. **Type Exports**: Export types alongside components
5. **Generic Types**: Use generics for reusable components

### Documentation

1. **JSDoc Comments**: Document all props and functions
2. **README**: Keep README.md up to date
3. **Storybook**: Create stories for all components
4. **Examples**: Provide usage examples
5. **Changelog**: Maintain CHANGELOG.md for version history

### Git Workflow

1. **Commit Messages**: Use conventional commits format
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Test additions/changes
   - `chore:` Build/tooling changes

2. **Branching**: Use feature branches
   ```bash
   git checkout -b feature/new-component
   git checkout -b fix/button-styling
   ```

3. **Pull Requests**: Create PRs for review before merging

### Performance

1. **Tree Shaking**: Export components individually
2. **Code Splitting**: Use dynamic imports when needed
3. **Memoization**: Use `React.memo` for expensive components
4. **Bundle Size**: Monitor bundle size with each build
5. **Lazy Loading**: Defer loading of heavy components

---

## 🔧 Configuration Files

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedUIComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

---

## 📖 Quick Reference

### Add a New Component

```bash
# 1. Create component files
touch src/components/Category/NewComponent.tsx
touch src/components/Category/NewComponent.css

# 2. Create story (if using Storybook)
touch src/components/Category/NewComponent.stories.tsx

# 3. Create test
touch tests/NewComponent.test.tsx

# 4. Export component
# Add to src/components/Category/index.ts
# Add to src/index.ts

# 5. Test locally
npm run dev

# 6. Run tests
npm test

# 7. View in Storybook
npm run storybook
```

### Publish a New Version

```bash
# 1. Make changes and commit
git add .
git commit -m "feat: add new component"

# 2. Run tests
npm test

# 3. Build
npm run build

# 4. Version bump
npm version patch  # or minor/major

# 5. Publish
npm publish

# 6. Push to GitHub
git push --tags
git push
```

---

## 🆘 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Type Errors

```bash
# Regenerate type declarations
npm run build
```

### Publishing Errors

```bash
# Refresh GitHub authentication
gh auth refresh -s write:packages,read:packages
sed -i '/npm.pkg.github.com/d' ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Vitest Documentation](https://vitest.dev/)
- [GitHub Packages Guide](https://docs.github.com/en/packages)

---

**Last Updated**: 2025-12-08  
**Maintainer**: @sries74  
**License**: MIT (or your chosen license)
