# Live Tracker + Bridge Contributions

## What gets built

### 1. BackaBuddy live total (server-side scrape, 10-min cache)
- Server function `getBackabuddyStats()` fetches the public campaign page, parses the raised ZAR amount and supporter count from the HTML, caches the result in a small `cache_kv` table for ~10 minutes, and falls back to the last-known good value if the scrape fails.
- Both `ProgressBar` instances (home + `/campaign`) load this value via TanStack Query — no more hard-coded `raised={5000}`.
- A small "Last updated X min ago • source: BackaBuddy" line sits under the bar so it's clear where the number comes from.

### 2. Bridge-support contributions (Lovable Cloud table + form)
- New table `contributions(id, name, amount_cents, reference, message, verified, created_at)` with RLS: anyone can `INSERT` and `SELECT`, only admins can `UPDATE`.
- Standard `app_role` enum + `user_roles` table + `has_role()` security-definer function, per the user-roles pattern.
- A form on `/campaign` (and a compact version on `/`) inside the bridge-support card:
  - Fields: Name, Amount (ZAR), EFT reference, optional message.
  - Zod validation, friendly toast on success, posts via a public server fn.
- The bridge card publicly shows two totals side by side:
  - **Committed** = sum of all submissions (auto, immediate)
  - **Verified** = sum of submissions Phil has confirmed against his bank statement
- Below the totals: a short, paginated list of recent contributions (name + amount + ✓ if verified) so it's transparent.

### 3. Admin verification page
- New route `src/routes/_authenticated/admin.tsx`.
- Lists unverified contributions; a "Mark verified" button calls an admin-only server fn (`requireSupabaseAuth` + `has_role(..., 'admin')`).
- Sign-in uses Lovable Cloud email/password (Phil's account) — `/auth` route is auto-provisioned by the integration.
- Phil promotes himself to `admin` once via a one-off SQL insert he runs in Cloud → SQL editor; instructions included in the chat after deploy.

## Technical notes

- **Backend on**: enabling Lovable Cloud.
- **Scrape**: plain `fetch` against `https://www.backabuddy.co.za/campaign/she-sang-to-a-tortoise` from a server function. Parse with a couple of resilient regexes targeting the "Raised" figure and supporter count. Wrapped in try/catch; on failure return cached value.
- **Cache table**: `cache_kv(key text primary key, value jsonb, expires_at timestamptz)` keeps the implementation tiny and avoids needing a cron.
- **Files**:
  - `supabase/migrations/<ts>_bridge_contributions.sql` — enum, tables, RLS, grants, has_role.
  - `src/lib/contributions.functions.ts` — `submitContribution`, `listContributions`, `getContributionTotals`, `markContributionVerified` (admin).
  - `src/lib/backabuddy.functions.ts` — `getBackabuddyStats` (public, cached).
  - `src/components/site/BackabuddyProgress.tsx` — wraps `ProgressBar` with live data.
  - `src/components/site/ContributionForm.tsx` — the EFT submission form.
  - `src/components/site/BridgeSupportSection.tsx` — totals + list + form, reused on home + campaign.
  - `src/routes/_authenticated/admin.tsx` (and `_authenticated/route.tsx` if not present).

## After deploy
- I'll give Phil the one-line SQL to grant himself `admin`, and a quick check that the BackaBuddy scrape is returning the right number.
- He still clicks **Publish** to push everything to the live domain.
