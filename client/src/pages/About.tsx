/*
 * PCG About Page
 * Design: Editorial Authority — portrait + editorial layout, values section
 * Sections: Hero, Founder, 90-Day Build, Process KPIs, Values
 */

import { useEffect, useRef } from "react";
import { ArrowRight, Target, BarChart2, CheckSquare } from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

const PORTRAIT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pasted_file_YC1Nmo_image_adec1763.png";

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

const kpis = [
  {
    icon: CheckSquare,
    label: "Rule Adherence Rate",
    description:
      "Percentage of trades executed with a fully completed pre-trade checklist. Target: 100%.",
    metric: "Target: 100%",
  },
  {
    icon: BarChart2,
    label: "Process Cadence",
    description:
      "Weekly review memo completion rate. Every week ends with a structured audit, regardless of trading activity.",
    metric: "Weekly",
  },
  {
    icon: Target,
    label: "Confluence Gate Rate",
    description:
      "Percentage of trade ideas that pass the full signal stack gate. Measures selectivity and discipline.",
    metric: "Tracked",
  },
  {
    icon: CheckSquare,
    label: "Journal Completion",
    description:
      "Percentage of executed trades with a complete journal entry. Process documentation is non-negotiable.",
    metric: "Target: 100%",
  },
];

const ninetyDayGoals = [
  "Establish and document the full signal stack framework across all three layers",
  "Complete minimum 12 weekly review memos with consistent structure",
  "Build the Setup Anatomy Library with a minimum of 20 tagged examples",
  "Achieve 100% pre-trade checklist compliance across all executed trades",
  "Publish the Risk Toolkit with all four core templates",
  "Launch the Academy public preview with Foundations and Intermediate modules",
  "Maintain zero kill-switch activations through disciplined position sizing",
  "Establish a consistent weekly process cadence with no missed review cycles",
];

const values = [
  {
    title: "Discipline",
    description:
      "Rules are defined before markets open and followed without exception. Discipline is not a personality trait — it is a system. The process is designed to remove the need for willpower.",
  },
  {
    title: "Honesty",
    description:
      "Process documentation reflects reality, not aspiration. Breaches are logged. Mistakes are recorded. The journal is a truthful account of what happened, not a curated highlight reel.",
  },
  {
    title: "Iteration",
    description:
      "The weekly review exists to improve the process, not to justify it. Every cycle is an opportunity to identify what worked, what didn't, and what needs to change. Improvement is the only metric that matters.",
  },
];

