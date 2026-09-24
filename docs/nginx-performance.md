# nginx: HTTP/2 and a static-asset cache

The VPS's nginx is where the rest of the page-speed budget sits, and none of it
can be fixed from this repo. Measured against https://aibrigade.ai on
2026-09-24:

- **Every request is HTTP/1.1.** A first visit to the home page makes ~55
  requests. Over HTTP/1.1 the browser opens at most six connections and queues
  the rest; Lighthouse put the cost at ~1.3s on mobile.
- **Static files are served by Node.** nginx proxies every request to the
  container on :3001, fingerprinted JS/CSS included, so each one waits on the
  Next server (~0.45s of server time per file measured from Pakistan).

Neither change below touches the site's output: same bytes, same headers,
delivered faster.

## 1. Cache zone: `http {}` context

Put this at the very top of `/etc/nginx/sites-available/aibrigade.ai`,
above the first `server {`. Files in `sites-enabled` are included inside
`http {}`, so this needs no second file. A separate `conf.d/*.conf` file
also works, but only if the server's `nginx.conf` includes `conf.d`. On
the VPS it wasn't picked up, and `nginx -t` failed with `host not found in
upstream "aibrigade_app"`.

```nginx
proxy_cache_path /var/cache/nginx/aibrigade levels=1:2
                 keys_zone=aibrigade_static:20m max_size=2g
                 inactive=30d use_temp_path=off;

upstream aibrigade_app {
    server 127.0.0.1:3001;
    keepalive 16;
}
```

## 2. In the existing `server { listen 443 ssl; … }` block for aibrigade.ai

Leave the certbot `ssl_certificate` lines and the existing `location /` as they
are. Add:

```nginx
    http2 on;                      # nginx >= 1.25.1 (the VPS runs 1.28)

    # Files whose URL changes whenever their content does: Next's hashed
    # chunks, and the folders next.config.mjs marks immutable. Cached by
    # nginx after the first request, so Node only ever serves each once.
    # HTML is deliberately NOT cached here: prerendered pages carry
    # `s-maxage=31536000`, and caching them would keep serving the old
    # page (pointing at deleted chunks) after a deploy.
    location ~ ^/(_next/static|fonts|vendor|video)/ {
        proxy_pass http://aibrigade_app;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;

        proxy_cache            aibrigade_static;
        proxy_cache_valid      200 30d;
        proxy_cache_lock       on;
        proxy_cache_use_stale  error timeout updating;
        add_header X-Cache $upstream_cache_status always;
    }
```

Don't add `ssl_session_cache` / `ssl_session_timeout` here. The certbot
include `options-ssl-nginx.conf` already sets both (10m, 1 day), and a
second copy in the same block fails `nginx -t` with "directive is duplicate".

`/projecs/*.mp4` (the 3–60MB demo cuts) is left out. Those files are
fetched with range requests, and caching them well needs nginx's `slice`
module. They already stream fine through the existing `location /`.
`/projecs/posters` is left out too. next.config.mjs doesn't mark it
immutable, so Next sends `max-age=0`, which nginx honours by not caching.
Their names also don't change when the images do.

## 3. Apply and verify

```bash
sudo mkdir -p /var/cache/nginx/aibrigade && sudo chown www-data /var/cache/nginx/aibrigade
sudo nginx -t && sudo systemctl reload nginx

# from any machine
curl -sI --http2 https://aibrigade.ai/ | head -1          # expect: HTTP/2 200
f=$(curl -s https://aibrigade.ai/ | grep -o '/_next/static/chunks/[^"]*\.js' | head -1)
curl -sI "https://aibrigade.ai$f" | grep -i x-cache      # MISS the first time
curl -sI "https://aibrigade.ai$f" | grep -i x-cache      # then HIT
```

Deploys need no cache purge. Every cached path is renamed when its content
changes: Next hashes its chunks, and `/video`, `/vendor` and `/fonts` follow
the same rule by convention (see next.config.mjs).

## Optional: a CDN in front

The server is ~250ms away from Pakistan and further from the Gulf and EU
clients. Putting Cloudflare (free plan) in front of the domain gives TLS
termination near the visitor, HTTP/3, brotli, and edge copies of everything
the location block above caches. That is the largest remaining win for
visitors far from the VPS. If you do this, set SSL/TLS mode to "Full
(strict)" and leave HTML uncached for the reason given above.
