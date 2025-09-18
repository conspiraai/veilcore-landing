# Stimothy Pumps — VeilCore Landing

Stimothy Pumps ($stimothy) is VeilCore's glitch-native, creator-first meme coin hub and livestream home. The site ships a dark, acid-glow experience that anchors lore, live video, token details, roadmap, and community links in one responsive page.

- **Live site:** https://veilcore.us (GitHub Pages builds automatically from `main`)
- **Stream entry:** The live player and Pump.fun links are hydrated from the `LIVE_URL` constant defined in `script.js`.

## Editing key values

Open [`script.js`](./script.js) and update these constants near the top of the file:

- `LIVE_URL` — Pump.fun (or other) livestream/player URL.
- `CONTRACT_ADDR` — On-chain contract address displayed and copied.
- `TWITTER_URL`, `TELEGRAM_URL`, `CONSPIRAAI_URL`, `GITHUB_URL` — Update if the destinations change.
- `SITE_DOMAIN` — Update if the canonical or custom domain changes; this also controls the optional `CNAME` file.

The markup automatically reflects these values on load, and the copy-to-clipboard buttons pick up the new strings without further changes.

## Deploying

1. Commit changes to the `main` branch.
2. Push to GitHub.<<<<<<< codex/set-up-stimothy-pumps-website-bcsxao
3. Ensure GitHub Pages is configured to deploy from the `main` branch with the `/` (root) folder.
4. GitHub Pages will rebuild the site and serve it at https://veilcore.us (or your configured Pages domain).

## Assets

- `stimothy.png` — Stimothy icon used in the About panel (transparent background respected).
- `veilstimmy.png` — Hero art rendered with glow framing.

Keep these filenames unchanged to preserve references.
