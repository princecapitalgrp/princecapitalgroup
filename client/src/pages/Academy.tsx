/*
 * PCG Academy Page
 * Design: Editorial Authority — educational hub with expandable memos and setup library
 * Sections: Banner, Public Preview, Weekly Memos, Setup Library, Triangle Dashboard, Risk Toolkit, Learning Paths, Office Hours
 * SEO: Dynamic meta tags with useSEO hook
 */

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ChevronDown, Download, BookOpen, Zap, Users, FileText } from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

const ACADEMY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-academy-bg-SiZWbmuevCpcAsjAwJ5uNx.webp";

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

// Weekly Process Memos
const weeklyMemos = [
  {
    id: 1,
    week: "Week of Mar 24, 2026",
    adherence: "92%",
    snippet: "Strong adherence to signal stack this week. Z-scores remained within expected ranges. One trade hit SL due to macro event risk not fully accounted for. Lesson: increase event risk buffer on high-impact news days. Three trades taken, two closed at profit, one at breakeven. Overall process quality excellent.",
  },
  {
    id: 2,
    week: "Week of Mar 17, 2026",
    adherence: "88%",
    snippet: "Moderate week with mixed signals. EURUSD showed strong structure but z-scores were inconclusive. Passed on two setups due to insufficient confluence. One discretionary override on Tuesday — logged as rule breach. Adherence score reflects this deviation. Macro filter correctly identified risk-off environment.",
  },
  {
    id: 3,
    week: "Week of Mar 10, 2026",
    adherence: "95%",
    snippet: "Excellent execution week. All five trades followed pre-defined criteria. Z-scores aligned perfectly with price action. No discretionary overrides. Kill-switch protocol tested but not triggered. Weekly drawdown limit respected. Setup anatomy consistent across all trades. Process discipline at peak.",
  },
];

// Setup Library from PDF
const setupLibrary = [
  {
    id: 1,
    name: "GBPUSD MR DOL Invalidation",
    date: "Feb 26, 2026",
    pair: "GBPUSD",
    session: "Thursday",
    side: "High",
    tags: ["Stop Hunt", "Structure"],
    description: "Mean reversion setup on Dollar invalidation. Price closed back inside the range after sweeping the high. High-probability mean reversion candidate but trade was not taken due to insufficient z-score confirmation.",
  },
  {
    id: 2,
    name: "EURGBP Mean Reversion",
    date: "Feb 23, 2026",
    pair: "EURGBP",
    session: "Monday",
    side: "High",
    tags: ["Mispricing", "Z-Score"],
    description: "Cross-pair mispricing detected on synthetic vs quoted dislocation. Z-score ≥ 2.0 triggered entry. Trade taken and closed at 2.14x multiple. Excellent confluence between structure and z-score analysis.",
  },
  {
    id: 3,
    name: "EURUSD MRH Sweep",
    date: "Feb 10, 2026",
    pair: "EURUSD",
    session: "Tuesday",
    side: "High",
    tags: ["Macro Filter", "Structure"],
    description: "Monthly range high sweep with ECB rate differential as macro filter. Setup showed strong structure but macro backdrop was risk-off. Trade not taken due to conflicting macro filter signal.",
  },
  {
    id: 4,
    name: "+$CR T from MRL",
    date: "Feb 6, 2026",
    pair: "EURUSD",
    session: "Asia",
    side: "Low",
    tags: ["Stop Hunt", "Risk"],
    description: "Turtle soup setup on MRL (monthly range low). Stop hunt pattern identified but z-score was only 1.2 — below minimum 2.0 threshold. Trade not taken. Setup anatomy logged for future reference.",
  },
  {
    id: 5,
    name: "Asia Highs Sweep Bullish 02s Pump Fake",
    date: "Feb 3, 2026",
    pair: "EURUSD",
    session: "Asia",
    side: "High",
    tags: ["Liquidity Run", "Mispricing"],
    description: "Bullish 02s pump fake on Asia highs. Z-score showed 2.5 standard deviations from mean. Trade taken and closed at 2.5x multiple. Perfect alignment of structure, z-score, and macro filter.",
  },
  {
    id: 6,
    name: "Weekly TS of HTF Highs in +htf",
    date: "Apr 21, 2025",
    pair: "EURUSD",
    session: "Monday",
    side: "High",
    tags: ["Liquidity Run", "Macro Filter"],
    description: "Weekly turtle soup of higher timeframe highs. Macro filter showed strong risk-on environment. Trade taken and closed at breakeven after hitting stop loss. Process was correct despite negative outcome.",
  },
];

