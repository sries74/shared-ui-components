# Caddy Configuration for Component Library Demo

## Option 1: If Caddy can access host network

Add this to your `/etc/caddy/Caddyfile`:

```
# Component Library Demo
components.botb.cloud {
    reverse_proxy host.docker.internal:3000
}
```

Or if using host network mode:

```
# Component Library Demo
components.botb.cloud {
    reverse_proxy localhost:3000
}
```

## Option 2: If host.docker.internal doesn't work

You may need to use the host's IP address:

```
# Component Library Demo
components.botb.cloud {
    reverse_proxy 195.26.250.232:3000
}
```

## After adding the config:

1. Reload Caddy:
   ```bash
   docker exec caddy caddy reload --config /etc/caddy/Caddyfile
   ```

2. Or restart the Caddy container:
   ```bash
   docker restart caddy
   ```

3. Make sure the demo server is running:
   ```bash
   cd /home/scott/dev/shared-ui-components/demo
   npm run dev:network
   ```

## Access the demo:

Once configured, you can access the demo at:
- `https://components.botb.cloud` (if you use that subdomain)
- Or whatever subdomain you choose

## Note:

Make sure to:
1. Add the DNS A record in Cloudflare pointing to your server IP
2. The demo server must be running on port 3000
3. Ensure port 3000 is accessible from the Caddy container

