## What I found

Your Drive link is a zip bundle containing all three assets:

- `hero-duet.jpg`
- `logo-badge.png`
- `brand-banner.jpg` (note: currently placeholder is `brand-banner.png`)

Plus a nested `brand_assets.zip` (will ignore unless you say otherwise).

## Plan

1. **Download & extract** the Drive zip into `/tmp` and pull out the three images.
2. **Replace the placeholders** in `src/assets/`:
   - `src/assets/hero-duet.jpg` ← real hero
   - `src/assets/logo-badge.png` ← real logo
   - Add `src/assets/brand-banner.jpg` and update any import currently pointing at `brand-banner.png` to the `.jpg` (then delete the old `.png` placeholder).
3. **Verify imports** — grep `src/` for references to each filename and confirm components still resolve (no path/extension drift).
4. **Optional but recommended:** push these (especially the hero, which is likely the largest) to the Lovable CDN via `lovable-assets` so the repo stays light and OG/share previews load fast. Say the word if you want that; otherwise I'll keep them in `src/assets/` as direct imports.
5. **Quick visual check** — load `/` in the preview and confirm hero, nav logo, and brand banner render correctly.

No content, copy, layout, or route changes. Purely an image swap.
