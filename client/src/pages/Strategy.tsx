/*
 * PCG Strategy Page
 * Design: Editorial Authority — strategy-bg hero, signal stack sections
 * Sections: Hero, Signal Stack, Cross-Pair Mispricing, Macro Filters, Scope, Interpretation Note
 */

import { useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, GitMerge, Globe, AlertCircle } from "lucide-react";
import { Link } from "wouter";

const STRATEGY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-strategy-bg-SiZWbmuevCpcAsjAwJ5uNx.webp";

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

const signalComponents = [
  {
    icon: TrendingUp,
    number: "01",
    title: "Structure & Timing Framework",
    subtitle: "Range / Structure-Based Execution",
    description:
      "The primary execution layer identifies market structure through price action: key levels, range boundaries, and structural pivots. Timing is derived from session overlap dynamics and liquidity windows. Entries are only considered when price is at a structurally meaningful location with defined invalidation.",
    tags: ["Price Action", "Market Structure", "Session Timing", "Liquidity Windows"],
  },
  {
    icon: GitMerge,
    number: "02",
    title: "Cross-Pair Mispricing Logic",
    subtitle: "Triangle Dislocation & Basis Analysis",
    description:
      "The secondary layer identifies synthetic vs. quoted cross-pair dislocations. When a synthetic cross (e.g., EUR/GBP derived from EUR/USD and GBP/USD) deviates meaningfully from the quoted cross, a basis dislocation exists. Z-score normalization quantifies the magnitude of this deviation relative to historical distribution, providing an objective measure of mispricing.",
    tags: ["Synthetic Cross", "Quoted Cross", "Basis / Z-Score", "Triangle Dislocation"],
    callout: {
      title: "Educational Note: Basis & Z-Score",
      content:
        "Basis refers to the spread between a synthetic cross rate and its quoted equivalent. A z-score measures how many standard deviations the current basis sits from its rolling mean. This is a purely educational framework — it does not constitute a trading signal or investment advice.",
    },
  },
  {
    icon: Globe,
    number: "03",
    title: "Macro Filters",
    subtitle: "Rates / Regime / Event Risk",
    description:
      "The tertiary layer applies top-down macro context as a directional filter. Rate differentials between central banks, prevailing risk regime (risk-on / risk-off), and scheduled event risk (central bank decisions, CPI, NFP) are assessed to determine whether the macro backdrop supports or contradicts the structural and mispricing signals.",
    tags: ["Rate Differentials", "Risk Regime", "Event Risk Calendar", "Central Bank Policy"],
  },
];

const g10Pairs = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF",
  "AUD/USD", "NZD/USD", "USD/CAD", "EUR/GBP",
  "EUR/JPY", "GBP/JPY",
];

export default function Strategy() {
  const pageRef = useScrollFadeUp();

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          backgroundImage: `url(${STRATEGY_BG})`,
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
          <div className="pcg-section-label mb-4 fade-up">Strategy Framework</div>
          <h1
            className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
            style={{ fontFamily: "'Playfair Display', serif", maxWidth: "700px" }}
          >
            The Signal Stack
          </h1>
          <p
            className="text-lg leading-relaxed fade-up"
            style={{ color: "oklch(0.80 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif", maxWidth: "580px" }}
          >
            A three-layer confluence framework for G10 FX: structure-based execution, cross-pair mispricing, and macro regime filters — all gates must align before a trade plan is formed.
          </p>
        </div>
      </section>

      {/* ── SIGNAL STACK ── */}
      <section className="container py-20 md:py-28">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Signal Architecture</div>
        </div>
        <div className="flex items-end justify-between mb-16 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Three-Layer Confluence
          </h2>
          <div className="pcg-section-number hidden md:block">03</div>
        </div>

        <div className="space-y-8">
          {signalComponents.map((component, i) => {
            const Icon = component.icon;
            return (
              <div
                key={component.number}
                className="pcg-card p-8 md:p-10 fade-up"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left: Number + Icon */}
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4">
                    <div
                      className="text-5xl font-bold leading-none"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228 / 30%)" }}
                    >
                      {component.number}
                    </div>
                    <div
                      className="w-10 h-10 flex items-center justify-center border"
                      style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                    >
                      <Icon size={18} style={{ color: "oklch(0.52 0.07 228)" }} />
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-10">
                    <div
                      className="text-xs mb-1"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      {component.subtitle}
                    </div>
                    <h3
                      className="text-white text-2xl font-bold mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {component.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {component.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {component.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-3 py-1 border"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "oklch(0.52 0.07 228)",
                            borderColor: "oklch(0.52 0.07 228 / 25%)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Callout */}
                    {component.callout && (
                      <div className="pcg-disclaimer">
                        <div
                          className="font-medium mb-1"
                          style={{ color: "oklch(0.75 0.07 228)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}
                        >
                          {component.callout.title}
                        </div>
                        {component.callout.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SCOPE ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Market Scope</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="fade-up">
              <h2
                className="text-white text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                G10 FX Focus
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                PCG operates exclusively within the G10 foreign exchange universe. This includes the major EUR, GBP, and USD crosses, as well as JPY, CHF, AUD, NZD, and CAD pairs. The G10 universe offers the deepest liquidity, tightest spreads, and the most robust macro data environment for systematic analysis.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                EUR/GBP/USD crosses are particularly relevant for the triangle dislocation framework, as the three-way relationship between these currencies creates frequent basis opportunities.
              </p>
            </div>
            <div className="fade-up">
              <div
                className="text-xs mb-4"
                style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.07 228)" }}
              >
                Active Pairs
              </div>
              <div className="grid grid-cols-2 gap-2">
                {g10Pairs.map((pair) => (
                  <div
                    key={pair}
                    className="pcg-card px-4 py-3"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.875rem", color: "oklch(0.85 0.03 243)" }}
                  >
                    {pair}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERPRETATION NOTE ── */}
      <section className="container py-16">
        <div className="fade-up">
          <div
            className="flex items-start gap-4 p-8 md:p-10"
            style={{ border: "1px solid oklch(0.52 0.07 228 / 30%)", background: "oklch(0.20 0.04 243)" }}
          >
            <AlertCircle size={20} style={{ color: "oklch(0.52 0.07 228)", marginTop: "2px" }} className="shrink-0" />
            <div>
              <div
                className="text-xs mb-3"
                style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.07 228)" }}
              >
                How to Interpret Our Work
              </div>
              <h3
                className="text-white text-xl font-semibold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Educational, Probabilistic, Not Advice
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                All strategy documentation published by PCG is intended as an educational record of our research process. The signal stack described here represents a framework for thinking about market structure and confluence — it is not a trading system, not a set of rules to be followed, and not investment advice.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                Markets are probabilistic environments. No framework guarantees outcomes. Our process documentation is shared to demonstrate disciplined thinking, not to suggest that any particular outcome is predictable or replicable. Always conduct your own research and consult qualified financial professionals before making any trading decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT: RISK ── */}
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
                Risk & Governance
              </h3>
            </div>
            <Link href="/risk">
              <button className="pcg-btn-outline flex items-center gap-2">
                View Risk Framework <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
