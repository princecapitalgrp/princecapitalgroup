import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useSEO } from '@/hooks/useSEO';
import '../styles/museum.css';

const CONTINENTS = [
  { id: 'north-america', name: 'North America', x: '20%', y: '35%', width: '18%', height: '28%' },
  { id: 'south-america', name: 'South America', x: '25%', y: '60%', width: '12%', height: '25%' },
  { id: 'europe', name: 'Europe', x: '45%', y: '25%', width: '10%', height: '15%' },
  { id: 'africa', name: 'Africa', x: '48%', y: '45%', width: '12%', height: '30%' },
  { id: 'middle-east', name: 'Middle East', x: '55%', y: '40%', width: '8%', height: '12%' },
  { id: 'asia', name: 'Asia', x: '62%', y: '30%', width: '20%', height: '25%' },
  { id: 'oceania', name: 'Oceania', x: '75%', y: '65%', width: '10%', height: '15%' },
];

export default function MapWall() {
  useSEO({
    title: 'Global Regions | Renaissance Macro Museum',
    description: 'Navigate global macroeconomic regions through an interactive palace map wall.',
  });

  const [, setLocation] = useLocation();
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  const handleContinentSelect = (continentId: string) => {
    setSelectedContinent(continentId);
    setTimeout(() => {
      setLocation(`/macro-museum/regional-chamber?region=${continentId}`);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div
      className="museum-container"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/macro-museum-map-wall-UfsGnuoo3rrrB6pZmb9B9h.webp)',
      }}
    >
      <div className="museum-bg" />

      {/* Navigation Crest */}
      <div className="nav-crest" onClick={() => setLocation('/macro-museum/regime-gallery')}>
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
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#d4af37' }}
            >
              Global Cartography
            </h1>
            <p className="text-lg opacity-80" style={{ color: '#f5e6d3' }}>
              Select a region to explore its macroeconomic landscape
            </p>
          </motion.div>

          {/* Map Wall Container */}
          <motion.div
            className="relative w-full rounded-lg overflow-hidden"
            style={{
              aspectRatio: '16 / 9',
              border: '3px solid #d4af37',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.1)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Map Background Image */}
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663478715478/3WDgnQTEJ6CYmFhbjFiUW8/macro-museum-map-wall-UfsGnuoo3rrrB6pZmb9B9h.webp"
              alt="World Map"
              className="w-full h-full object-cover"
            />

            {/* Continent Hotspots */}
            {CONTINENTS.map((continent) => (
              <motion.div
                key={continent.id}
                className="continent-hotspot"
                style={{
                  left: continent.x,
                  top: continent.y,
                  width: continent.width,
                  height: continent.height,
                }}
                onMouseEnter={() => setHoveredContinent(continent.id)}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => handleContinentSelect(continent.id)}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Glow Effect on Hover */}
                {hoveredContinent === continent.id && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      border: '2px solid #d4af37',
                      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Label */}
                {hoveredContinent === continent.id && (
                  <motion.div
                    className="continent-hotspot-label"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {continent.name}
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Overlay Gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
              }}
            />
          </motion.div>

          {/* Instructions */}
          <motion.p
            className="text-center mt-12 text-sm opacity-60"
            style={{ color: '#f5e6d3' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Hover over continents to reveal names. Click to explore regional asset classes.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
