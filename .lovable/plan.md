# She Sang to a Tortoise — Campaign Site

Multi-page editorial campaign site for ThatGuy Productions International. Cinematic, warm, NYT-longform-meets-label-artist-page. Indigo→amber palette pulled from the hero photo, gold for all interactive elements, slow fade-and-rise motion.

## Assets

**You'll upload next:**
- `src/assets/hero-duet.jpg`
- `src/assets/logo-badge.png`
- `src/assets/brand-banner.png`

**From your zip (I'll wire in):**
- `src/assets/banking-qr.png` (from `banking_qr.png`)
- `public/assets/Commitment_Letter_Zinhle_ThatGuy_signed.docx`
- `public/assets/Artist_Development_Agreement_Zinhle_ThatGuy_signed.docx`
- `PW_Bolke_signature_transparent.png` kept under `src/assets/` for future use (not displayed unless asked)

`.docx` files live under `public/assets/` so the browser serves correct MIME and `<a download>` triggers a real save.

## Routes (TanStack file-based)
```
src/routes/
  __root.tsx     Nav + Footer shell, sitewide defaults
  index.tsx      / — hero, story/music/campaign teasers, share
  story.tsx      /story — full longform, per-paragraph fade-in
  music.tsx      /music — YouTube embed (nrwV-a9cS3Y) + single gold "Watch on YouTube" CTA, credits
  campaign.tsx   /campaign — campaign copy, progress bar, BackaBuddy CTA, bridge-support card
  about.tsx      /about — brand banner, bio, YouTube + Facebook links
  resources.tsx  /resources — two DocCards with real .docx downloads
  share.tsx      /share — share buttons, direct contact row, mailto form
```

Each route has its own `head()` (title, description, og:title, og:description). `og:image` only on `/` (hero photo). Canonical on each leaf.

## Design system (`src/styles.css`)

CSS tokens (oklch conversions of your hex):
- `--ink #08080a`, `--indigo #2d1a73`, `--navy #041d3f`, `--amber #f5a86d`, `--gold #c9a84c`, `--offwhite #faf9f7`, `--cream #e8e4dc`
- Gradients: `--gradient-night` (indigo→navy→ink), `--glow-amber`, `--glow-gold`

Discipline: gold = interactive only; indigo/navy = atmosphere; amber = rare emphasis.

Fonts via `@fontsource/playfair-display` + `@fontsource/lora`, imported once at app entry, wired into Tailwind theme as `font-display` / `font-body`.

Motion: framer-motion `whileInView` fade+rise (y:24→0, opacity 0→1, 700ms ease-out).

## Components
- `SiteNav` — logo badge left, links right, transparent over hero → solid `--ink` with gold underline on scroll, shadcn Sheet hamburger on mobile
- `SiteFooter` — badge, repeated nav, tagline, dynamic year
- `Hero` — full-bleed `h-dvh` photo, indigo/navy gradient overlay on bottom third, centered title + subtitle, gold scroll cue
- `SectionTeaser` — heading + lede + gold "→" link
- `ProgressBar` — gold fill, props `raised` / `target` (default 0 / 250000 ZAR)
- `ShareButtons` — Facebook, WhatsApp, Copy Link (dynamic page URL, "Copied!" state via `navigator.clipboard`)
- `DocCard` — title, one-line description, gold download button with `download` attr
- `BankingDetails` — labeled fields + QR image, distinctly styled card

## Page specifics

- **Home** — hero, 2-paragraph story teaser → /story, music teaser → /music, campaign teaser w/ progress bar → /campaign, closing share block.
- **Story** — verbatim longform, off-white bg, ink text, fade-in per paragraph, ends with gold "Listen to her voice →" to /music.
- **Music** — heading "Listen first." + Blue Tick subtext, 16:9 YouTube embed `nrwV-a9cS3Y`, **single** gold "Watch on YouTube" pill → `https://youtu.be/nrwV-a9cS3Y`, credits line. No Spotify anywhere.
- **Campaign** — verbatim campaign paragraphs, gold progress bar, BackaBuddy CTA (`BACKABUDDY_CAMPAIGN_SLUG_PLACEHOLDER`), visually distinct bridge-support card below with banking details + QR, explicitly labeled interim bridge support to Phil Bölke.
- **About** — full-width brand banner, bio paragraph, link row: YouTube + Facebook (`https://www.facebook.com/ThatGuyOfficial`). No Spotify.
- **Resources** — heading "Documentation." + intro, two DocCards linking to real `.docx` files.
- **Share** — share buttons row, separate "Message Phil directly" row (WhatsApp `https://wa.me/27648927071` + email `philb.tgp@gmail.com`), simple mailto contact form.

## Placeholders (commented in source)
- `BACKABUDDY_CAMPAIGN_SLUG_PLACEHOLDER`
- Progress bar `raised` value

## Technical
- Real TanStack client routing, internal `<Link>`, external links `target="_blank" rel="noopener noreferrer"`
- A11y: heading hierarchy, alt text, aria-labels on icon buttons, gold keyboard focus rings, AA contrast verified
- Mobile-first; hero `h-dvh`
- `.docx` downloads via `<a href="/assets/...docx" download>` from `public/`

Once you upload hero/logo/banner, the site is complete and ready to publish.