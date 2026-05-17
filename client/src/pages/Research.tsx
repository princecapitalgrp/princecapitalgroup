import { FormEvent, useEffect, useRef } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useSaveEmail } from "@/hooks/useSupabase";

const frameworkColumns = [
  {
    title: "Macro",
    items: ["Rate differentials", "Liquidity conditions", "Positioning"],
  },
  {
    title: "Structure",
    items: ["Liquidity sweeps", "Breaks of structure", "Key levels"],
  },
  {
    title: "Alignment",
    items: ["Confluence", "Directional clarity", "Execution bias"],
  },
];

const researchCards = [
  {
    pair: "EUR/USD",
    bias: "Bullish structure",
    keyLevel: "1.0835",
    status: "Awaiting retest above weekly compression",
    points: "24,78 30,42 36,10 31,84 40,56 48,90 54,16 61,34",
  },
  {
    pair: "EUR/GBP",
    bias: "Bearish structure",
    keyLevel: "0.8470",
    status: "Pressure building below failed reclaim",
    points: "63,18 58,82 54,44 49,80 45,10 38,30 32,64 28,12",
  },
];

const principles = [
  {
    title: "Precision",
    body: "Define failure before entry",
  },
  {
    title: "Discipline",
    body: "Respect the boundary",
  },
  {
    title: "Process",
    body: "Rules over prediction",
  },
  {
    title: "Expected Value",
    body: "Protect the edge",
  },
];

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function MiniChart({
  points,
  highlightLabel,
  highlightValue,
}: {
  points: string;
  highlightLabel: string;
  highlightValue: string;
}) {
  return (
    <div className="research-chart-shell">
      <svg viewBox="0 0 100 72" className="research-chart" aria-hidden="true">
        <line x1="6" y1="60" x2="94" y2="60" className="research-chart-axis" />
        <line x1="6" y1="16" x2="94" y2="16" className="research-chart-guide" />
        <line x1="6" y1="38" x2="94" y2="38" className="research-chart-guide" />
        <polyline points={points} className="research-chart-line" />
        <line x1="68" y1="8" x2="68" y2="60" className="research-chart-marker" />
        <circle cx="68" cy="22" r="2.4" className="research-chart-node" />
      </svg>
      <div className="research-chart-caption">
        <span>{highlightLabel}</span>
        <span>{highlightValue}</span>
      </div>
    </div>
  );
}

function CrossPairTriangle() {
  return (
    <div className="research-triangle-shell" aria-hidden="true">
      <svg viewBox="0 0 320 220" className="research-triangle">
        <path d="M160 28 L54 186 L266 186 Z" className="research-triangle-path" />
        <line x1="160" y1="28" x2="160" y2="186" className="research-triangle-guide" />
        <circle cx="160" cy="28" r="6" className="research-triangle-node" />
        <circle cx="54" cy="186" r="6" className="research-triangle-node" />
        <circle cx="266" cy="186" r="6" className="research-triangle-node research-triangle-node-active" />
        <rect x="216" y="168" width="84" height="26" className="research-triangle-highlight" />
      </svg>
      <div className="research-triangle-label research-triangle-label-top">EUR/USD</div>
      <div className="research-triangle-label research-triangle-label-left">EUR/GBP</div>
      <div className="research-triangle-label research-triangle-label-right">GBP/USD</div>
    </div>
  );
}

