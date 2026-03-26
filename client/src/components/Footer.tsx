/*
 * PCG Footer Component
 * Design: Editorial Authority — dark charcoal base, IBM Plex Mono labels
 * Contains: nav links, disclaimer, copyright
 */

import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.18 0.04 243)", borderTop: "1px solid oklch(1 0 0 / 10%)" }}>
      <div className="container py-12 md:py-16">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center w-9 h-9 border border-white/60"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                <span className="text-white text-xs font-bold tracking-wider">PCG</span>
              </div>
              <span
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.04em" }}
              >
                Prince Capital Group
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.60 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Proprietary research-to-execution project focused on G10 FX markets.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-xs mb-4"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.52 0.07 228)",
              }}
            >
              Navigation
            </div>
            <div className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/strategy", label: "Strategy" },
                { href: "/risk", label: "Risk & Governance" },
                { href: "/academy", label: "Academy" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className="text-sm hover:text-white transition-colors cursor-pointer"
                    style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-xs mb-4"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.52 0.07 228)",
              }}
            >
              Connect
            </div>
            <div className="space-y-3">
              <a
                href="mailto:contact@princecapitalgroup.com"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                contact@princecapitalgroup.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.03 243)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                LinkedIn — Antonio Grillo-Balen
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pcg-disclaimer mb-8">
          <strong style={{ color: "oklch(0.75 0.07 228)" }}>IMPORTANT DISCLAIMER:</strong>{" "}
          Prince Capital Group (PCG) is a proprietary research-to-execution project. PCG trades proprietary capital only. PCG does not manage client funds, does not accept external investment, and does not provide investment advice of any kind. All content published by PCG — including but not limited to strategy notes, educational materials, process memos, and analytical frameworks — is provided for educational and informational purposes only. Nothing on this website constitutes a solicitation, recommendation, or offer to buy or sell any financial instrument. Past process adherence does not guarantee future results. Trading foreign exchange involves substantial risk of loss and is not suitable for all individuals.
        </div>

        {/* Bottom Row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <span
            className="text-xs"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "oklch(0.50 0.03 243)",
              letterSpacing: "0.06em",
            }}
          >
            © {new Date().getFullYear()} Prince Capital Group. All rights reserved.
          </span>
          <span
            className="text-xs"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "oklch(0.50 0.03 243)",
              letterSpacing: "0.06em",
            }}
          >
            Educational content only. Not investment advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
