/*
 * PCG Contact Page
 * Design: Editorial Authority — minimal form, dropdown, disclaimer
 * Sections: Hero, Contact Form, Email/LinkedIn, Disclaimer
 */

import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Send, CheckCircle } from "lucide-react";

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

const inquiryTypes = [
  { value: "mentorship", label: "Mentorship" },
  { value: "partnerships", label: "Partnerships" },
  { value: "research_academy", label: "Research / Academy" },
  { value: "media", label: "Media" },
];

export default function Contact() {
  const pageRef = useScrollFadeUp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "A valid email address is required.";
    if (!formData.inquiry) newErrors.inquiry = "Please select an inquiry type.";
    if (!formData.message.trim() || formData.message.trim().length < 20)
      newErrors.message = "Please provide a message of at least 20 characters.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const inputStyle = {
    background: "oklch(0.26 0.035 243)",
    border: "1px solid oklch(1 0 0 / 12%)",
    color: "white",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.875rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 200ms ease",
  };

  const labelStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "oklch(0.52 0.07 228)",
    display: "block",
    marginBottom: "0.5rem",
  };

  const errorStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.7rem",
    color: "oklch(0.80 0.245 27.325)",
    marginTop: "0.375rem",
  };

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ background: "oklch(0.22 0.04 243)" }}
      >
        <div className="container">
          <div className="max-w-2xl">
            <div className="pcg-section-label mb-4 fade-up">Contact</div>
            <h1
              className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6 fade-up"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get in Touch
            </h1>
            <p
              className="text-lg leading-relaxed fade-up"
              style={{ color: "oklch(0.75 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              PCG welcomes inquiries related to mentorship, partnerships, research collaboration, and media. Please select the appropriate category below.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM + CONTACT INFO ── */}
      <section className="container pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Form */}
          <div className="md:col-span-7 fade-up">
            {submitted ? (
              <div
                className="p-10 text-center"
                style={{ border: "1px solid oklch(0.52 0.07 228 / 30%)", background: "oklch(0.20 0.04 243)" }}
              >
                <CheckCircle size={40} style={{ color: "oklch(0.52 0.07 228)", margin: "0 auto 1.5rem" }} />
                <h3
                  className="text-white text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Message Received
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  Thank you for reaching out. PCG will review your inquiry and respond within 3–5 business days. Please note that PCG does not provide investment advice or accept client funds.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.52 0.07 228)")}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)")}
                    />
                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                  </div>

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
                        borderColor: errors.email ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.52 0.07 228)")}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)")}
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label style={labelStyle}>Inquiry Type</label>
                    <select
                      value={formData.inquiry}
                      onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                      style={{
                        ...inputStyle,
                        borderColor: errors.inquiry ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235b7c99' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="" style={{ background: "oklch(0.22 0.04 243)" }}>Select inquiry type...</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value} style={{ background: "oklch(0.22 0.04 243)" }}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.inquiry && <div style={errorStyle}>{errors.inquiry}</div>}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        borderColor: errors.message ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.52 0.07 228)")}
                      onBlur={(e) => (e.target.style.borderColor = errors.message ? "oklch(0.80 0.245 27.325 / 60%)" : "oklch(1 0 0 / 12%)")}
                    />
                    {errors.message && <div style={errorStyle}>{errors.message}</div>}
                  </div>

                  <button
                    type="submit"
                    className="pcg-btn-primary flex items-center gap-2 w-full justify-center"
                  >
                    Send Message <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="md:col-span-5 fade-up" style={{ transitionDelay: "150ms" }}>
            <div className="space-y-8">
              {/* Direct Contact */}
              <div>
                <div className="pcg-section-label mb-6">Direct Contact</div>
                <div className="space-y-4">
                  <a
                    href="mailto:contact@princecapitalgroup.com"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center border shrink-0 group-hover:border-[oklch(0.52_0.07_228)] transition-colors"
                      style={{ borderColor: "oklch(1 0 0 / 15%)" }}
                    >
                      <Mail size={16} style={{ color: "oklch(0.52 0.07 228)" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-0.5"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                      >
                        Email
                      </div>
                      <div
                        className="text-sm text-white group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        contact@princecapitalgroup.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center border shrink-0 group-hover:border-[oklch(0.52_0.07_228)] transition-colors"
                      style={{ borderColor: "oklch(1 0 0 / 15%)" }}
                    >
                      <Linkedin size={16} style={{ color: "oklch(0.52 0.07 228)" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs mb-0.5"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "oklch(0.52 0.07 228)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                      >
                        LinkedIn
                      </div>
                      <div
                        className="text-sm text-white group-hover:text-[oklch(0.62_0.07_228)] transition-colors"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        Antonio Grillo-Balen
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Inquiry Guide */}
              <div>
                <div className="pcg-section-label mb-4">Inquiry Guide</div>
                <div className="space-y-4">
                  {[
                    {
                      type: "Mentorship",
                      description: "Process methodology, educational frameworks, and structured learning discussions.",
                    },
                    {
                      type: "Partnerships",
                      description: "Research collaboration, content partnerships, and institutional introductions.",
                    },
                    {
                      type: "Research / Academy",
                      description: "Academy access requests, module feedback, and educational content inquiries.",
                    },
                    {
                      type: "Media",
                      description: "Press, podcast, and publication inquiries related to PCG's research process.",
                    },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className="p-4"
                      style={{ borderLeft: "2px solid oklch(0.52 0.07 228 / 30%)", paddingLeft: "1rem" }}
                    >
                      <div
                        className="text-white text-sm font-medium mb-1"
                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {item.type}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: "oklch(0.60 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                      >
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pcg-disclaimer mt-12 fade-up">
          <strong style={{ color: "oklch(0.75 0.07 228)" }}>CONTACT DISCLAIMER:</strong>{" "}
          PCG does not provide investment advice, financial planning services, or trading recommendations of any kind. Responses to inquiries are for informational and educational purposes only. PCG does not manage client funds and does not accept external investment. Any communication with PCG does not constitute a client relationship, advisory relationship, or financial services engagement. All inquiries are subject to review and PCG reserves the right to decline any request at its sole discretion.
        </div>
      </section>
    </div>
  );
}
