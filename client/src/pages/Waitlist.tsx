/*
 * PCG Waitlist Page
 * Design: Private Bank Heritage — white sections, gold accents
 * Backend: Supabase waitlist table via useSaveEmail hook
 * Sections: Hero, Form + Perks, Disclaimer
 */

import { useEffect, useRef, useState } from "react";
import { CheckCircle, TrendingUp, Shield, BookOpen, BarChart2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useSaveEmail } from "@/hooks/useSupabase";

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

const perks = [
  {
    icon: TrendingUp,
    label: "Live Trade Log",
    description: "Every trade documented publicly with screenshots and process notes within 48 hours.",
  },
  {
    icon: BarChart2,
    label: "5-Factor Playbook",
    description: "Complete confluence gate system: checklists, templates, and kill-switch protocols.",
  },
  {
    icon: Shield,
    label: "Live Macro Dashboard",
    description: "Bond yield z-scores, vol regime indicators, and macro calendar in real time.",
  },
  {
    icon: BookOpen,
    label: "Weekly Process Memos",
    description: "Annotated setups and rule adherence reports — wins and losses, no cherry-picking.",
  },
];

const inputStyle: React.CSSProperties = {
  background: "oklch(0.99 0.001 286)",
  border: "1px solid oklch(0 0 0 / 12%)",
  color: "oklch(0.22 0.04 243)",
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "0.875rem",
  padding: "0.75rem 1rem",
  width: "100%",
  outline: "none",
  transition: "border-color 200ms ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "oklch(0.68 0.10 64)",
  display: "block",
  marginBottom: "0.5rem",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.7rem",
  color: "oklch(0.577 0.245 27.325)",
  marginTop: "0.375rem",
};

export default function Waitlist() {
  useSEO({
    title: "Join the Waitlist — Prince Capital Group",
    description:
      "Secure founding member access to PCG Academy. Institutional-grade FX process education at €39/month. No hype. No signals. Full transparency.",
  });

  const pageRef = useScrollFadeUp();
  const { saveEmail, loading, error: saveError, success } = useSaveEmail();

  const ref = new URLSearchParams(window.location.search).get('ref') ?? 'direct';
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "A valid email address is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const ok = await saveEmail(
      formData.email.trim().toLowerCase(),
      ref
    );

    if (ok) {
      setSubmitted(true);
    }
  };

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "oklch(0.97 0.002 286)" }}
      >
        <div className="container">
          <div className="max-w-2xl">
            <div className="pcg-section-label mb-4 fade-up">Entry Protocol</div>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.04 243)" }}
            >
              Join the{" "}
              <span style={{ color: "oklch(0.68 0.10 64)", fontStyle: "italic" }}>Waitlist</span>
            </h1>
            <p
              className="text-lg leading-relaxed fade-up"
              style={{ color: "oklch(0.38 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              PCG Academy launches shortly. Founding members lock in €39/month — below standard pricing — for life. No commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM + PERKS ── */}
      <section className="container pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Form */}
          <div className="md:col-span-5 fade-up">
            {submitted ? (
              <div
                className="p-10 text-center"
                style={{
                  border: "1px solid oklch(0.68 0.10 64 / 30%)",
                  background: "oklch(0.68 0.10 64 / 6%)",
                }}
              >
                <CheckCircle
                  size={40}
                  style={{ color: "oklch(0.68 0.10 64)", margin: "0 auto 1.5rem" }}
                />
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.04 243)" }}
                >
                  You're on the list.
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.48 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  We'll contact{" "}
                  <span style={{ color: "oklch(0.22 0.04 243)", fontWeight: 600 }}>{formData.email}</span>{" "}
                  before launch with founding member access details.
                </p>
                <div
                  className="text-xs"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "oklch(0.68 0.10 64)",
                    letterSpacing: "0.1em",
                    borderTop: "1px solid oklch(0 0 0 / 10%)",
                    paddingTop: "1.5rem",
                  }}
                >
                  FOUNDING RATE: €39/MO · NO LOCK-IN
                </div>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid oklch(0 0 0 / 12%)",
                  background: "oklch(0.99 0.001 286)",
                  padding: "2rem",
                }}
              >
                <h2
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.04 243)" }}
                >
                  Secure Your Spot
                </h2>
                <p
                  className="text-sm mb-8"
                  style={{ color: "oklch(0.55 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  No spam. No commitment. Unsubscribe anytime.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      style={{
                        ...inputStyle,
                        borderColor: errors.email
                          ? "oklch(0.577 0.245 27.325 / 60%)"
                          : "oklch(0 0 0 / 12%)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = errors.email
                          ? "oklch(0.577 0.245 27.325 / 60%)"
                          : "oklch(0.68 0.10 64)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.email
                          ? "oklch(0.577 0.245 27.325 / 60%)"
                          : "oklch(0 0 0 / 12%)")
                      }
                      required
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                  </div>

                  {/* Server error (e.g. duplicate email) */}
                  {saveError && (
                    <div style={errorStyle}>
                      {saveError === "You're already on the list"
                        ? saveError
                        : "Something went wrong. Please try again."}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="pcg-btn-primary w-full flex items-center justify-center gap-2"
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Joining…" : "Join the Waitlist →"}
                  </button>
                </form>

                {/* Stats */}
                <div
                  className="grid grid-cols-2 gap-3 mt-8"
                  style={{ borderTop: "1px solid oklch(0 0 0 / 8%)", paddingTop: "1.5rem" }}
                >
                  {[
                    { val: "€39/mo", label: "Founding rate" },
                    { val: "No lock-in", label: "Cancel anytime" },
                    { val: "500+", label: "Already waiting" },
                    { val: "Full access", label: "From day one" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div
                        className="text-sm font-bold"
                        style={{ color: "oklch(0.68 0.10 64)", fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {item.val}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.55 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Perks */}
          <div className="md:col-span-7 fade-up" style={{ transitionDelay: "120ms" }}>
            <div className="pcg-section-label mb-6">What You Get</div>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.04 243)" }}
            >
              Academy Membership Includes
            </h2>

            <div className="space-y-4">
              {perks.map((perk, i) => (
                <div
                  key={perk.label}
                  className="flex items-start gap-5 p-5"
                  style={{
                    border: "1px solid oklch(0 0 0 / 10%)",
                    background: "oklch(0.99 0.001 286)",
                    transition: "border-color 200ms",
                    animationDelay: `${i * 80}ms`,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                      "oklch(0.68 0.10 64 / 40%)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                      "oklch(0 0 0 / 10%)")
                  }
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 shrink-0"
                    style={{ border: "1px solid oklch(0.68 0.10 64 / 40%)" }}
                  >
                    <perk.icon size={18} style={{ color: "oklch(0.68 0.10 64)" }} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: "oklch(0.22 0.04 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {perk.label}
                    </div>
                    <div
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.52 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {perk.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-8 p-5"
              style={{
                borderLeft: "2px solid oklch(0.68 0.10 64 / 40%)",
                paddingLeft: "1.25rem",
              }}
            >
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.52 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                vs. Bloomberg Terminal courses at €250+/month. Same institutional frameworks.
                Transparent track record. No performance claims. No signals. No hype.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pcg-disclaimer mt-12 fade-up">
          <strong style={{ color: "oklch(0.55 0.08 64)" }}>DISCLAIMER:</strong>{" "}
          PCG Academy is an educational product. Joining this waitlist does not constitute a purchase, subscription, or financial services engagement. PCG does not provide investment advice, manage client funds, or accept external capital. All content is for educational and informational purposes only.
        </div>
      </section>
    </div>
  );
}