export default function About() {
  useSEO({
    title: "About | Prince Capital Group",
    description:
      "Learn about Antonio Grillo-Balen and PCG's mission: disciplined FX trading through confluence gating, risk governance, and weekly audit loops.",
    canonical: "https://princecapitalgroup.com/about",
  });

  const pageRef = useScrollFadeUp();

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-0 md:pt-40"
        style={{ background: "oklch(0.22 0.04 243)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-end">
            {/* Text */}
            <div className="md:col-span-7 pb-16 md:pb-24">
              <div className="pcg-section-label mb-4 fade-up">About PCG</div>
              <h1
                className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Building a Disciplined Research Operation
              </h1>
              <p
                className="text-lg leading-relaxed fade-up"
                style={{
                  color: "oklch(0.75 0.03 243)",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  maxWidth: "520px",
                }}
              >
                Prince Capital Group is a proprietary research-to-execution
                project. It is not a fund. It is not an advisory firm. It is a
                structured attempt to apply institutional-grade process
                discipline to independent macro FX research.
              </p>
            </div>
            {/* Portrait */}
            <div
              className="md:col-span-5 fade-up"
              style={{ transitionDelay: "200ms" }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", maxHeight: "480px" }}
              >
                <img
                  src={PORTRAIT_IMG}
                  alt="Antonio Grillo-Balen — Founder, Prince Capital Group"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.85) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.22 0.04 243) 0%, transparent 40%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 fade-up">
              <div className="pcg-section-label mb-4">Founder</div>
              <div
                className="text-white text-3xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Antonio Grillo-Balen
              </div>
              <div
                className="text-sm mb-6"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "oklch(0.52 0.07 228)",
                  letterSpacing: "0.08em",
                }}
              >
                Founder · Prince Capital Group
              </div>
              <div className="pcg-rule mb-6" />
              <div className="space-y-3">
                {[
                  "G10 FX Research",
                  "Macro Analysis",
                  "Process Architecture",
                  "Risk Governance",
                ].map(item => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm"
                    style={{
                      color: "oklch(0.68 0.03 243)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    <span style={{ color: "oklch(0.52 0.07 228)" }}>→</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="md:col-span-8 fade-up"
              style={{ transitionDelay: "100ms" }}
            >
              <p
                className="text-base leading-relaxed mb-6"
                style={{
                  color: "oklch(0.78 0.03 243)",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                Prince Capital Group was founded with a single objective: to
                build a research-to-execution process that is systematic,
                auditable, and honest. The project operates on proprietary
                capital only, with no external investors, no client funds, and
                no advisory obligations.
              </p>
              <p
                className="text-base leading-relaxed mb-6"
                style={{
                  color: "oklch(0.78 0.03 243)",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                The focus is G10 foreign exchange — the deepest, most liquid,
                and most macro-driven segment of global financial markets. The
                approach combines structural price action analysis, cross-pair
                mispricing frameworks, and top-down macro filters into a
                three-layer confluence gate.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "oklch(0.78 0.03 243)",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                PCG's educational output — process memos, setup anatomy, risk
                toolkits — is shared to demonstrate that disciplined process
                documentation is possible at the individual level. It is not
                shared as advice, signals, or a track record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 90-DAY BUILD ── */}
      <section className="container py-20 md:py-28">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Current Build</div>
        </div>
        <div className="flex items-end justify-between mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What We're Building in 90 Days
          </h2>
          <div className="pcg-section-number hidden md:block">90</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ninetyDayGoals.map((goal, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 fade-up"
              style={{
                borderBottom: "1px solid oklch(1 0 0 / 6%)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div
                className="w-6 h-6 border flex items-center justify-center shrink-0 mt-0.5"
                style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
              >
                <span
                  className="text-[9px]"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "oklch(0.52 0.07 228)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-sm leading-relaxed"
                style={{
                  color: "oklch(0.75 0.03 243)",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                {goal}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS KPIs ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Process KPIs</div>
          </div>
          <div className="mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We Measure Process, Not Returns
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "oklch(0.65 0.03 243)",
                fontFamily: "'IBM Plex Sans', sans-serif",
                maxWidth: "580px",
              }}
            >
              PCG's performance metrics are process-based. We do not publish
              P&L, returns, or win rates. The KPIs that matter are those that
              measure the quality and consistency of the process itself.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="pcg-card p-8 fade-up"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center border"
                      style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                    >
                      <Icon
                        size={16}
                        style={{ color: "oklch(0.52 0.07 228)" }}
                      />
                    </div>
                    <span
                      className="text-xs px-2 py-1 border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        color: "oklch(0.52 0.07 228)",
                        borderColor: "oklch(0.52 0.07 228 / 25%)",
                      }}
                    >
                      {kpi.metric}
                    </span>
                  </div>
                  <h3
                    className="text-white text-lg font-semibold mb-2"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {kpi.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "oklch(0.62 0.03 243)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    {kpi.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="container py-20 md:py-28">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Values</div>
        </div>
        <div className="mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discipline. Honesty. Iteration.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="fade-up"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="text-white text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                }}
              >
                {value.title}
              </div>
              <div className="pcg-rule mb-4" />
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "oklch(0.68 0.03 243)",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container pb-20">
        <div className="fade-up">
          <div className="pcg-rule mb-8" />
          <div className="flex items-center justify-between">
            <div>
              <div className="pcg-section-label mb-2">Get in Touch</div>
              <h3
                className="text-white text-xl font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Mentorship, Partnerships, or Research
              </h3>
            </div>
            <Link href="/contact">
              <button className="pcg-btn-primary flex items-center gap-2">
                Contact PCG <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
