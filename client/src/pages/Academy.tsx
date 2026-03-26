/*
 * PCG Academy Page
 * Design: Editorial Authority — academy-bg hero, module cards, learning path tiles
 * Sections: Always-visible banner, Hero, Public Preview, Modules, Triangle Dashboard, Risk Toolkit, Learning Path, Office Hours
 */

import { useEffect, useRef, useState } from "react";
import { FileText, BookOpen, BarChart2, Download, ArrowRight, ChevronRight, Users, Lock } from "lucide-react";
import { Link } from "wouter";

const ACADEMY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/pcg-academy-bg-ZmxMAUP39ehQhEHxmBSY4Q.webp";

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

const weeklyMemos = [
  { week: "W12 2026", title: "EUR/USD Structure Review — Range Compression Setup", tags: ["Structure", "EUR/USD"], date: "Mar 24, 2026" },
  { week: "W11 2026", title: "GBP/USD Post-BoE Macro Filter Assessment", tags: ["Macro Filter", "GBP/USD"], date: "Mar 17, 2026" },
  { week: "W10 2026", title: "EUR/GBP Triangle Dislocation — Basis Analysis", tags: ["Mispricing", "EUR/GBP"], date: "Mar 10, 2026" },
  { week: "W09 2026", title: "USD/JPY Regime Shift — Risk-Off Filter Application", tags: ["Macro Filter", "USD/JPY"], date: "Mar 3, 2026" },
];

const setupLibrary = [
  { title: "Structure Break Retest — EUR/USD H4", tags: ["Structure", "EUR/USD"], type: "Long Setup" },
  { title: "Triangle Dislocation — EUR/GBP Synthetic vs Quoted", tags: ["Mispricing", "EUR/GBP"], type: "Basis Trade" },
  { title: "Macro Filter Rejection — GBP/USD Pre-CPI", tags: ["Macro Filter", "GBP/USD"], type: "No Trade" },
  { title: "Risk Management — Drawdown Protocol Activation", tags: ["Risk", "Process"], type: "Governance" },
  { title: "Range Boundary Entry — USD/CHF Daily", tags: ["Structure", "USD/CHF"], type: "Short Setup" },
  { title: "Confluence Gate Failure — USD/JPY", tags: ["Process", "USD/JPY"], type: "Filtered Out" },
];

const learningPath = [
  {
    level: "01",
    title: "Foundations",
    description: "Market structure basics, G10 FX landscape, session timing, and introduction to the PCG process framework.",
    modules: ["Market Structure 101", "G10 FX Overview", "Session & Liquidity Windows", "Introduction to Confluence"],
    status: "available",
  },
  {
    level: "02",
    title: "Intermediate",
    description: "Signal stack construction, cross-pair relationships, macro filter application, and risk framework implementation.",
    modules: ["Signal Stack Architecture", "Cross-Pair Mechanics", "Macro Filter Framework", "Risk Governance Basics"],
    status: "available",
  },
  {
    level: "03",
    title: "Advanced",
    description: "Triangle dislocation analysis, z-score methodology, advanced governance, and weekly review process.",
    modules: ["Triangle Dislocation Deep Dive", "Basis & Z-Score Analysis", "Advanced Risk Protocols", "Weekly Review Methodology"],
    status: "coming_soon",
  },
];

const toolkitItems = [
  { title: "Trade Journal Template", description: "Structured daily journal with pre-trade, in-trade, and post-trade sections.", format: "XLSX" },
  { title: "Pre-Trade Checklist", description: "Eight-point checklist for confluence verification before any trade plan.", format: "PDF" },
  { title: "Weekly Review Memo Template", description: "Structured weekly process audit framework with KPI tracking.", format: "DOCX" },
  { title: "Risk Limits Worksheet", description: "Position sizing calculator and risk limit tracking framework.", format: "XLSX" },
];

