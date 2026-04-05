import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useSEO } from '@/hooks/useSEO';
import '../styles/museum.css';

const ASSET_CLASSES = [
  {
    id: 'fx',
    title: 'FX',
    subtitle: 'Foreign Exchange',
    icon: '🧭',
    description: 'Currency pairs and cross-rate dynamics',
    color: '#60a5fa',
  },
  {
    id: 'bonds',
    title: 'Bonds',
    subtitle: 'Government Debt',
    icon: '👑',
    description: 'Sovereign yields and fixed income',
    color: '#fbbf24',
  },
  {
    id: 'commodities',
    title: 'Commodities',
    subtitle: 'Raw Materials',
    icon: '⚗️',
    description: 'Energy, metals, and agricultural futures',
    color: '#f87171',
  },
  {
    id: 'equities',
    title: 'Equities',
    subtitle: 'Stock Markets',
    icon: '📈',
    description: 'Regional indices and sector rotations',
    color: '#34d399',
  },
  {
    id: 'real-digital',
    title: 'Real & Digital',
    subtitle: 'Alternative Assets',
    icon: '🔮',
    description: 'Crypto, REITs, and real asset proxies',
    color: '#a78bfa',
  },
];

export default function RegionalChamber() {
  useSEO({
    title: 'Asset Classes | Renaissance Macro Museum',
    description: 'Explore macroeconomic asset classes within regional context.',
  });

  const [, setLocation] = useLocation();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleAssetSelect = (assetId: string) => {
    setSelectedAsset(assetId);
    setTimeout(() => {
      setLocation(`/macro-museum/asset-studio?asset=${assetId}`);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const doorVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="museum-container"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/macro-museum-regional-chamber-XAhkgyNy9QZpUTBpCsJoXS.webp)',
      }}
    >
      <div className="museum-bg" />

      {/* Navigation Crest */}
      <div className="nav-crest" onClick={() => setLocation('/macro-museum/map-wall')}>
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
          <motion.div className="text-center mb-16" variants={doorVariants}>
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#d4af37' }}
            >
              Asset Class Chambers
            </h1>
            <p className="text-lg opacity-80" style={{ color: '#f5e6d3' }}>
              Select an asset class to explore its macroeconomic drivers
            </p>
          </motion.div>

          {/* Asset Class Doors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ASSET_CLASSES.map((asset) => (
              <motion.div
                key={asset.id}
                className="asset-door"
                variants={doorVariants}
                whileHover="hover"
                onClick={() => handleAssetSelect(asset.id)}
                style={{
                  borderColor: selectedAsset === asset.id ? asset.color : '#d4af37',
                  opacity: selectedAsset && selectedAsset !== asset.id ? 0.5 : 1,
                } as React.CSSProperties}
              >
                <div className="asset-door-icon">{asset.icon}</div>
                <h2 className="asset-door-title">{asset.title}</h2>
                <p className="asset-door-subtitle">{asset.subtitle}</p>
                <p
                  className="text-xs mt-3 text-center"
                  style={{ color: '#f5e6d3', opacity: 0.7 }}
                >
                  {asset.description}
                </p>

                {/* Hover Indicator */}
                <motion.div
                  className="mt-4 text-xs"
                  style={{ color: asset.color }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Enter →
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.p
            className="text-center mt-16 text-sm opacity-60"
            style={{ color: '#f5e6d3' }}
            variants={doorVariants}
          >
            Each asset class responds differently to macro regimes and regional conditions.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
