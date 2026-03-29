/*
 * PCG Strategy Page
 * Design: Editorial Authority — strategy-bg hero, signal stack sections
 * Sections: Hero, Signal Stack (reordered to emphasize z-score), Macro Filters, Scope, Interpretation Note
 * SEO: Dynamic meta tags with useSEO hook
 */

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  TrendingUp,
  GitMerge,
  Globe,
  AlertCircle,
} from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

const STRATEGY_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-strategy-bg-SiZWbmuevCpcAsjAwJ5uNx.webp";

function useScrollFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    el.querySelectorAll(".fade-up").forEach(e => observer.observe(e));
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
    tags: [
      "Price Action",
      "Market Structure",
      "Session Timing",
      "Liquidity Windows",
    ],
  },
  {
    icon: GitMerge,
    number: "02",
    title: "Rolling Z-Score Analysis",
    subtitle: "Statistical Mispricing Detection",
    description:
      "The secondary layer uses rolling z-score normalization to identify statistical dislocations in cross-pair relationships. Z-scores measure how many standard deviations the current basis sits from its rolling mean, providing an objective quantification of mispricing magnitude. This layer emphasizes prolonged statistical stretching and mean-reversion potential, detecting when synthetic vs. quoted cross pairs deviate significantly from their historical distribution.",
    tags: [
      "Rolling Z-Score",
      "Statistical Stretching",
      "Basis Analysis",
      "Mean Reversion",
    ],
    callout: {
      title: "Educational Note: Z-Score Methodology",
      content:
        "A z-score measures the number of standard deviations a data point is from the rolling mean. In FX analysis, rolling z-scores identify when cross-pair relationships deviate significantly from their historical norms. A z-score ≥ 2.0 indicates the basis is at least 2 standard deviations from the mean, suggesting potential mean-reversion opportunity. This is a purely educational framework — it does not constitute a trading signal or investment advice.",
    },
  },
  {
    icon: Globe,
    number: "03",
    title: "Macro Filters",
    subtitle: "Rates / Regime / Event Risk",
    description:
      "The tertiary layer applies top-down macro context as a directional filter. Rate differentials between central banks, prevailing risk regime (risk-on / risk-off), and scheduled event risk (central bank decisions, CPI, NFP) are assessed to determine whether the macro backdrop supports or contradicts the structural and statistical signals.",
    tags: [
      "Rate Differentials",
      "Risk Regime",
      "Event Risk Calendar",
      "Central Bank Policy",
    ],
  },
];

const g10Pairs = [
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "USD/CHF",
  "AUD/USD",
  "NZD/USD",
  "USD/CAD",
  "EUR/GBP",
  "EUR/JPY",
  "GBP/JPY",
];

