# Using HashiCorp Vault for GitHub Packages Authentication

This guide shows how to securely store and retrieve your GitHub token from Vault for npm publishing.

## Prerequisites

- HashiCorp Vault running in Docker
- Vault initialized and unsealed
- Vault CLI installed on your machines

## Setup

### 1. Store GitHub Token in Vault

```bash
# Login to Vault (if not already)
vault login

# Store your GitHub token
vault kv put secret/github/npm-token token="ghp_your_actual_token_here"

# Verify it's stored
vault kv get secret/github/npm-token
```

### 2. Create Helper Script

Create `/home/scott/.local/bin/npm-vault-auth.sh`:

```bash
#!/bin/bash
# Retrieve GitHub npm token from Vault and configure npm

# Check if Vault is accessible
if ! vault status &>/dev/null; then
    echo "Error: Cannot connect to Vault. Is it running?"
    exit 1
fi

# Retrieve token from Vault
TOKEN=$(vault kv get -field=token secret/github/npm-token 2>/dev/null)

if [ -z "$TOKEN" ]; then
    echo "Error: Could not retrieve token from Vault"
    exit 1
fi

# Export as environment variable
export NPM_TOKEN="$TOKEN"

# Optionally update .npmrc temporarily
echo "//npm.pkg.github.com/:_authToken=$TOKEN" > ~/.npmrc.tmp

echo "✓ NPM authentication configured from Vault"
```

Make it executable:
```bash
chmod +x /home/scott/.local/bin/npm-vault-auth.sh
```

### 3. Update Project .npmrc

Update `/home/scott/dev/shared-ui-components/.npmrc`:

```
# Configure GitHub Packages for @scott scope
@scott:registry=https://npm.pkg.github.com
# Token will be provided via environment variable or temporary .npmrc
```

## Usage

### Option A: Environment Variable (Recommended)

```bash
# Source the auth script
source /home/scott/.local/bin/npm-vault-auth.sh

# Now publish (token is in environment)
npm publish
```

### Option B: Temporary .npmrc

```bash
# Run auth script to create temporary .npmrc
/home/scott/.local/bin/npm-vault-auth.sh

# Publish using temporary config
npm --userconfig ~/.npmrc.tmp publish

# Clean up
rm ~/.npmrc.tmp
```

### Option C: Wrapper Script (Easiest)

Create `/home/scott/.local/bin/npm-publish-vault.sh`:

```bash
#!/bin/bash
# Publish npm package using Vault authentication

set -e

# Get token from Vault
TOKEN=$(vault kv get -field=token secret/github/npm-token)

if [ -z "$TOKEN" ]; then
    echo "Error: Could not retrieve token from Vault"
    exit 1
fi

# Build the package
echo "Building package..."
npm run build

# Publish with token
echo "Publishing to GitHub Packages..."
NPM_TOKEN="$TOKEN" npm publish

echo "✓ Package published successfully!"
```

Make it executable:
```bash
chmod +x /home/scott/.local/bin/npm-publish-vault.sh
```

Then simply run:
```bash
npm-publish-vault.sh
```

## VPS Setup

### On Each VPS:

1. **Install Vault CLI**:
```bash
# Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vault
```

2. **Configure Vault Address**:
```bash
# Add to ~/.bashrc or ~/.zshrc
export VAULT_ADDR='http://your-vault-server:8200'
export VAULT_TOKEN='your-vault-token'
```

3. **Copy the helper scripts** from above

4. **Test authentication**:
```bash
source /home/scott/.local/bin/npm-vault-auth.sh
```

## Security Best Practices

1. **Use Vault Policies**: Create read-only policy for npm token
```bash
vault policy write npm-read - <<EOF
path "secret/data/github/npm-token" {
  capabilities = ["read"]
}
EOF
```

2. **Use AppRole for VPS**: Instead of root tokens
```bash
# Enable AppRole
vault auth enable approle

# Create role for npm publishing
vault write auth/approle/role/npm-publisher \
    token_policies="npm-read" \
    token_ttl=1h \
    token_max_ttl=4h
```

3. **Rotate Tokens Regularly**: Update in Vault, all machines get new token automatically

4. **Audit Access**: Enable Vault audit logging
```bash
vault audit enable file file_path=/vault/logs/audit.log
```

## Troubleshooting

### "Cannot connect to Vault"
- Check Vault is running: `docker ps | grep vault`
- Verify VAULT_ADDR is set correctly
- Ensure Vault is unsealed: `vault status`

### "Permission denied"
- Check your Vault token has read access to `secret/github/npm-token`
- Verify token hasn't expired: `vault token lookup`

### "Token not found"
- Ensure token is stored: `vault kv get secret/github/npm-token`
- Check the path matches exactly

## Benefits of Using Vault

✅ **Centralized secret management** - Update token once, affects all machines  
✅ **Audit trail** - Know when and who accessed the token  
✅ **Automatic rotation** - Update GitHub token without touching each machine  
✅ **Access control** - Fine-grained permissions per user/service  
✅ **No secrets in files** - Tokens never written to disk permanently  

## Quick Reference

```bash
# Store token
vault kv put secret/github/npm-token token="YOUR_TOKEN"

# Retrieve token
vault kv get -field=token secret/github/npm-token

# Publish package
npm-publish-vault.sh

# Update token (all machines automatically use new one)
vault kv put secret/github/npm-token token="NEW_TOKEN"
```
