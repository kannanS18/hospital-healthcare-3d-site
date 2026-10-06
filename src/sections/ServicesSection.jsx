import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { carData } from '../data/carData';
import { hospitalData } from '../data/hospitalData';
import { dentalData } from '../data/dentalData';
import { realEstateData } from '../data/realEstateData';
import {
  Gauge, Flame, Shield, Disc, Sparkles, Layers,
  Heart, Brain, Dna, Activity, Cpu, Stethoscope,
  Smile, ShieldCheck, Gem, HeartHandshake,
  Key, TrendingUp, Compass, Landmark, ArrowRight
} from 'lucide-react';

const iconMap = {
  Gauge, Flame, Shield, Disc, Sparkles, Layers,
  Heart, Brain, Dna, Activity, Cpu, Stethoscope,
  Smile, ShieldCheck, Gem, HeartHandshake,
  Key, TrendingUp, Compass, Landmark,
};

export function ServicesSection({ onOpenBooking }) {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const contentMap = {
    [VERTICAL_KEYS.CAR]: carData.services,
    [VERTICAL_KEYS.HOSPITAL]: hospitalData.services,
    [VERTICAL_KEYS.DENTAL]: dentalData.services,
    [VERTICAL_KEYS.REALESTATE]: realEstateData.services,
  };

  const servicesData = contentMap[activeVertical];

  return (
    <section id="services-section" className="py-20 sm:py-28 relative overflow-hidden transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVertical}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-theme-primary mb-2">
                Specialized Capabilities
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-heading uppercase tracking-tight text-theme-text">
                {servicesData.heading}
              </h2>
              <div className="w-16 h-1 bg-theme-primary mx-auto my-4 rounded-full" />
              <p className="text-sm sm:text-base text-theme-text-muted font-body">
                {servicesData.subheading}
              </p>
            </div>

            {/* Services Grid (6 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {servicesData.items.map((item, index) => {
                const IconComponent = iconMap[item.icon] || Sparkles;

                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`p-7 rounded-2xl relative transition-all duration-300 group ${theme.cardBorderClass} shadow-theme-card hover:shadow-theme-glow`}
                  >
                    {/* Header with Icon & Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary group-hover:scale-110 group-hover:bg-theme-primary group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md bg-white/5 border border-theme-border/40 text-theme-text-muted">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold font-heading text-theme-text mb-2.5 group-hover:text-theme-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-theme-text-muted font-body leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    {/* Bottom Metric & Action */}
                    <div className="pt-4 border-t border-theme-border/20 flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-theme-primary">
                        {item.metric}
                      </span>
                      <button
                        onClick={onOpenBooking}
                        className="text-theme-text-muted group-hover:text-theme-primary font-heading font-bold uppercase flex items-center gap-1 transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