export default function Strategy() {
  useSEO({
    title: "FX Strategy & Signal Stack | Prince Capital Group",
    description:
      "Learn our confluence-gated signal stack approach to G10 FX trading: structure/timing frameworks, rolling z-score analysis, and macro filters.",
    canonical: "https://princecapitalgroup.com/strategy",
  });

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
          <div className="pcg-section-label mb-4 fade-up">
            Strategy Framework
          </div>
          <h1
            className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
            style={{
              fontFamily: "'Playfair Display', serif",
              maxWidth: "700px",
            }}
          >
            The Signal Stack
          </h1>
          <p
            className="text-lg leading-relaxed mb-8 fade-up"
            style={{
              color: "oklch(0.80 0.03 243)",
              fontFamily: "'IBM Plex Sans', sans-serif",
              maxWidth: "600px",
            }}
          >
            A three-layer confluence framework built on structure, statistical
            analysis, and macro context. Disciplined entry criteria with defined
            risk parameters.
          </p>
          <Link href="/contact">
            <button className="pcg-btn-primary flex items-center gap-2 fade-up">
              Get in Touch <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── SIGNAL STACK LAYERS ── */}
      <section className="py-20 md:py-28 container">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Three-Layer Confluence</div>
        </div>
        <div className="flex items-end justify-between mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Confluence Gating Framework
          </h2>
        </div>

        <div className="space-y-12">
          {signalComponents.map(component => {
            const Icon = component.icon;
            return (
              <div key={component.number} className="fade-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left: Icon & Number */}
                  <div className="flex flex-col items-start">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                      style={{
                        background: "oklch(0.52 0.07 228 / 15%)",
                        border: "1px solid oklch(0.52 0.07 228 / 40%)",
                      }}
                    >
                      <Icon
                        size={28}
                        style={{ color: "oklch(0.52 0.07 228)" }}
                      />
                    </div>
                    <div
                      className="text-4xl font-bold"
                      style={{
                        color: "oklch(0.52 0.07 228 / 40%)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {component.number}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-2">
                    <h3
                      className="text-white text-2xl font-bold mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {component.title}
                    </h3>
                    <div
                      className="text-sm mb-4"
                      style={{
                        color: "oklch(0.52 0.07 228)",
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {component.subtitle}
                    </div>
                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{
                        color: "oklch(0.80 0.03 243)",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      {component.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {component.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded"
                          style={{
                            background: "oklch(0.52 0.07 228 / 15%)",
                            color: "oklch(0.52 0.07 228)",
                            fontFamily: "'IBM Plex Mono', monospace",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Callout */}
                    {component.callout && (
                      <div
                        className="p-4 rounded-lg border-l-4"
                        style={{
                          background: "oklch(0.52 0.07 228 / 8%)",
                          borderColor: "oklch(0.52 0.07 228)",
                        }}
                      >
                        <div
                          className="text-sm font-semibold mb-2 flex items-center gap-2"
                          style={{ color: "oklch(0.52 0.07 228)" }}
                        >
                          <AlertCircle size={16} />
                          {component.callout.title}
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: "oklch(0.75 0.03 243)",
                            fontFamily: "'IBM Plex Sans', sans-serif",
                          }}
                        >
                          {component.callout.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── G10 SCOPE ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Market Scope</div>
          </div>
          <div className="flex items-end justify-between mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              G10 FX Focus
            </h2>
          </div>

          <div className="fade-up">
            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "oklch(0.80 0.03 243)",
                fontFamily: "'IBM Plex Sans', sans-serif",
                maxWidth: "700px",
              }}
            >
              PCG operates exclusively within the G10 currency complex. This
              universe includes the major developed market currencies and their
              cross-pairs, offering sufficient liquidity, tight spreads, and
              reliable data for rigorous analysis.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {g10Pairs.map(pair => (
                <div
                  key={pair}
                  className="p-4 rounded-lg text-center fade-up"
                  style={{
                    background: "oklch(0.22 0.04 243)",
                    border: "1px solid oklch(0.52 0.07 228 / 30%)",
                  }}
                >
                  <div
                    className="text-sm font-semibold"
                    style={{
                      color: "oklch(0.52 0.07 228)",
                      fontFamily: "'IBM Plex Mono', monospace",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {pair}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERPRETATION NOTE ── */}
      <section className="py-20 md:py-28 container">
        <div className="fade-up">
          <div
            className="p-8 rounded-lg"
            style={{
              background: "oklch(0.52 0.07 228 / 8%)",
              border: "1px solid oklch(0.52 0.07 228 / 40%)",
            }}
          >
            <div className="flex items-start gap-4">
              <AlertCircle
                size={24}
                style={{
                  color: "oklch(0.52 0.07 228)",
                  marginTop: "4px",
                  flexShrink: 0,
                }}
              />
              <div>
                <h3
                  className="text-white text-lg font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  How to Interpret Our Work
                </h3>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{
                    color: "oklch(0.80 0.03 243)",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  Everything published by PCG is educational in nature. Our
                  signal stack, z-score analysis, and process documentation are
                  presented to illustrate our disciplined approach to FX
                  trading. These materials do not constitute investment advice,
                  trading signals, or recommendations of any kind.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "oklch(0.80 0.03 243)",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  We trade proprietary capital only. We do not manage client
                  funds, provide advisory services, or accept external capital.
                  All content is probabilistic in nature and reflects our
                  internal research framework — not a guaranteed path to
                  profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
