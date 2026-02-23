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

## Config (required — keep secrets out of the repo)

Supabase URL and anon key are **not** in the repo. You provide them via `config.js`:

1. Copy the example: `cp config.example.js config.js`
2. Edit `config.js` and set your Supabase project URL and anon key.
3. **Never commit `config.js`** — it’s in `.gitignore`. Only `config.example.js` is committed.

Without `config.js`, signup and feedback forms will not submit (no keys = no API calls).

**Deploy on Vercel:** The repo includes a build step. In the Vercel project, add **Environment Variables**: `SUPABASE_URL` and `SUPABASE_ANON_KEY`. On each deploy, `node scripts/build-config.js` runs and generates `config.js` from these env vars. No need to commit or manually create `config.js`.

**Other hosts (Netlify, GitHub Actions):** Run `node scripts/build-config.js` in your build and set the same env vars.

---

## Quick start

```bash
cp config.example.js config.js   # then edit config.js with your Supabase URL + anon key
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
- Credentials live in `config.js` (see [Config](#config-required--keep-secrets-out-of-the-repo)); the repo only has `config.example.js`.

**Create the tables and allow inserts (Supabase SQL editor):**

```sql
-- signups (for streamer beta + viewer waitlist)
create table if not exists signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null,
  twitch text,
  name text,
  created_at timestamptz default now()
);
alter table signups enable row level security;
create policy "Allow anon insert" on signups for insert to anon with check (true);

-- feedback (for footer feedback form)
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  created_at timestamptz default now()
);
alter table feedback enable row level security;
create policy "Allow anon insert" on feedback for insert to anon with check (true);
```

Without these tables and RLS policies, inserts from the site will fail (403 or missing table).

Honeypot, time-to-fill, and cooldowns are used to limit abuse.

---

## Discord & Telegram

- **Discord:** Search for `discord.gg/` in `index.html` and replace with your invite (nav + CTA section).
- **Telegram:** Search for `t.me/` and replace with your handle for the “DM us on Telegram” button.

---

## Deploy

| Platform | How |
|----------|-----|
| **Vercel** | Connect repo → set env vars `SUPABASE_URL`, `SUPABASE_ANON_KEY` → Deploy. Build runs `node scripts/build-config.js` (see `vercel.json`). |
| **GitHub Pages** | Use Actions to run the build script with secrets, then publish the output. |
| **Netlify** | Build command: `node scripts/build-config.js`; set same env vars in Netlify UI. |

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
