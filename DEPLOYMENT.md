# Deployment Requirements

## Vercel Environment Variables

Both variables must be added under **Project Settings → Environment Variables** for **Production** and **Preview** environments.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL — `https://rzldnagyqwahvlqkvvdv.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous public API key (JWT format) |

> **Critical:** Vercel should define `VITE_SUPABASE_ANON_KEY`. The client temporarily falls back to the legacy `VITE_SUPABASE_PUBLISHABLE_KEY`, but that name should be retired.

Local dev: the repo currently has the legacy publishable key name in `.env.local`. It still works because the client falls back to it, but the next env update should rename it to `VITE_SUPABASE_ANON_KEY`.

## Supabase Table

The configured Supabase project currently exposes `email_captures` to the public anon client. The frontend now prefers `waitlist` if that table is available, and falls back to `email_captures` when the project has not been migrated yet.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `email` | `text` | Unique — duplicate inserts return Postgres error code `23505` |
| `name` | `text` | Nullable — collected on the waitlist form when supported by the project |
| `source` | `text` | Tracks origin: URL `?ref=` param, defaults to `"direct"` or `"academy"` |
| `interest` | `text` | Legacy nullable field on `email_captures` |
| `created_at` | `timestamptz` | `now()` |

## RLS Policies

Public write behavior is intentionally insert-only for the anon client.

- `anon` role — INSERT only (public submissions)

No SELECT for `anon` — the front-end cannot read the list.

## Source Tracking

The `source` column is populated from the `?ref=` URL query param:

| Page | Default source |
|---|---|
| `/waitlist` | `"direct"` |
| `/academy` | `"academy"` |

Example: `/waitlist?ref=linkedin` → `source = "linkedin"`
