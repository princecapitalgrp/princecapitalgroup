/*
 * PCG Home Page
 * Design: Editorial Authority — hero with dark overlay, asymmetric sections
 * Sections: Hero, Compliance Box, Pillars, Process, Proof-of-Work, Footer Disclaimer
 * SEO: Dynamic meta tags with useSEO hook
 */

import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Shield,
  BarChart2,
  RefreshCw,
  FileText,
  BookOpen,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-hero-bg-UBP35WQUSoTKrtQSwvhVWz.webp";

// Scroll to top on mount
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const pillars = [
  {
    icon: BarChart2,
    number: "01",
    title: "Strategy",
    description:
      "Confluence-gated signal stack built on structure/timing frameworks, cross-pair mispricing logic, and macro filters. G10 FX focus with disciplined entry criteria.",
    href: "/strategy",
  },
  {
    icon: Shield,
    number: "02",
    title: "Risk",
    description:
      "Capital preservation through pre-trade checklists, defined risk limits, kill-switch protocols, and systematic de-risking rules. Discipline over discretion.",
    href: "/risk",
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "Review",
    description:
      "Weekly audit loops that evaluate rule adherence, process quality, and setup anatomy — not P&L. Continuous iteration drives improvement.",
    href: "/about",
  },
];

const proofOfWork = [
  {
    icon: FileText,
    label: "Weekly Process Memo",
    description:
      "Structured weekly audit of trade process, rule adherence, and setup quality.",
    tag: "Process",
    href: "/academy",
  },
  {
    icon: Shield,
    label: "Risk Toolkit",
    description:
      "Journal templates, pre-trade checklists, and weekly memo frameworks.",
    tag: "Governance",
    href: "/academy",
  },
  {
    icon: Layers,
    label: "Setup Anatomy",
    description:
      "Tagged library of trade setup examples: structure, mispricing, macro filter, risk.",
    tag: "Education",
    href: "/academy",
  },
];

const processDetails = [
  {
    title: "Idea",
    content:
      "Monthly Turtle on EURUSD soup of highs that just closed below the low that swept the high. Furthermore, the ECB is cutting rates while oil prices increase.",
  },
  {
    title: "Signal Stack",
    content:
      "Z-scores indicating prolonged statistical stretching, widening yield differential, high spread momentum and peaking z momentum. Triangle is insignificant.",
  },
  {
    title: "Gate",
    content:
      "Z ≥ 2.0? Spreadmom > -5bps? Zmom < 0? 1d∆ ≥ 8.0bps? Triangle > 1.00?",
  },
  {
    title: "Trade Plan",
    content:
      "High impact news on Wednesday therefore no trades on Tuesday-Wednesday. If Monday accumulation then entry on OB. If no entry, wait for Thursday retest of bb.",
  },
  {
    title: "Execute",
    content: "Model 1 Entry @ 1.02732, Monday at 3:15",
  },
  {
    title: "Monitor",
    content:
      "If Yields rise > 15bps, price wicks below 50% on daily TF, and Zmom > 0 then exit at breakeven.",
  },
  {
    title: "Journal",
    content:
      "SL hit. Psychological error: Overconfidence and FOMO; Technical: Low probability OB; Cognitive error: Disregarded the bullish HTF trend. Therefore, avoid next time.",
  },
  {
    title: "Weekly Review",
    content:
      "What worked and what didn't? Adherence score = 90%. Z-scores did not align with price this week.",
  },
];

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

