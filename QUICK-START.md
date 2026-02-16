# Quick Start Guide - Using @sries74/shared-ui-components

## ✅ Package Successfully Published!

Your package is now available at:
- **GitHub**: https://github.com/sries74/shared-ui-components
- **Package**: https://github.com/sries74/shared-ui-components/packages

---

## 📦 Installing on Any Machine

### One-Time Setup (Per Machine)

1. **Install GitHub CLI** (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt install gh
   
   # macOS
   brew install gh
   ```

2. **Authenticate with GitHub**:
   ```bash
   gh auth login
   
   # Add package permissions
   gh auth refresh -s write:packages,read:packages
   ```

3. **Configure npm**:
   ```bash
   # Add to ~/.npmrc
   echo "@sries74:registry=https://npm.pkg.github.com" >> ~/.npmrc
   echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
   ```

### Install the Package

```bash
npm install @sries74/shared-ui-components
```

---

## 🚀 Using in Your Projects

### Import Components

```javascript
import { Button, Card, Modal, DataTable } from '@sries74/shared-ui-components';
import '@sries74/shared-ui-components/styles';
```

### Import Hooks

```javascript
import { useDebounce, useLocalStorage, useClickOutside } from '@sries74/shared-ui-components';
```

### Example Usage

```jsx
import React from 'react';
import { Button, Card } from '@sries74/shared-ui-components';
import '@sries74/shared-ui-components/styles';

function App() {
  return (
    <Card>
      <h1>Hello World</h1>
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </Card>
  );
}
```

---

## 🔄 Publishing Updates

### From Development Machine

```bash
# Make your changes...

# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Build and publish
npm run build
npm publish

# Push to GitHub
git push --tags
git push
```

---

## 📍 Available Components

### Common
- `Button` - Customizable button component
- `SearchBar` - Search input with debouncing

### Data Display
- `Badge` - Status badges
- `Card` - Container component
- `DataTable` - Sortable, filterable data table

### Forms
- `FormInput` - Text input with validation
- `FormSelect` - Dropdown select
- `FormTextarea` - Multi-line text input
- `TagInput` - Tag/chip input

### Navigation
- `Tabs` - Tabbed interface

### Overlay
- `Modal` - Modal dialog

### Feedback
- `LoadingSpinner` - Loading indicator
- `Toast` - Notification toasts

### Hooks
- `useDebounce` - Debounce values
- `useLocalStorage` - Persist state to localStorage
- `useClickOutside` - Detect clicks outside element
- `useFocusTrap` - Trap focus within element

---

## 🌐 VPS Setup

### On Each VPS:

```bash
# Install GitHub CLI
sudo apt update
sudo apt install gh

# Authenticate
gh auth login
gh auth refresh -s write:packages,read:packages

# Configure npm
echo "@sries74:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc

# Now you can install the package
npm install @sries74/shared-ui-components
```

---

## 🔐 Security Notes

- GitHub CLI manages authentication automatically
- Token is stored in `~/.npmrc` (not committed to git)
- Refresh token if it expires: `gh auth refresh -s write:packages,read:packages`
- Update token in npmrc: `sed -i '/npm.pkg.github.com/d' ~/.npmrc && echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc`

---

## 🆘 Troubleshooting

### "401 Unauthorized"
```bash
# Refresh authentication
gh auth refresh -s write:packages,read:packages
sed -i '/npm.pkg.github.com/d' ~/.npmrc && echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
```

### "404 Not Found"
- Verify package name: `@sries74/shared-ui-components`
- Check registry is configured: `cat ~/.npmrc | grep sries74`

### Package Not Installing
- Ensure you're authenticated: `gh auth status`
- Verify token has package permissions: `gh auth refresh -s write:packages,read:packages`

---

## 📚 Documentation

- Full documentation: https://github.com/sries74/shared-ui-components
- Demo site: (coming soon)
- Component examples: See `/demo` directory

---

**Package Name**: `@sries74/shared-ui-components`  
**Current Version**: `1.0.0`  
**Registry**: GitHub Packages  
**Access**: Private (requires authentication)
