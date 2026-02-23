# DROPZONE

Landing page for the **DROPZONE** closed beta — a platform that automatically drops real CS2 skins to viewers when a streamer hits a skill moment (ACE, Triple Kill, Clutch).

**Single-file setup:** one `index.html`, no framework, no build step.

---

## Contents

- [What's on the page](#whats-on-the-page)
- [Quick start](#quick-start)
- [Add your video](#add-your-video)
- [Connect email signups](#connect-email-signups)
- [Discord & Telegram](#discord--telegram)
- [Deploy](#deploy)
- [Customize](#customize)

---

## What's on the page

| Section | Description |
|--------|-------------|
| **Hero** | Headline, subline, two CTAs (streamer beta + viewer waitlist) |
| **Demo video** | Autoplay-on-click player |
| **How it works** | 3-step explainer: Trigger → Winner → Trade |
| **Trust & Safety** | “This is not gambling” + provable fairness |
| **Signup forms** | Streamer beta application + viewer waitlist (email → localStorage by default; swap for your backend when ready) |
| **Discord CTA** | Invite link to community |
| **Footer** | Links and credits |

Translations live in `translations.js`; the page uses it for copy if you add locales.

---

## Quick start

```bash
npx serve . -p 3000
```

Then open **http://localhost:3000**. No install or build required.

---

## Add your video

1. Export your demo clip from Photos: right-click → **Export Unmodified Original**.
2. Create an `assets/` folder next to `index.html`.
3. Compress and add the file:

```bash
ffmpeg -i ~/Desktop/your-video.mov -vcodec h264 -crf 28 -preset slow -vf scale=1280:-2 assets/demo.mp4
```

The player loads `assets/demo.mp4` automatically.

---

## Connect email signups

In `index.html`, find the `sub()` function and replace the localStorage logic with a request to your API:

```js
await fetch('https://your-api.com/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(entry),
});
```

**Quick options:** [Formspree](https://formspree.io) · [Supabase](https://supabase.com) · Google Sheets + Apps Script

---

## Discord & Telegram

- In `index.html`, search for `discord.gg/YOUR_INVITE` and replace with your Discord invite (nav + CTA).
- Replace `t.me/YOUR_USERNAME` with your Telegram handle for the CTA button.

---

## Deploy

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push to repo → Settings → Pages → source: `main` / root |
| **Vercel** | `npx vercel` |
| **Netlify** | Drag & drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop) |

---

## Customize

**Colors** — CSS variables at the top of `<style>` in `index.html`:

| Variable | Default | Use |
|----------|---------|-----|
| `--ac` | `#8b5cf6` | Primary purple |
| `--cy` | `#22d3ee` | Viewer cyan |
| `--gn` | `#34d399` | Trust green |

**Copy** — All text is in the HTML (and `translations.js` if you use it). Edit in place; no CMS.
