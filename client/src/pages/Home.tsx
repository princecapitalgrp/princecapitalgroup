/*
 * PCG Home Page
 * Design: Editorial Authority — hero with dark overlay, asymmetric sections
 * Sections: Hero, Compliance Box, Pillars, Process, Proof-of-Work, Footer Disclaimer
 */

import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { ArrowRight, Shield, BarChart2, RefreshCw, FileText, BookOpen, Layers } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-hero-bg-UBP35WQUSoTKrtQSwvhVWz.webp";

// Scroll to top on mount
function ScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return null;
}

const processSteps = [
  "Idea",
  "Signal Stack",
  "Gate",
  "Trade Plan",
  "Execute",
  "Monitor",
  "Journal",
  "Weekly Review",
];

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
    description: "Structured weekly audit of trade process, rule adherence, and setup quality.",
    tag: "Process",
    href: "/academy",
  },
  {
    icon: Shield,
    label: "Risk Toolkit",
    description: "Journal templates, pre-trade checklists, and weekly memo frameworks.",
    tag: "Governance",
    href: "/academy",
  },
  {
    icon: Layers,
    label: "Setup Anatomy",
    description: "Tagged library of trade setup examples: structure, mispricing, macro filter, risk.",
    tag: "Education",
    href: "/academy",
  },
];

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

export default function Home() {
  const pageRef = useScrollFadeUp();

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
              style={{ fontFamily: "'IBM Plex Mono', monospace", opacity: 0.15, letterSpacing: "-0.04em" }}
            >
              PCG
            </div>
            <h1
              className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 fade-up"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
            >
              Global Macro FX through Disciplined Execution
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 fade-up"
              style={{ color: "oklch(0.80 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif", maxWidth: "600px" }}
            >
              PCG is a proprietary research-to-execution project focused on G10 FX, built around confluence gating, risk governance, and weekly audit loops.
            </p>
            <div className="flex flex-wrap gap-4 fade-up">
              <Link href="/contact">
                <button className="pcg-btn-primary flex items-center gap-2">
                  Contact <ArrowRight size={14} />
                </button>
              </Link>
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
            style={{ color: "oklch(0.52 0.07 228)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Scope & Compliance
          </div>
          <div className="pcg-compliance-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div
                  className="text-xs mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.07 228)" }}
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
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "oklch(0.85 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
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
                  style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.52 0.07 228)" }}
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
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "oklch(0.85 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
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
            <div className="pcg-section-number hidden md:block">03</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Link key={pillar.title} href={pillar.href}>
                  <div
                    className="pcg-card p-8 group cursor-pointer fade-up"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-10 h-10 flex items-center justify-center border"
                        style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                      >
                        <Icon size={18} style={{ color: "oklch(0.52 0.07 228)" }} />
                      </div>
                      <span
                        className="text-3xl font-bold"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228 / 25%)" }}
                      >
                        {pillar.number}
                      </span>
                    </div>
                    <h3
                      className="text-white text-xl font-semibold mb-3 group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {pillar.description}
                    </p>
                    <div
                      className="flex items-center gap-2 text-xs group-hover:gap-3 transition-all"
                      style={{ color: "oklch(0.52 0.07 228)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
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

      {/* ── PROCESS DIAGRAM ── */}
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

        {/* Process Steps */}
        <div className="fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {processSteps.map((step, i) => (
              <div key={step} className="relative">
                <div
                  className="pcg-card p-3 text-center"
                  style={{
                    background: i === 2 ? "oklch(0.52 0.07 228 / 20%)" : undefined,
                    borderColor: i === 2 ? "oklch(0.52 0.07 228 / 60%)" : undefined,
                  }}
                >
                  <div
                    className="text-[10px] mb-1"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "oklch(0.52 0.07 228)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="text-xs font-medium leading-tight"
                    style={{
                      color: i === 2 ? "white" : "oklch(0.80 0.03 243)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    {step}
                  </div>
                </div>
                {i < processSteps.length - 1 && (
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
              Research & Process Documentation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofOfWork.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className="pcg-card p-6 group cursor-pointer fade-up"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={20} style={{ color: "oklch(0.52 0.07 228)" }} />
                      <span
                        className="text-[10px] px-2 py-1 border"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "oklch(0.52 0.07 228)",
                          borderColor: "oklch(0.52 0.07 228 / 30%)",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h3
                      className="text-white text-base font-semibold mb-2 group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.60 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {item.description}
                    </p>
                    <div
                      className="mt-4 flex items-center gap-2 text-xs group-hover:gap-3 transition-all"
                      style={{ color: "oklch(0.52 0.07 228)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Access <ArrowRight size={11} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="container py-16">
        <div
          className="fade-up flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12"
          style={{ border: "1px solid oklch(0.52 0.07 228 / 25%)", background: "oklch(0.20 0.04 243)" }}
        >
          <div>
            <h3
              className="text-white text-2xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Interested in the PCG process?
            </h3>
            <p
              className="text-sm"
              style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Explore the Academy for educational content, or reach out directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/academy">
              <button className="pcg-btn-outline">View Academy</button>
            </Link>
            <Link href="/contact">
              <button className="pcg-btn-primary">Contact PCG</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
