#!/bin/bash
# Publish npm package using Vault authentication

set -e

echo "🔐 Retrieving token from Vault..."

# Get token from Vault
TOKEN=$(vault kv get -field=token secret/github/npm-token 2>/dev/null)

if [ -z "$TOKEN" ]; then
    echo "❌ Error: Could not retrieve token from Vault"
    echo "Make sure Vault is running and token is stored:"
    echo "  vault kv put secret/github/npm-token token=\"YOUR_TOKEN\""
    exit 1
fi

# Build the package
echo "📦 Building package..."
npm run build

# Publish with token from Vault
echo "🚀 Publishing to GitHub Packages..."
echo "//npm.pkg.github.com/:_authToken=$TOKEN" > .npmrc.tmp
npm --userconfig .npmrc.tmp publish
rm .npmrc.tmp

echo "✅ Package published successfully!"