export default function Home() {
  useSEO({
    title: "Prince Capital Group — Global Macro FX",
    description:
      "Proprietary research-to-execution project focused on G10 FX with disciplined execution. Confluence-gated signal stack, risk governance, and weekly audit loops.",
    canonical: "https://princecapitalgroup.com",
  });

  const pageRef = useScrollFadeUp();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div ref={pageRef}>
      <ScrollToTop />
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-end pb-20 md:pb-28"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.04 243 / 70%) 0%, oklch(0.18 0.04 243 / 85%) 50%, oklch(0.18 0.04 243) 100%)",
          }}
        />

        {/* Top label */}
        <div className="absolute top-28 left-0 right-0 container">
          <div className="pcg-section-label fade-up">
            G10 Foreign Exchange · Proprietary Capital
          </div>
        </div>

        {/* Hero content */}
        <div className="relative container">
          <div className="max-w-3xl">
            <div
              className="text-[oklch(0.52_0.07_228)] text-6xl md:text-8xl font-bold leading-none mb-6 fade-up"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                opacity: 0.15,
                letterSpacing: "-0.04em",
              }}
            >
              PCG
            </div>
            <h1
              className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 fade-up"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.02em",
              }}
            >
              Global Macro FX through Disciplined Execution
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 fade-up"
              style={{
                color: "oklch(0.80 0.03 243)",
                fontFamily: "'IBM Plex Sans', sans-serif",
                maxWidth: "600px",
              }}
            >
              PCG is a proprietary research-to-execution project focused on G10
              FX, built around confluence gating, risk governance, and weekly
              audit loops.
            </p>
            <div className="flex flex-wrap gap-4 fade-up">
              <Link href="/academy">
                <button className="pcg-btn-outline flex items-center gap-2">
                  View Academy <BookOpen size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE BOX ── */}
      <section className="container py-16">
        <div className="fade-up">
          <div
            className="pcg-rule-labeled mb-8"
            style={{
              color: "oklch(0.52 0.07 228)",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scope & Compliance
          </div>
          <div className="pcg-compliance-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div
                  className="text-xs mb-4 flex items-center gap-2"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.52 0.07 228)",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  What We Do
                </div>
                <ul className="space-y-3">
                  {[
                    "Trade proprietary capital only",
                    "Conduct independent macro FX research",
                    "Publish educational process documentation",
                    "Operate under strict risk governance frameworks",
                  ].map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{
                        color: "oklch(0.85 0.03 243)",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div
                  className="text-xs mb-4 flex items-center gap-2"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.52 0.07 228)",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                  What We Don't Do
                </div>
                <ul className="space-y-3">
                  {[
                    "We do not manage client funds",
                    "We do not provide investment advice",
                    "We do not accept external capital",
                    "We do not offer trading signals or recommendations",
                  ].map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{
                        color: "oklch(0.85 0.03 243)",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Core Pillars</div>
          </div>
          <div className="flex items-end justify-between mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The PCG Framework
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map(pillar => {
              const Icon = pillar.icon;
              return (
                <Link key={pillar.title} href={pillar.href}>
                  <div
                    className="fade-up group cursor-pointer p-8 rounded-lg transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: "oklch(0.22 0.04 243)",
                      borderLeft: "3px solid oklch(0.52 0.07 228)",
                    }}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <Icon
                        size={24}
                        style={{ color: "oklch(0.52 0.07 228)" }}
                      />
                      <span
                        className="text-sm font-mono"
                        style={{
                          color: "oklch(0.52 0.07 228)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {pillar.number}
                      </span>
                    </div>
                    <h3
                      className="text-white text-xl font-bold mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{
                        color: "oklch(0.65 0.03 243)",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      {pillar.description}
                    </p>
                    <div
                      className="flex items-center gap-2 text-xs group-hover:gap-3 transition-all"
                      style={{
                        color: "oklch(0.52 0.07 228)",
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Learn more <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE PROCESS LOOP ── */}
      <section className="py-20 md:py-28 container">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Execution Framework</div>
        </div>
        <div className="flex items-end justify-between mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Trade Process Loop
          </h2>
        </div>

        {/* Interactive Process Steps */}
        <div className="fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {processDetails.map((step, idx) => (
              <div key={idx} className="relative">
                <button
                  onClick={() =>
                    setExpandedStep(expandedStep === idx ? null : idx)
                  }
                  className={`w-full p-3 rounded-lg text-center transition-all duration-300 ${
                    expandedStep === idx ? "shadow-lg" : "hover:shadow-md"
                  }`}
                  style={{
                    background:
                      expandedStep === idx
                        ? "oklch(0.52 0.07 228)"
                        : "oklch(0.22 0.04 243)",
                    boxShadow:
                      expandedStep === idx
                        ? "0 0 20px oklch(0.52 0.07 228 / 50%)"
                        : "none",
                    border: "1px solid oklch(0.52 0.07 228 / 30%)",
                  }}
                >
                  <div
                    className="text-[10px] mb-1"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color:
                        expandedStep === idx ? "white" : "oklch(0.52 0.07 228)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="text-xs font-medium leading-tight mb-2"
                    style={{
                      color:
                        expandedStep === idx ? "white" : "oklch(0.80 0.03 243)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    {step.title}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`mx-auto transition-transform ${expandedStep === idx ? "rotate-180" : ""}`}
                    style={{
                      color:
                        expandedStep === idx ? "white" : "oklch(0.52 0.07 228)",
                    }}
                  />
                </button>

                {/* Expanded Content */}
                {expandedStep === idx && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 p-4 rounded-lg text-sm leading-relaxed z-20 animate-in fade-in slide-in-from-top-2"
                    style={{
                      background: "oklch(0.22 0.04 243)",
                      border: "1px solid oklch(0.52 0.07 228 / 50%)",
                      color: "oklch(0.80 0.03 243)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {step.content}
                  </div>
                )}

                {idx < processDetails.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-1 z-10 -translate-y-1/2 text-xs"
                    style={{ color: "oklch(0.52 0.07 228)" }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="mt-6 text-sm"
            style={{
              color: "oklch(0.55 0.03 243)",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            * Gate (step 03) is the confluence filter — no gate, no trade.
          </div>
        </div>
      </section>

      {/* ── PROOF OF WORK ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Proof of Work</div>
          </div>
          <div className="flex items-end justify-between mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Educational Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proofOfWork.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className="fade-up group cursor-pointer p-8 rounded-lg transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: "oklch(0.22 0.04 243)",
                      border: "1px solid oklch(0.52 0.07 228 / 30%)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon
                        size={24}
                        style={{ color: "oklch(0.52 0.07 228)" }}
                      />
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          background: "oklch(0.52 0.07 228 / 20%)",
                          color: "oklch(0.52 0.07 228)",
                          fontFamily: "'IBM Plex Mono', monospace",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3
                      className="text-white text-lg font-bold mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "oklch(0.65 0.03 243)",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER DISCLAIMER ── */}
      <section
        className="py-16 border-t"
        style={{ borderColor: "oklch(0.52 0.07 228 / 20%)" }}
      >
        <div className="container">
          <div
            className="pcg-disclaimer text-xs text-center"
            style={{
              color: "oklch(0.55 0.03 243)",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            <p className="mb-3">
              This website is for educational purposes only. Nothing herein
              constitutes investment advice, trading signals, or
              recommendations.
            </p>
            <p>
              PCG trades proprietary capital only. We do not manage client
              funds, provide advisory services, or accept external capital.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
