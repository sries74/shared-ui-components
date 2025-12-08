# Publishing to GitHub Packages

This guide explains how to publish `@scott/shared-ui-components` to GitHub Packages.

## Prerequisites

1. **GitHub Repository**: Create a repository named `shared-ui-components` on GitHub
2. **GitHub Personal Access Token (PAT)**: Create a token with `write:packages` and `read:packages` permissions
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `write:packages`, `read:packages`, `repo`
   - Copy the token (you won't see it again!)

## Initial Setup

### 1. Update package.json

Replace `YOUR_GITHUB_USERNAME` in `package.json` with your actual GitHub username:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_GITHUB_USERNAME/shared-ui-components.git"
}
```

### 2. Configure Authentication

**On your laptop/development machine:**

Edit your **global** `~/.npmrc` file (NOT the project .npmrc):

```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

Replace `YOUR_GITHUB_TOKEN` with your actual token.

**On your VPS servers:**

Same process - add the auth token to `~/.npmrc` on each VPS.

### 3. Initialize Git Repository (if not done)

```bash
cd /home/scott/dev/shared-ui-components
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/shared-ui-components.git
git push -u origin main
```

## Publishing

### Build and Publish

```bash
# Build the package
npm run build

# Publish to GitHub Packages
npm publish
```

### Version Updates

When making updates:

```bash
# Update version (patch/minor/major)
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Build and publish
npm run build
npm publish

# Push version tag to GitHub
git push --tags
```

## Installing on Other Machines

### On VPS, Laptop, or Tablet

1. **Configure .npmrc** (one-time setup):

Create or edit `~/.npmrc`:

```
@scott:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. **Install the package**:

```bash
npm install @scott/shared-ui-components
```

3. **Use in your project**:

```javascript
import { Button, Card } from '@scott/shared-ui-components';
import '@scott/shared-ui-components/styles';
```

## Troubleshooting

### "401 Unauthorized" Error

- Check your GitHub token has `write:packages` and `read:packages` permissions
- Verify token is correctly added to `~/.npmrc`
- Ensure token hasn't expired

### "404 Not Found" Error

- Verify package name matches GitHub username: `@scott/shared-ui-components`
- Check repository exists on GitHub
- Ensure `publishConfig` is set in package.json

### Package Not Found When Installing

- Verify `.npmrc` has the registry configuration
- Check authentication token is valid
- Ensure package has been published at least once

## Best Practices

1. **Always build before publishing**: `npm run build`
2. **Test locally first**: Use `npm link` to test before publishing
3. **Use semantic versioning**: Follow semver (major.minor.patch)
4. **Update CHANGELOG**: Document changes between versions
5. **Tag releases**: GitHub releases help track versions

## Security Notes

- **Never commit** your GitHub token to git
- Keep `.npmrc` with token in `.gitignore` (project .npmrc is safe, it has no token)
- Rotate tokens periodically
- Use fine-grained tokens when possible