export default function Research() {
  const { saveEmail, loading, error, success } = useSaveEmail();
  const accessRef = useRef<HTMLElement | null>(null);

  useSEO({
    title: "Systematic FX Research | Prince Capital Group",
    description:
      "Institutional FX research and education built around macro, structure, alignment, and disciplined execution.",
    canonical: "https://princecapitalgroup.com/research",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string).trim().toLowerCase();

    if (!email) {
      return;
    }

    await saveEmail(email, "research");
  };

  const scrollToAccess = () => {
    accessRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="research-page">
      <ScrollToTop />

      <section className="research-hero">
        <div className="research-hero-inner">
          <div className="research-brand-lockup">
            <img
              src="/brand/pcg-logo-updated.png"
              alt="Prince Capital Group"
              className="research-brand-mark"
            />
            <span className="research-brand-label">Prince Capital Group</span>
          </div>

          <div className="research-kicker">Systematic Currency Desk</div>
          <h1 className="research-title">Systematic FX Research</h1>
          <p className="research-subtitle">Macro. Structure. Alignment.</p>
          <p className="research-intro">
            Institutional-style FX research and operator education for retail traders
            who want a stricter decision framework than the course market provides.
          </p>

          <div className="research-hero-actions">
            <button type="button" className="research-btn-primary" onClick={scrollToAccess}>
              Access Research
              <ArrowRight size={15} />
            </button>
            <a
              href="https://antoniogrillobalen.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="research-btn-secondary"
            >
              Weekly Memo
            </a>
          </div>

          <div className="research-hero-chart-wrap">
            <MiniChart
              points="10,54 20,48 30,42 40,46 50,36 60,30 68,22 76,26 86,20 94,14"
              highlightLabel="Key level"
              highlightValue="EUR/USD 1.0835"
            />
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="research-section-head">
          <span className="research-section-label">Decision Framework</span>
          <div className="research-rule" />
        </div>

        <div className="research-framework-grid">
          {frameworkColumns.map((column) => (
            <article key={column.title} className="research-framework-card">
              <h2>{column.title}</h2>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="research-framework-closing">
          When macro and structure agree, decision-making simplifies.
        </p>
      </section>

      <section className="research-section">
        <div className="research-section-head">
          <span className="research-section-label">Weekly Research</span>
          <div className="research-rule" />
        </div>

        <div className="research-card-grid">
          {researchCards.map((card) => (
            <article key={card.pair} className="research-note-card">
              <div className="research-note-header">
                <div>
                  <p className="research-note-pair">{card.pair}</p>
                  <p className="research-note-bias">{card.bias}</p>
                </div>
                <div className="research-note-metadata">
                  <span>Bias</span>
                  <strong>{card.bias}</strong>
                </div>
              </div>

              <MiniChart
                points={card.points}
                highlightLabel="Key level"
                highlightValue={card.keyLevel}
              />

              <dl className="research-note-stats">
                <div>
                  <dt>Key level</dt>
                  <dd>{card.keyLevel}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{card.status}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section">
        <div className="research-section-head">
          <span className="research-section-label">Operator Principles</span>
          <div className="research-rule" />
        </div>

        <div className="research-principles">
          {principles.map((principle) => (
            <article key={principle.title} className="research-principle-block">
              <h2>{principle.title}</h2>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section research-crosspair">
        <div className="research-section-head">
          <span className="research-section-label">Cross-Pair Resolution</span>
          <div className="research-rule" />
        </div>

        <div className="research-crosspair-layout">
          <CrossPairTriangle />
          <div className="research-crosspair-copy">
            <p className="research-crosspair-caption">Not a prediction. An alignment.</p>
            <p>
              The desk view is built by resolving the relationship between EUR/USD,
              EUR/GBP, and GBP/USD rather than forcing a single pair into an isolated
              narrative.
            </p>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="research-section-head">
          <span className="research-section-label">Diagnostic Preview</span>
          <div className="research-rule" />
        </div>

        <article className="research-diagnostic-card">
          <p className="research-diagnostic-eyebrow">Operator Result</p>
          <h2>You&apos;ve Been Caught.</h2>
          <p className="research-diagnostic-subhead">
            This isn&apos;t your strategy failing. It&apos;s how you execute it.
          </p>

          <div className="research-archetype-row">
            <div>
              <span className="research-inline-label">Archetype</span>
              <strong>The Over-Interpreter</strong>
            </div>
            <p>You see too much. That&apos;s why you act on nothing.</p>
          </div>

          <div className="research-diagnostic-grid">
            <div>
              <span className="research-inline-label">What&apos;s Actually Happening</span>
              <p>
                You&apos;re not lacking information. You&apos;re over-processing it.
                You validate every scenario, consider every outcome, and avoid being
                wrong until decisive execution disappears.
              </p>
            </div>
            <div>
              <span className="research-inline-label">What Needs To Change</span>
              <p>
                The problem is not intelligence. It&apos;s structure. The Prince Capital
                framework reduces trading to defined factors, a binary 3/5 gate, and
                zero overrides.
              </p>
            </div>
          </div>

          <div className="research-diagnostic-divider" />
          <p className="research-diagnostic-bridge">
            You don&apos;t need more analysis. You need fewer decisions.
          </p>

          <div className="research-checklist-card">
            <div>
              <span className="research-inline-label">Execution Framework</span>
              <h3>Your Execution Framework Is Ready</h3>
              <p>
                Download the 5-Factor Checklist used to filter low-quality trades,
                enforce structured execution, and eliminate impulsive decisions.
              </p>
            </div>
            <button type="button" className="research-btn-primary" onClick={scrollToAccess}>
              Download The 5-Factor Checklist
            </button>
          </div>

          <p className="research-authority">
            Built from 120+ trades, thousands of hours of study, and the realization
            that discipline cannot be outsourced.
          </p>
        </article>
      </section>

      <section ref={accessRef} className="research-section research-final-cta">
        <div className="research-section-head">
          <span className="research-section-label">Access</span>
          <div className="research-rule" />
        </div>

        <div className="research-cta-layout">
          <div className="research-cta-copy">
            <h2>Access Institutional FX Research</h2>
            <p>
              Prince Capital Group Academy is being built for traders who want a
              repeatable process, structured decision-making, and accountability
              through execution.
            </p>
            <p className="research-price-range">
              Founding cohort access will be limited. Expected range:{" "}
              <span>EUR 497-EUR 997</span>
            </p>
            <div className="research-cta-links">
              <a
                href="https://antoniogrillobalen.substack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the memo <ChevronRight size={14} />
              </a>
              <a
                href="https://x.com/princecapitalgrp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow the desk <ChevronRight size={14} />
              </a>
            </div>
          </div>

          <div className="research-cta-panel">
            {success ? (
              <div className="research-success-panel">
                <div className="research-success-icon">
                  <Check size={18} />
                </div>
                <h3>You&apos;re on the list.</h3>
                <p>
                  The next step is to read the weekly memo and follow the build as
                  the founding cohort takes shape.
                </p>
              </div>
            ) : (
              <form className="research-form" onSubmit={handleSubmit}>
                <label htmlFor="research-email" className="research-inline-label">
                  Join The Founding Waitlist
                </label>
                <input
                  id="research-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="research-input"
                  disabled={loading}
                  required
                />
                {error ? <p className="research-form-error">{error}</p> : null}
                <button type="submit" className="research-btn-primary research-submit" disabled={loading}>
                  {loading ? "Processing..." : "Request Access"}
                </button>
                <p className="research-form-footnote">
                  Joining the waitlist does not commit you to purchase. It signals
                  interest and gives priority access when the academy opens.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="research-footer">
        <p>Prince Capital Group</p>
        <p>Systematic FX Research &amp; Education</p>
      </footer>
    </div>
  );
}
