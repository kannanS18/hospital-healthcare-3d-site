import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { carData } from '../data/carData';
import { hospitalData } from '../data/hospitalData';
import { dentalData } from '../data/dentalData';
import { realEstateData } from '../data/realEstateData';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { ExternalLink, Sparkles, Eye, ShieldCheck } from 'lucide-react';

export function GallerySection({ onOpenBooking }) {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const contentMap = {
    [VERTICAL_KEYS.CAR]: carData.gallery,
    [VERTICAL_KEYS.HOSPITAL]: hospitalData.gallery,
    [VERTICAL_KEYS.DENTAL]: dentalData.gallery,
    [VERTICAL_KEYS.REALESTATE]: realEstateData.gallery,
  };

  const galleryData = contentMap[activeVertical];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-theme-surface/40 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVertical}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="text-xs font-mono font-bold tracking-widest uppercase text-theme-primary mb-2">
                  Showcase Portfolio
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold font-heading uppercase tracking-tight text-theme-text">
                  {galleryData.heading}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-theme-text-muted font-body max-w-xl">
                  {galleryData.subheading}
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {galleryData.filterCategories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                      activeCategory === cat || (cat === 'All' && activeCategory === 'All')
                        ? 'bg-theme-primary text-white shadow-md'
                        : 'glass-panel text-theme-text-muted hover:text-theme-text'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* DENTAL SPECIAL: Interactive Before & After Slider */}
            {activeVertical === VERTICAL_KEYS.DENTAL ? (
              <div className="space-y-12">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-theme-border/40">
                  <div className="max-w-2xl mb-6">
                    <span className="text-xs font-mono text-theme-primary font-bold uppercase tracking-wider">
                      Interactive Clinical Slider
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-theme-text mt-1">
                      Drag to Reveal 10-Unit Porcelain Smile Makeover
                    </h3>
                    <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
                      Drag the central white divider horizontally to inspect natural enamel texture and translucency.
                    </p>
                  </div>
                  <BeforeAfterSlider
                    beforeImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
                    afterImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                    beforeLabel="Enamel Wear & Gap"
                    afterLabel="Full Porcelain Veneers"
                  />
                </div>

                {/* Additional Cases Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryData.items.slice(1).map((item, i) => (
                    <div
                      key={i}
                      className="group rounded-2xl overflow-hidden glass-panel border border-theme-border/30 hover:border-theme-primary/60 transition-all duration-300 shadow-lg"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase border border-white/20">
                          {item.badge}
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-heading font-bold text-lg text-theme-text mb-1 group-hover:text-theme-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-theme-text-muted font-body">
                          {item.specs}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* GRID FOR CAR, HOSPITAL, REAL ESTATE */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {galleryData.items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8 }}
                    className="group rounded-2xl overflow-hidden glass-panel border border-theme-border/40 hover:border-theme-primary/80 transition-all duration-300 shadow-theme-card hover:shadow-theme-glow flex flex-col"
                  >
                    {/* Media Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Badge */}
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md bg-theme-primary text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                        {item.badge}
                      </div>

                      {/* Quick Inspect Button on Hover */}
                      <button
                        onClick={onOpenBooking}
                        className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-heading text-theme-text mb-1 group-hover:text-theme-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-theme-text-muted font-body leading-relaxed">
                          {item.specs}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-theme-border/30 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono uppercase text-theme-primary font-semibold">
                          {item.category}
                        </span>
                        <button
                          onClick={onOpenBooking}
                          className="text-theme-text-muted hover:text-theme-text flex items-center gap-1 font-heading uppercase text-xs"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