// Risk Toolkit Downloads
const riskToolkit = [
  {
    icon: FileText,
    title: "Journal Template",
    description: "Structured template for post-trade journaling. Includes sections for setup anatomy, execution quality, and psychological factors.",
    file: "journal-template.pdf",
  },
  {
    icon: AlertCircle,
    title: "Pre-Trade Checklist",
    description: "Eight-point checklist to verify all confluence gates before entry. Ensures discipline and removes discretion.",
    file: "pretrade-checklist.pdf",
  },
  {
    icon: FileText,
    title: "Weekly Memo Template",
    description: "Framework for weekly process review. Tracks adherence, setup quality, and continuous improvement metrics.",
    file: "weekly-memo-template.pdf",
  },
];

// Learning Paths
const learningPaths = [
  {
    level: "Foundations",
    description: "Start here. Learn the basics of market structure, session timing, and liquidity concepts.",
    modules: 4,
  },
  {
    level: "Intermediate",
    description: "Dive deeper into z-score analysis, cross-pair relationships, and macro filtering.",
    modules: 6,
  },
  {
    level: "Advanced",
    description: "Master confluence gating, position sizing, and psychological discipline in live trading.",
    modules: 5,
  },
];

export default function Academy() {
  useSEO({
    title: "Academy | Prince Capital Group",
    description: "Educational resources for FX traders: weekly process memos, setup anatomy library, risk toolkit, and learning paths. Educational content only.",
    canonical: "https://princecapitalgroup.com/academy",
  });

  const pageRef = useScrollFadeUp();
  const [expandedMemo, setExpandedMemo] = useState<number | null>(null);
  const [expandedSetup, setExpandedSetup] = useState<number | null>(null);

  return (
    <div ref={pageRef}>
      {/* ── EDUCATIONAL BANNER ── */}
      <div
        className="w-full py-4 text-center border-b"
        style={{
          background: "oklch(0.52 0.07 228 / 10%)",
          borderColor: "oklch(0.52 0.07 228 / 40%)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <AlertCircle size={18} style={{ color: "oklch(0.52 0.07 228)" }} />
          <span
            className="text-sm font-medium"
            style={{
              color: "oklch(0.52 0.07 228)",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.08em",
            }}
          >
            EDUCATIONAL CONTENT ONLY — NOT INVESTMENT ADVICE — NO SIGNALS
          </span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          backgroundImage: `url(${ACADEMY_BG})`,
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
          <div className="pcg-section-label mb-4 fade-up">Learning Hub</div>
          <h1
            className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
            style={{ fontFamily: "'Playfair Display', serif", maxWidth: "700px" }}
          >
            PCG Academy
          </h1>
          <p
            className="text-lg leading-relaxed mb-8 fade-up"
            style={{
              color: "oklch(0.80 0.03 243)",
              fontFamily: "'IBM Plex Sans', sans-serif",
              maxWidth: "600px",
            }}
          >
            Public educational resources documenting our research-to-execution process. Learn our approach to signal stacking, risk governance, and disciplined execution.
          </p>
        </div>
      </section>

      {/* ── WEEKLY PROCESS MEMOS ── */}
      <section className="py-20 md:py-28 container">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Process Documentation</div>
        </div>
        <div className="flex items-end justify-between mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Weekly Process Memos
          </h2>
        </div>

        <div className="space-y-4">
          {weeklyMemos.map((memo) => (
            <div key={memo.id} className="fade-up">
              <button
                onClick={() => setExpandedMemo(expandedMemo === memo.id ? null : memo.id)}
                className="w-full p-6 rounded-lg text-left transition-all duration-300"
                style={{
                  background: expandedMemo === memo.id ? "oklch(0.52 0.07 228 / 15%)" : "oklch(0.22 0.04 243)",
                  border: `1px solid oklch(0.52 0.07 228 / ${expandedMemo === memo.id ? 60 : 30}%)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-white font-bold mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {memo.week}
                    </h3>
                    <div
                      className="text-sm"
                      style={{
                        color: "oklch(0.52 0.07 228)",
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Adherence: {memo.adherence}
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${expandedMemo === memo.id ? "rotate-180" : ""}`}
                    style={{ color: "oklch(0.52 0.07 228)" }}
                  />
                </div>
              </button>

              {expandedMemo === memo.id && (
                <div
                  className="mt-2 p-6 rounded-lg animate-in fade-in slide-in-from-top-2"
                  style={{
                    background: "oklch(0.22 0.04 243)",
                    border: "1px solid oklch(0.52 0.07 228 / 40%)",
                  }}
                >
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: "oklch(0.80 0.03 243)",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                  >
                    {memo.snippet}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SETUP ANATOMY LIBRARY ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Trade Examples</div>
          </div>
          <div className="flex items-end justify-between mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Setup Anatomy Library
            </h2>
          </div>

          <div className="space-y-4">
            {setupLibrary.map((setup) => (
              <div key={setup.id} className="fade-up">
                <button
                  onClick={() => setExpandedSetup(expandedSetup === setup.id ? null : setup.id)}
                  className="w-full p-6 rounded-lg text-left transition-all duration-300"
                  style={{
                    background: expandedSetup === setup.id ? "oklch(0.52 0.07 228 / 15%)" : "oklch(0.22 0.04 243)",
                    border: `1px solid oklch(0.52 0.07 228 / ${expandedSetup === setup.id ? 60 : 30}%)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className="text-white font-bold mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {setup.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            background: "oklch(0.52 0.07 228 / 20%)",
                            color: "oklch(0.52 0.07 228)",
                            fontFamily: "'IBM Plex Mono', monospace",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {setup.pair}
                        </span>
                        {setup.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: "oklch(0.52 0.07 228 / 10%)",
                              color: "oklch(0.65 0.03 243)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="text-xs"
                        style={{
                          color: "oklch(0.55 0.03 243)",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {setup.date} · {setup.session} · Side: {setup.side}
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`transition-transform flex-shrink-0 mt-1 ${expandedSetup === setup.id ? "rotate-180" : ""}`}
                      style={{ color: "oklch(0.52 0.07 228)" }}
                    />
                  </div>
                </button>

                {expandedSetup === setup.id && (
                  <div
                    className="mt-2 p-6 rounded-lg animate-in fade-in slide-in-from-top-2"
                    style={{
                      background: "oklch(0.22 0.04 243)",
                      border: "1px solid oklch(0.52 0.07 228 / 40%)",
                    }}
                  >
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: "oklch(0.80 0.03 243)",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      {setup.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RISK TOOLKIT ── */}
      <section className="py-20 md:py-28 container">
        <div className="fade-up mb-4">
          <div className="pcg-section-label">Resources</div>
        </div>
        <div className="flex items-end justify-between mb-12 fade-up">
          <h2
            className="text-white text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Risk Toolkit Downloads
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {riskToolkit.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="fade-up p-8 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{
                  background: "oklch(0.22 0.04 243)",
                  border: "1px solid oklch(0.52 0.07 228 / 30%)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon size={28} style={{ color: "oklch(0.52 0.07 228)" }} />
                  <Download size={18} style={{ color: "oklch(0.52 0.07 228)" }} />
                </div>
                <h3
                  className="text-white font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
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
            );
          })}
        </div>
      </section>

      {/* ── LEARNING PATHS ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "oklch(0.20 0.04 243)" }}
      >
        <div className="container">
          <div className="fade-up mb-4">
            <div className="pcg-section-label">Curriculum</div>
          </div>
          <div className="flex items-end justify-between mb-12 fade-up">
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Learning Paths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <div
                key={path.level}
                className="fade-up p-8 rounded-lg"
                style={{
                  background: "oklch(0.22 0.04 243)",
                  border: "1px solid oklch(0.52 0.07 228 / 30%)",
                }}
              >
                <BookOpen size={28} style={{ color: "oklch(0.52 0.07 228)", marginBottom: "16px" }} />
                <h3
                  className="text-white text-lg font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {path.level}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "oklch(0.65 0.03 243)",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  {path.description}
                </p>
                <div
                  className="text-xs"
                  style={{
                    color: "oklch(0.52 0.07 228)",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: "0.08em",
                  }}
                >
                  {path.modules} modules
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICE HOURS ── */}
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
              <Users size={28} style={{ color: "oklch(0.52 0.07 228)", marginTop: "4px", flexShrink: 0 }} />
              <div>
                <h3
                  className="text-white text-lg font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Office Hours & Q&A
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    color: "oklch(0.80 0.03 243)",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  Join periodic office hours to discuss process, ask questions about the signal stack, and engage with the PCG community. Topics include confluence gating, z-score analysis, risk management, and psychological discipline.
                </p>
                <Link href="/contact">
                  <button className="pcg-btn-primary flex items-center gap-2">
                    Sign Up for Office Hours <Zap size={14} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
