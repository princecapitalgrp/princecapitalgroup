/*
 * PCG Risk & Governance Page
 * Design: Editorial Authority — risk-bg hero, governance loop sections
 * Sections: Hero, Risk Philosophy, Governance Loop, Pre-trade Checklist, Risk Limits, Review Cadence, Breach Protocol, Disclaimer
 */

import { useEffect, useRef } from "react";
import { Shield, CheckSquare, AlertTriangle, RotateCcw, Pause, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const RISK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-risk-bg-2Dzyx2bvpWc4oKbKzREXwF.webp";

function useScrollFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    el.querySelectorAll(".fade-up").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const philosophyPrinciples = [
  {
    title: "Capital Preservation First",
    description:
      "The primary objective is not profit maximisation — it is the preservation of trading capital. Every decision is evaluated through the lens of downside protection before upside potential.",
  },
  {
    title: "Discipline Over Discretion",
    description:
      "Rules are defined in advance and followed without exception. Discretionary overrides are treated as rule breaches and logged accordingly. The process is the product.",
  },
  {
    title: "Systematic De-Risking",
    description:
      "Position sizing is reduced — not increased — as drawdown deepens. De-risking triggers are pre-defined and automatic, removing emotional decision-making from adverse conditions.",
  },
  {
    title: "Kill-Switch Culture",
    description:
      "When defined thresholds are breached, trading stops. Full stop. The kill-switch is not a last resort — it is a planned, respected component of the governance framework.",
  },
];

const preTradeChecklist = [
  "Is there a clear structural level or range boundary?",
  "Does the signal stack show minimum required confluence?",
  "Has the macro filter been assessed — rates, regime, event risk?",
  "Is there a defined invalidation level?",
  "Has position size been calculated per risk limits?",
  "Is there a scheduled high-impact event within the trade window?",
  "Has the weekly drawdown limit been checked?",
  "Is the trade plan documented before entry?",
];

const riskLimitCategories = [
  {
    category: "Per-Trade Risk",
    description: "Maximum capital at risk on any single trade, defined as a fixed percentage of the trading account. No exceptions.",
  },
  {
    category: "Daily Loss Limit",
    description: "A maximum daily loss threshold. When reached, all positions are closed and no new trades are initiated for the remainder of the session.",
  },
  {
    category: "Weekly Drawdown Limit",
    description: "A weekly drawdown ceiling that triggers a mandatory pause-and-review period before trading resumes.",
  },
  {
    category: "Drawdown Kill-Switch",
    description: "A cumulative drawdown threshold that activates the kill-switch protocol: all trading halts pending a formal review and reset process.",
  },
  {
    category: "Concentration Limit",
    description: "Maximum exposure to correlated pairs or directional themes. Prevents over-concentration in a single macro narrative.",
  },
  {
    category: "Leverage Ceiling",
    description: "An absolute maximum leverage ratio that cannot be exceeded regardless of perceived opportunity quality.",
  },
];

const governanceLoop = [
  { step: "01", title: "Pre-Trade Checklist", icon: CheckSquare, description: "All criteria verified before any trade plan is formed." },
  { step: "02", title: "Risk Limits Applied", icon: Shield, description: "Position size calculated and limits confirmed." },
  { step: "03", title: "Trade Executed", icon: ArrowRight, description: "Entry only after full checklist and plan documentation." },
  { step: "04", title: "Active Monitoring", icon: AlertTriangle, description: "Position monitored against invalidation and limits." },
  { step: "05", title: "Journal Entry", icon: CheckSquare, description: "Trade documented regardless of outcome." },
  { step: "06", title: "Weekly Review Memo", icon: RotateCcw, description: "Process quality assessed, not P&L." },
];

export default function Risk() {
  const pageRef = useScrollFadeUp();

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          backgroundImage: `url(${RISK_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.04 243 / 80%) 0%, oklch(0.18 0.04 243 / 90%) 60%, oklch(0.22 0.04 243) 100%)",
          }}
        />
        <div className="relative container">
          <div className="pcg-section-label mb-4 fade-up">Risk & Governance</div>
          <h1
            className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
            style={{ fontFamily: "'Playfair Display', serif", maxWidth: "700px" }}
          >
            Preservation, Discipline, and the Kill-Switch
          </h1>
          <p
            className="text-lg leading-relaxed fade-up"
            style={{ color: "oklch(0.80 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif", maxWidth: "580px" }}
          >
            Risk governance is not a constraint on performance — it is the foundation of sustainable execution. Every rule exists to protect the process from the trader's own psychology.
          </p>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="container py-20 md:py-28">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Risk Philosophy</div>
        </div>
        <div className="flex items-end justify-between mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Four Governing Principles
          </h2>
          <div className="pcg-section-number hidden md:block">04</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {philosophyPrinciples.map((principle, i) => (
            <div
              key={principle.title}
              className="pcg-card p-8 fade-up"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="text-xs mb-3"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {String(i + 1).padStart(2, "0")}.
              </div>
              <h3
                className="text-white text-xl font-semibold mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {principle.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GOVERNANCE LOOP ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Governance Loop</div>
          </div>
          <div className="mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Six-Step Governance Cycle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {governanceLoop.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="pcg-card p-6 fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center border shrink-0"
                      style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                    >
                      <Icon size={14} style={{ color: "oklch(0.52 0.07 228)" }} />
                    </div>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em" }}
                    >
                      STEP {item.step}
                    </span>
                  </div>
                  <h3
                    className="text-white text-base font-semibold mb-2"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.62 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRE-TRADE CHECKLIST ── */}
      <section className="container py-20 md:py-28">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Pre-Trade Protocol</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="fade-up">
            <h2
              className="text-white text-3xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Pre-Trade Checklist
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "oklch(0.68 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Every trade requires a complete checklist pass before a plan is formed. There are no shortcuts. An incomplete checklist means no trade — regardless of perceived opportunity.
            </p>
            <div className="space-y-3">
              {preTradeChecklist.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3"
                  style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
                >
                  <div
                    className="w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5"
                    style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                  >
                    <span
                      className="text-[8px]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.78 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Limits */}
          <div className="fade-up">
            <h2
              className="text-white text-3xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Risk Limits Framework
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "oklch(0.68 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Risk limits are defined across six categories. Specific values are calibrated to account size and are not published — the categories and their purpose are documented here for transparency.
            </p>
            <div className="space-y-4">
              {riskLimitCategories.map((limit, i) => (
                <div
                  key={limit.category}
                  className="pcg-card p-5 fade-up"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div
                    className="text-xs mb-2"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    {limit.category}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {limit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEW CADENCE ── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Weekly Review */}
            <div className="fade-up">
              <div className="pcg-section-label mb-4">Review Cadence</div>
              <h2
                className="text-white text-3xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Weekly Review Memo
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.68 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                Every week ends with a structured review memo. The memo evaluates process quality — not returns. Key questions include: Were all checklist items completed? Were risk limits respected? Were setups taken only when confluence criteria were met? Were any rules breached?
              </p>
              <div className="space-y-3">
                {[
                  "Rule adherence rate (% of trades with full checklist)",
                  "Confluence gate pass rate (% of ideas that reached execution)",
                  "Journal completion rate (% of trades documented)",
                  "Risk limit compliance (any breaches this week?)",
                  "Setup quality assessment (structure, timing, macro alignment)",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)", paddingBottom: "0.75rem" }}
                  >
                    <span style={{ color: "oklch(0.52 0.07 228)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem" }}>→</span>
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.75 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breach Protocol */}
            <div className="fade-up">
              <div className="pcg-section-label mb-4">Breach Protocol</div>
              <h2
                className="text-white text-3xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Rule Breach Response
              </h2>
              <div
                className="p-6 mb-6"
                style={{ border: "1px solid oklch(0.577 0.245 27.325 / 30%)", background: "oklch(0.577 0.245 27.325 / 8%)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Pause size={16} style={{ color: "oklch(0.80 0.245 27.325)" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.80 0.245 27.325)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    Pause + Review
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  Any rule breach triggers an immediate pause. Trading stops. A formal review is conducted to identify the breach, understand the cause, and document the corrective action before trading resumes.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { step: "01", action: "Identify the breach — which rule was violated?" },
                  { step: "02", action: "Pause all trading activity immediately." },
                  { step: "03", action: "Document the breach in the trade journal." },
                  { step: "04", action: "Conduct root cause analysis." },
                  { step: "05", action: "Define corrective action and update process notes." },
                  { step: "06", action: "Resume trading only after review is complete." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span
                      className="text-xs shrink-0"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.08em", marginTop: "2px" }}
                    >
                      {item.step}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.75 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {item.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="container py-16">
        <div className="fade-up">
          <div className="pcg-disclaimer">
            <strong style={{ color: "oklch(0.75 0.07 228)" }}>RISK DISCLAIMER:</strong>{" "}
            The risk framework described on this page represents PCG's internal governance approach for proprietary trading. It is published for educational and transparency purposes only. Nothing contained herein constitutes investment advice, a recommendation to trade, or a representation that these risk management techniques are appropriate for any individual. Trading foreign exchange involves substantial risk of loss. Past adherence to a risk framework does not guarantee future capital preservation. All trading involves risk, and you may lose more than your initial investment.
          </div>
        </div>
      </section>

      {/* ── NEXT ── */}
      <section className="container pb-20">
        <div className="fade-up">
          <div className="pcg-rule mb-8" />
          <div className="flex items-center justify-between">
            <div>
              <div className="pcg-section-label mb-2">Next</div>
              <h3
                className="text-white text-xl font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Academy — Educational Resources
              </h3>
            </div>
            <Link href="/academy">
              <button className="pcg-btn-outline flex items-center gap-2">
                View Academy <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