// Simple mock chart for Triangle Dashboard
function TriangleChart() {
  const points = [
    { x: 20, y: 60 }, { x: 30, y: 45 }, { x: 45, y: 55 }, { x: 55, y: 35 },
    { x: 65, y: 50 }, { x: 75, y: 30 }, { x: 85, y: 42 }, { x: 95, y: 25 },
  ];
  const meanY = 45;
  const w = 300, h = 100;

  const toSvg = (x: number, y: number) => ({
    x: (x / 100) * w,
    y: (y / 100) * h,
  });

  const pathD = points
    .map((p, i) => {
      const { x, y } = toSvg(p.x, p.y);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: "100px" }}>
        {/* Mean line */}
        <line
          x1="0" y1={toSvg(0, meanY).y}
          x2={w} y2={toSvg(0, meanY).y}
          stroke="oklch(0.52 0.07 228 / 40%)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* +1σ / -1σ bands */}
        <rect
          x="0" y={toSvg(0, meanY - 15).y}
          width={w} height={toSvg(0, 30).y}
          fill="oklch(0.52 0.07 228 / 8%)"
        />
        {/* Basis line */}
        <path d={pathD} fill="none" stroke="oklch(0.62 0.07 228)" strokeWidth="1.5" />
        {/* Points */}
        {points.map((p, i) => {
          const { x, y } = toSvg(p.x, p.y);
          return (
            <circle
              key={i} cx={x} cy={y} r="2.5"
              fill={y < toSvg(0, meanY - 15).y || y > toSvg(0, meanY + 15).y
                ? "oklch(0.80 0.245 27.325)"
                : "oklch(0.62 0.07 228)"}
            />
          );
        })}
        {/* Labels */}
        <text x="4" y={toSvg(0, meanY - 16).y - 2} fontSize="8" fill="oklch(0.52 0.07 228 / 70%)">+1σ</text>
        <text x="4" y={toSvg(0, meanY + 16).y + 9} fontSize="8" fill="oklch(0.52 0.07 228 / 70%)">-1σ</text>
        <text x="4" y={toSvg(0, meanY).y - 3} fontSize="8" fill="oklch(0.52 0.07 228 / 70%)">μ</text>
      </svg>
      <div className="flex justify-between mt-2">
        {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((w) => (
          <span key={w} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "oklch(0.50 0.03 243)" }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

export default function Academy() {
  const pageRef = useScrollFadeUp();
  const [activeTab, setActiveTab] = useState<"public" | "member">("public");

  return (
    <div ref={pageRef}>
      {/* ── ALWAYS-VISIBLE BANNER ── */}
      <div className="pcg-academy-banner sticky top-16 md:top-20 z-30">
        Educational content only. Not investment advice. No signals.
      </div>

      {/* ── HERO ── */}
      <section
        className="relative pt-24 pb-20 md:pt-32 md:pb-28"
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
          <div className="pcg-section-label mb-4 fade-up">PCG Academy</div>
          <h1
            className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
            style={{ fontFamily: "'Playfair Display', serif", maxWidth: "700px" }}
          >
            Educational Resources for Macro FX
          </h1>
          <p
            className="text-lg leading-relaxed mb-8 fade-up"
            style={{ color: "oklch(0.80 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif", maxWidth: "580px" }}
          >
            Process memos, setup anatomy, risk toolkits, and structured learning paths — all for educational purposes. No signals. No advice.
          </p>
          {/* Tab Toggle */}
          <div className="flex gap-2 fade-up">
            <button
              onClick={() => setActiveTab("public")}
              className={`px-6 py-2 text-xs transition-all ${activeTab === "public" ? "pcg-btn-primary" : "pcg-btn-outline"}`}
              style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Public Preview
            </button>
            <button
              onClick={() => setActiveTab("member")}
              className={`px-6 py-2 text-xs flex items-center gap-2 transition-all ${activeTab === "member" ? "pcg-btn-primary" : "pcg-btn-outline"}`}
              style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <Lock size={11} /> Member Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ── PUBLIC PREVIEW ── */}
      {activeTab === "public" && (
        <>
          {/* Weekly Process Memos */}
          <section className="container py-20 md:py-24">
            <div className="fade-up mb-4">
              <div className="pcg-section-label">Module 01</div>
            </div>
            <div className="flex items-end justify-between mb-10 fade-up">
              <h2
                className="text-white text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Weekly Process Memo Feed
              </h2>
            </div>
            <div className="space-y-4">
              {weeklyMemos.map((memo, i) => (
                <div
                  key={memo.week}
                  className="pcg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div>
                      <div
                        className="text-xs mb-1"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em" }}
                      >
                        {memo.week} · {memo.date}
                      </div>
                      <div
                        className="text-white text-sm font-medium group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {memo.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {memo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 border"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "oklch(0.52 0.07 228)",
                          borderColor: "oklch(0.52 0.07 228 / 25%)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    <ChevronRight size={14} style={{ color: "oklch(0.52 0.07 228)" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Setup Anatomy Library */}
          <section
            className="py-20 md:py-24"
            style={{ background: "oklch(0.20 0.04 243)" }}
          >
            <div className="container">
              <div className="fade-up mb-4">
                <div className="pcg-section-label">Module 02</div>
              </div>
              <div className="flex items-end justify-between mb-10 fade-up">
                <h2
                  className="text-white text-3xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Setup Anatomy Library
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {setupLibrary.map((setup, i) => (
                  <div
                    key={setup.title}
                    className="pcg-card p-5 group cursor-pointer fade-up"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div
                      className="text-[10px] mb-3 px-2 py-1 inline-block border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "oklch(0.52 0.07 228)",
                        borderColor: "oklch(0.52 0.07 228 / 25%)",
                      }}
                    >
                      {setup.type}
                    </div>
                    <div
                      className="text-white text-sm font-medium mb-3 group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {setup.title}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {setup.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "oklch(0.55 0.03 243)",
                            background: "oklch(1 0 0 / 5%)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Triangle Dashboard */}
          <section className="container py-20 md:py-24">
            <div className="fade-up mb-4">
              <div className="pcg-section-label">Module 03</div>
            </div>
            <div className="mb-10 fade-up">
              <h2
                className="text-white text-3xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Triangle Dashboard (Educational)
              </h2>
              <p
                className="text-sm"
                style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                Educational visualization of cross-pair basis and z-score concepts. Not live data. Not signals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Concept Explainer */}
              <div className="fade-up space-y-6">
                <div className="pcg-card p-6">
                  <div
                    className="text-xs mb-3"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Synthetic vs Quoted Cross
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    A <strong className="text-white">quoted cross</strong> is a directly traded currency pair (e.g., EUR/GBP). A <strong className="text-white">synthetic cross</strong> is derived mathematically from two major pairs — for example, EUR/GBP can be synthesized from EUR/USD ÷ GBP/USD. When the synthetic and quoted rates diverge, a basis dislocation exists.
                  </p>
                </div>
                <div className="pcg-card p-6">
                  <div
                    className="text-xs mb-3"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Basis & Z-Score Definition
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    <strong className="text-white">Basis</strong> = Synthetic Cross Rate − Quoted Cross Rate. The <strong className="text-white">z-score</strong> normalizes this basis against its rolling historical distribution: z = (basis − mean) / standard deviation. A z-score beyond ±2 indicates a statistically significant dislocation relative to recent history.
                  </p>
                  <div
                    className="mt-4 p-3 text-xs"
                    style={{ background: "oklch(1 0 0 / 4%)", fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.55 0.03 243)" }}
                  >
                    z = (basis − μ) / σ
                  </div>
                </div>
              </div>

              {/* Sample Chart */}
              <div className="fade-up">
                <div className="pcg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="text-xs"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      EUR/GBP Basis Z-Score — Sample (Educational)
                    </div>
                    <span
                      className="text-[9px] px-2 py-1 border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "oklch(0.80 0.245 27.325)",
                        borderColor: "oklch(0.80 0.245 27.325 / 30%)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      SAMPLE DATA
                    </span>
                  </div>
                  <TriangleChart />
                  <div className="mt-4 flex items-center gap-4 text-[10px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-0.5 bg-[oklch(0.62_0.07_228)]" />
                      <span style={{ color: "oklch(0.55 0.03 243)" }}>Basis Z-Score</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-0.5" style={{ background: "oklch(0.52 0.07 228 / 40%)", borderTop: "1px dashed" }} />
                      <span style={{ color: "oklch(0.55 0.03 243)" }}>Mean (μ)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[oklch(0.80_0.245_27.325)]" />
                      <span style={{ color: "oklch(0.55 0.03 243)" }}>±1σ Breach</span>
                    </div>
                  </div>
                  <div className="pcg-disclaimer mt-4">
                    This chart uses illustrative sample data only. It does not represent live market data, current signals, or trading recommendations.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Toolkit */}
          <section
            className="py-20 md:py-24"
            style={{ background: "oklch(0.20 0.04 243)" }}
          >
            <div className="container">
              <div className="fade-up mb-4">
                <div className="pcg-section-label">Module 04</div>
              </div>
              <div className="mb-10 fade-up">
                <h2
                  className="text-white text-3xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Risk Toolkit Downloads
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toolkitItems.map((item, i) => (
                  <div
                    key={item.title}
                    className="pcg-card p-6 flex items-start justify-between gap-4 group cursor-pointer fade-up"
                    style={{ transitionDelay: `${i * 80}ms` }}
                    onClick={() => {}}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 flex items-center justify-center border shrink-0"
                        style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                      >
                        <Download size={14} style={{ color: "oklch(0.52 0.07 228)" }} />
                      </div>
                      <div>
                        <div
                          className="text-white text-sm font-medium mb-1 group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="text-xs leading-relaxed"
                          style={{ color: "oklch(0.60 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-[10px] px-2 py-1 border shrink-0"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.1em",
                        color: "oklch(0.52 0.07 228)",
                        borderColor: "oklch(0.52 0.07 228 / 25%)",
                      }}
                    >
                      {item.format}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pcg-disclaimer mt-6 fade-up">
                Downloads available to registered members. Contact PCG to request access. All templates are for educational and personal process development purposes only.
              </div>
            </div>
          </section>

          {/* Learning Path */}
          <section className="container py-20 md:py-24">
            <div className="fade-up mb-4">
              <div className="pcg-section-label">Module 05</div>
            </div>
            <div className="mb-10 fade-up">
              <h2
                className="text-white text-3xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Learning Path
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPath.map((path, i) => (
                <div
                  key={path.level}
                  className={`pcg-card p-8 fade-up ${path.status === "coming_soon" ? "opacity-60" : ""}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-4xl font-bold"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228 / 30%)" }}
                    >
                      {path.level}
                    </span>
                    {path.status === "coming_soon" && (
                      <span
                        className="text-[9px] px-2 py-1 border"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          letterSpacing: "0.1em",
                          color: "oklch(0.65 0.03 243)",
                          borderColor: "oklch(1 0 0 / 15%)",
                        }}
                      >
                        COMING SOON
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-white text-xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {path.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {path.description}
                  </p>
                  <div className="space-y-2">
                    {path.modules.map((module) => (
                      <div
                        key={module}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "oklch(0.62 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        <ChevronRight size={10} style={{ color: "oklch(0.52 0.07 228)" }} />
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Office Hours */}
          <section
            className="py-20 md:py-24"
            style={{ background: "oklch(0.20 0.04 243)" }}
          >
            <div className="container">
              <div className="fade-up">
                <div
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12"
                  style={{ border: "1px solid oklch(0.52 0.07 228 / 25%)" }}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center border shrink-0"
                      style={{ borderColor: "oklch(0.52 0.07 228 / 40%)" }}
                    >
                      <Users size={20} style={{ color: "oklch(0.52 0.07 228)" }} />
                    </div>
                    <div>
                      <div className="pcg-section-label mb-2">Module 06</div>
                      <h3
                        className="text-white text-2xl font-bold mb-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Office Hours & Q&A
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "oklch(0.68 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif", maxWidth: "480px" }}
                      >
                        Periodic open Q&A sessions on process, methodology, and educational content. Not trading advice. Open to registered Academy members. Sessions are recorded and archived.
                      </p>
                    </div>
                  </div>
                  <Link href="/contact">
                    <button className="pcg-btn-primary flex items-center gap-2 shrink-0">
                      Register Interest <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── MEMBER DASHBOARD (UI Mock) ── */}
      {activeTab === "member" && (
        <section className="container py-20">
          <div className="fade-up">
            <div
              className="p-8 md:p-12 text-center"
              style={{ border: "1px solid oklch(0.52 0.07 228 / 30%)", background: "oklch(0.20 0.04 243)" }}
            >
              <Lock size={32} style={{ color: "oklch(0.52 0.07 228)", margin: "0 auto 1rem" }} />
              <h2
                className="text-white text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Member Dashboard
              </h2>
              <p
                className="text-sm leading-relaxed mb-8 mx-auto"
                style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif", maxWidth: "480px" }}
              >
                The Member Dashboard provides access to full process memos, complete setup library, downloadable toolkits, and Office Hours recordings. Access is by application only.
              </p>
              {/* Mock Dashboard Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                {["Weekly Memos Archive", "Full Setup Library", "Risk Toolkit Downloads", "Office Hours Recordings", "Learning Path Progress", "Process KPI Tracker"].map((item, i) => (
                  <div
                    key={item}
                    className="pcg-card p-4 opacity-50"
                    style={{ filter: "blur(0.5px)" }}
                  >
                    <div className="flex items-center gap-3">
                      <Lock size={12} style={{ color: "oklch(0.52 0.07 228)" }} />
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.72 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="pcg-btn-primary">
                  Apply for Academy Access
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── DISCLAIMER ── */}
      <section className="container py-12">
        <div className="fade-up pcg-disclaimer">
          <strong style={{ color: "oklch(0.75 0.07 228)" }}>ACADEMY DISCLAIMER:</strong>{" "}
          All content in the PCG Academy is provided for educational and informational purposes only. Nothing in the Academy constitutes investment advice, trading signals, or a recommendation to buy or sell any financial instrument. Educational frameworks, templates, and process documentation are tools for learning — not instructions to trade. Always conduct your own research and consult qualified financial professionals before making any investment decisions.
        </div>
      </section>
    </div>
  );
}
