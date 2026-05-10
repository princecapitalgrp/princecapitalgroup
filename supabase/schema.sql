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
-- Seed data: trade_breakdowns
-- ─────────────────────────────────────────────
INSERT INTO public.trade_breakdowns (name, date, pair, session, side, tags, description) VALUES
(
  'GBPUSD MR DOL Invalidation',
  '2026-02-26',
  'GBPUSD',
  'Thursday',
  'High',
  ARRAY['Stop Hunt', 'Structure'],
  'Mean reversion setup on Dollar invalidation. Price closed back inside the range after sweeping the high. High-probability mean reversion candidate but trade was not taken due to insufficient z-score confirmation.'
),
(
  'EURGBP Mean Reversion',
  '2026-02-23',
  'EURGBP',
  'Monday',
  'High',
  ARRAY['Mispricing', 'Z-Score'],
  'Cross-pair mispricing detected on synthetic vs quoted dislocation. Z-score ≥ 2.0 triggered entry. Trade taken and closed at 2.14x multiple. Excellent confluence between structure and z-score analysis.'
),
(
  'EURUSD MRH Sweep',
  '2026-02-10',
  'EURUSD',
  'Tuesday',
  'High',
  ARRAY['Macro Filter', 'Structure'],
  'Monthly range high sweep with ECB rate differential as macro filter. Setup showed strong structure but macro backdrop was risk-off. Trade not taken due to conflicting macro filter signal.'
),
(
  '+$CR T from MRL',
  '2026-02-06',
  'EURUSD',
  'Asia',
  'Low',
  ARRAY['Stop Hunt', 'Risk'],
  'Turtle soup setup on MRL (monthly range low). Stop hunt pattern identified but z-score was only 1.2 — below minimum 2.0 threshold. Trade not taken. Setup anatomy logged for future reference.'
),
(
  'Asia Highs Sweep Bullish 02s Pump Fake',
  '2026-02-03',
  'EURUSD',
  'Asia',
  'High',
  ARRAY['Liquidity Run', 'Mispricing'],
  'Bullish 02s pump fake on Asia highs. Z-score showed 2.5 standard deviations from mean. Trade taken and closed at 2.5x multiple. Perfect alignment of structure, z-score, and macro filter.'
),
(
  'Weekly TS of HTF Highs in +htf',
  '2025-04-21',
  'EURUSD',
  'Monday',
  'High',
  ARRAY['Liquidity Run', 'Macro Filter'],
  'Weekly turtle soup of higher timeframe highs. Macro filter showed strong risk-on environment. Trade taken and closed at breakeven after hitting stop loss. Process was correct despite negative outcome.'
);
