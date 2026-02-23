# DROPZONE

Landing page for **DROPZONE** — real-time stream drops for skill moments and highlights. Twitch Drops meets CS2 (and more games later); powered by the streamer’s own inventory.

**Single-file setup:** one `index.html`, no framework, no build step. Responsive for desktop and all phone sizes and orientations.

---

## What’s on the page

| Section | Description |
|--------|-------------|
| **Hero** | “Closed Beta” badge, headline “Twitch Drops for skill moments and highlights.”, subline, two CTAs (Streamer — Join Beta / Viewer — Get Notified), stats (Free, &lt;3s, Yours) |
| **Demo video** | 16:9 player; `assets/demo.mp4` autoplays muted loop; click to unmute/play |
| **How it works** | 3 steps: Trigger Fires → Winner Picked → Skin Traded |
| **Trust & Safety** | “This is NOT gambling” — no purchase, streamer’s inventory, provably fair selection |
| **Join CTA** | Discord + Telegram buttons, then two signup cards |
| **Streamer Beta** | Twitch channel + email → Supabase `signups` (role: streamer) |
| **Viewer Waitlist** | Name + email → Supabase `signups` (role: viewer) |
| **Footer** | © DROPZONE, “feedbaaaaaack !!!!!!!!!” opens feedback modal |
| **Feedback modal** | Optional name, optional email, message (max 254 chars) → Supabase `feedback` |

---

## Quick start

```bash
npx serve . -p 3000
```

Open **http://localhost:3000**. No install or build.

---

## Add your demo video

1. Create an `assets/` folder next to `index.html`.
2. Add a file named `demo.mp4` (or point the `<source src="...">` in `index.html` to your file).

Optional compression:

```bash
ffmpeg -i your-video.mov -vcodec h264 -crf 28 -preset slow -vf scale=1280:-2 assets/demo.mp4
```

---

## Backend (Supabase)

Signups and feedback are sent to **Supabase** via the REST API.

- **Tables:** `signups` (email, role, twitch, name), `feedback` (name, email, message).
- In `index.html`, set `SUPABASE_URL` and `SUPABASE_KEY` (anon key) to your project. For production, use env or a small server so the key isn’t in the repo.

Honeypot, time-to-fill, and cooldowns are used to limit abuse.

---

## Discord & Telegram

- **Discord:** Search for `discord.gg/` in `index.html` and replace with your invite (nav + CTA section).
- **Telegram:** Search for `t.me/` and replace with your handle for the “DM us on Telegram” button.

---

## Deploy

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push → Settings → Pages → source: main / root |
| **Vercel** | `npx vercel` |
| **Netlify** | Drag & drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop) |

---

## Tech & behavior

- **Fonts:** Google Fonts — Unbounded, Outfit, JetBrains Mono.
- **Icons:** [Lucide](https://lucide.dev) (UMD from unpkg).
- **Security:** CSP, X-Content-Type-Options, X-Frame-Options; viewport and theme-color set.
- **A11y:** Skip link, focus styles, ARIA where needed, reduced-motion respected.
- **Mobile:** Responsive breakpoints (768px, 480px, 380px), safe-area insets, 44px+ touch targets, single-column layout and stacked CTAs on small screens.

---

## Customize

**Colors** — CSS variables at the top of `<style>` in `index.html`:

| Variable | Default | Use |
|----------|---------|-----|
| `--ac` | `#8b5cf6` | Primary purple |
| `--cy` | `#22d3ee` | Accent cyan |
| `--gn` | `#34d399` | Trust green |

**Copy** — All text is in the HTML; edit in place.
