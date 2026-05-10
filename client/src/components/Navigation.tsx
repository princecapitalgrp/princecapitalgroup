/*
 * PCG Navigation Component
 * Design: Private Bank Heritage — white bg, IBM Plex Sans labels, gold accent
 * Behavior: Fixed top nav, transparent → solid white on scroll, mobile hamburger
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/strategy", label: "Strategy" },
  { href: "/risk", label: "Risk & Governance" },
  { href: "/academy", label: "Academy" },
  { href: "/macro-museum", label: "Macro Museum" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(0.98 0.002 286 / 97%)"
            : "oklch(0.98 0.002 286 / 0%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0 0 0 / 8%)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group">
                <div
                  className="flex items-center justify-center w-10 h-10 border-2 transition-colors duration-200"
                  style={{
                    borderColor: "oklch(0.22 0.04 243 / 60%)",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.68 0.10 64)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.22 0.04 243 / 60%)")}
                >
                  <span
                    className="text-sm font-bold tracking-wider transition-colors duration-200"
                    style={{ color: "oklch(0.22 0.04 243)" }}
                  >
                    PCG
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div
                    className="text-sm font-semibold leading-tight"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.04em", color: "oklch(0.22 0.04 243)" }}
                  >
                    Prince Capital Group
                  </div>
                  <div
                    className="text-[10px] leading-tight"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.68 0.10 64)" }}
                  >
                    Global Macro FX
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`pcg-nav-link ${location === link.href ? "active" : ""}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/waitlist" className="hidden md:block">
                <button
                  className="text-xs font-semibold px-4 py-2 transition-colors duration-200"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "oklch(0.68 0.10 64)",
                    border: "1px solid oklch(0.68 0.10 64 / 50%)",
                    background: "oklch(0.68 0.10 64 / 6%)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.68 0.10 64 / 14%)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.68 0.10 64 / 80%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.68 0.10 64 / 6%)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.68 0.10 64 / 50%)";
                  }}
                >
                  Join Waitlist
                </button>
              </Link>
              <Link href="/contact" className="hidden md:block">
                <button className="pcg-btn-primary text-xs">
                  Contact
                </button>
              </Link>
              <button
                className="lg:hidden transition-colors"
                style={{ color: "oklch(0.38 0.03 243)" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.22 0.04 243)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.38 0.03 243)")}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.97 0.002 286 / 97%)", backdropFilter: "blur(16px)" }}
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative flex flex-col justify-center h-full px-8">
          <div className="space-y-6">
            {navLinks.map((link, i) => (
              <Link key={link.href} href={link.href}>
                <div
                  className="flex items-center gap-4 group"
                  style={{
                    transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: mobileOpen ? 1 : 0,
                    transition: `all 300ms ease ${i * 60}ms`,
                  }}
                >
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", color: "oklch(0.68 0.10 64)" }}
                  >
                    0{i + 1}.
                  </span>
                  <span
                    className="text-2xl font-semibold transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.04 243)" }}
                  >
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3">
            <Link href="/waitlist">
              <button
                className="w-full text-center text-sm font-semibold py-3 transition-colors duration-200"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(0.68 0.10 64)",
                  border: "1px solid oklch(0.68 0.10 64 / 50%)",
                  background: "oklch(0.68 0.10 64 / 6%)",
                }}
              >
                Join Waitlist
              </button>
            </Link>
            <Link href="/contact">
              <button className="pcg-btn-primary w-full text-center">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
