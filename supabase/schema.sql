-- PCG Supabase Schema
-- Run this in the Supabase SQL editor at: https://supabase.com/dashboard/project/rzldnagyqwahvlqkvvdv/sql
-- Tables: email_captures, weekly_memos, trade_breakdowns

-- ─────────────────────────────────────────────
-- 1. email_captures
--    Stores waitlist sign-ups. Anonymous users can INSERT only.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.email_captures (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  name        text,
  interest    text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_captures_email_unique UNIQUE (email)
);

ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (waitlist sign-up)
CREATE POLICY "anon_insert_email_captures"
  ON public.email_captures
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block anonymous reads (email privacy)
-- Only service role / authenticated admins can SELECT


-- ─────────────────────────────────────────────
-- 2. weekly_memos
--    PCG weekly process memos. Public read-only.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.weekly_memos (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL,
  content          text NOT NULL,
  adherence_score  integer NOT NULL CHECK (adherence_score BETWEEN 0 AND 100),
  week_of          date NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.weekly_memos ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads
CREATE POLICY "anon_select_weekly_memos"
  ON public.weekly_memos
  FOR SELECT
  TO anon
  USING (true);


-- ─────────────────────────────────────────────
-- 3. trade_breakdowns
--    Setup anatomy library. Public read-only.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.trade_breakdowns (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  date         date NOT NULL,
  pair         text NOT NULL,
  session      text NOT NULL,
  side         text NOT NULL CHECK (side IN ('High', 'Low', 'Neutral')),
  tags         text[] NOT NULL DEFAULT '{}',
  description  text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.trade_breakdowns ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads
CREATE POLICY "anon_select_trade_breakdowns"
  ON public.trade_breakdowns
  FOR SELECT
  TO anon
  USING (true);


-- ─────────────────────────────────────────────
-- 4. macro_museum_posts
--    Research and analysis articles. Public read-only.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.macro_museum_posts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title               text NOT NULL,
  content             text NOT NULL,
  category            text NOT NULL CHECK (category IN ('analysis', 'case_study', 'framework', 'macro_view')),
  tags                text[] NOT NULL DEFAULT '{}',
  featured_image_url  text,
  author              text NOT NULL,
  published_at        timestamptz NOT NULL DEFAULT now(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.macro_museum_posts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads
CREATE POLICY "anon_select_macro_museum_posts"
  ON public.macro_museum_posts
  FOR SELECT
  TO anon
  USING (true);


-- ─────────────────────────────────────────────
-- Seed data: macro_museum_posts
-- ─────────────────────────────────────────────
INSERT INTO public.macro_museum_posts (title, content, category, author, tags) VALUES
(
  'The Macro Edge: High-Probability Convergence',
  'Convergence between fundamental data and technical structure provides the highest edge in modern markets...',
  'framework',
  'PCG Research',
  ARRAY['Framework', 'Edge']
),
(
  'Q1 2026 Global Outlook',
  'Analyzing the shift in G7 monetary policy and its impact on carry trades...',
  'macro_view',
  'Macro Team',
  ARRAY['Outlook', 'Monetary Policy']
);


-- ─────────────────────────────────────────────
-- Seed data: weekly_memos
-- ─────────────────────────────────────────────
INSERT INTO public.weekly_memos (title, content, adherence_score, week_of) VALUES
(
  'Week of Mar 24, 2026',
  'Strong adherence to signal stack this week. Z-scores remained within expected ranges. One trade hit SL due to macro event risk not fully accounted for. Lesson: increase event risk buffer on high-impact news days. Three trades taken, two closed at profit, one at breakeven. Overall process quality excellent.',
  92,
  '2026-03-24'
),
(
  'Week of Mar 17, 2026',
  'Moderate week with mixed signals. EURUSD showed strong structure but z-scores were inconclusive. Passed on two setups due to insufficient confluence. One discretionary override on Tuesday — logged as rule breach. Adherence score reflects this deviation. Macro filter correctly identified risk-off environment.',
  88,
  '2026-03-17'
),
(
  'Week of Mar 10, 2026',
  'Excellent execution week. All five trades followed pre-defined criteria. Z-scores aligned perfectly with price action. No discretionary overrides. Kill-switch protocol tested but not triggered. Weekly drawdown limit respected. Setup anatomy consistent across all trades. Process discipline at peak.',
  95,
  '2026-03-10'
);


-- ─────────────────────────────────────────────
-- 5. waitlist
--    Stores waitlist sign-ups. Anonymous users can INSERT only.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.waitlist (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  source      text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_email_unique UNIQUE (email)
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (waitlist sign-up)
CREATE POLICY "anon_insert_only"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

