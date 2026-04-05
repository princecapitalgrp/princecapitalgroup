import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useSEO } from '@/hooks/useSEO';
import '../styles/museum.css';

const REGIMES = [
  {
    id: 'soft-landing',
    title: 'Soft Landing',
    subtitle: 'Stable Growth',
    description: 'Moderate growth with controlled inflation and gradual rate normalization.',
    color: '#4ade80',
  },
  {
    id: 'sticky-inflation',
    title: 'Sticky Inflation',
    subtitle: 'Financial Repression',
    description: 'Persistent price pressures with elevated real rates and policy uncertainty.',
    color: '#f97316',
  },
  {
    id: 'hard-landing',
    title: 'Hard Landing',
    subtitle: 'Recession Shock',
    description: 'Sharp economic contraction with rapid policy reversal and asset repricing.',
    color: '#ef4444',
  },
  {
    id: 'stagflation',
    title: 'Structural Stagflation',
    subtitle: 'Slow Decay',
    description: 'Stagnant growth coupled with persistent inflation and policy constraints.',
    color: '#a855f7',
  },
];

export default function RegimeGallery() {
  useSEO({
    title: 'Macro Regimes | Renaissance Macro Museum',
    description: 'Explore macroeconomic regimes through an immersive palace environment.',
  });

  const [, setLocation] = useLocation();
  const [selectedRegime, setSelectedRegime] = useState<string | null>(null);

  const handleRegimeSelect = (regimeId: string) => {
    setSelectedRegime(regimeId);
    setTimeout(() => {
      setLocation(`/macro-museum/map-wall?regime=${regimeId}`);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const portalVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
    hover: {
      y: -12,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="museum-container"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/macro-museum-regime-gallery-9A65Hd6AG3ovk3PekiTzWa.webp)',
      }}
    >
      <div className="museum-bg" />

      {/* Navigation Crest */}
      <div className="nav-crest" onClick={() => setLocation('/')}>
        <span>🏛️</span>
      </div>

      {/* Main Content */}
      <div className="museum-content flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.div className="text-center mb-16" variants={portalVariants}>
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#d4af37' }}
            >
              Macro Regime Gallery
            </h1>
            <p className="text-lg opacity-80" style={{ color: '#f5e6d3' }}>
              Select a macroeconomic regime to explore its implications across asset classes and geographies
            </p>
          </motion.div>

          {/* Regime Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REGIMES.map((regime) => (
              <motion.div
                key={regime.id}
                className="regime-portal"
                variants={portalVariants}
                whileHover="hover"
                onClick={() => handleRegimeSelect(regime.id)}
                style={{
                  borderColor: selectedRegime === regime.id ? regime.color : '#d4af37',
                  opacity: selectedRegime && selectedRegime !== regime.id ? 0.5 : 1,
                } as React.CSSProperties}
              >
                {/* Portal Icon/Color Indicator */}
                <div
                  className="w-16 h-16 rounded-full mb-4 opacity-60"
                  style={{ backgroundColor: regime.color }}
                />

                <h2 className="regime-portal-title">{regime.title}</h2>
                <p
                  className="text-sm mb-3"
                  style={{ color: regime.color, fontWeight: 600 }}
                >
                  {regime.subtitle}
                </p>
                <p className="regime-portal-description">{regime.description}</p>

                {/* Hover Indicator */}
                <motion.div
                  className="mt-4 text-sm"
                  style={{ color: '#d4af37' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Click to explore →
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.p
            className="text-center mt-16 text-sm opacity-60"
            style={{ color: '#f5e6d3' }}
            variants={portalVariants}
          >
            Each regime shapes asset correlations, volatility expectations, and portfolio construction differently.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
