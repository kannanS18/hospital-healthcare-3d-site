import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { carData } from '../data/carData';
import { hospitalData } from '../data/hospitalData';
import { dentalData } from '../data/dentalData';
import { realEstateData } from '../data/realEstateData';
import { Quote, Star, CheckCircle } from 'lucide-react';

export function TestimonialsSection() {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const contentMap = {
    [VERTICAL_KEYS.CAR]: carData.testimonials,
    [VERTICAL_KEYS.HOSPITAL]: hospitalData.testimonials,
    [VERTICAL_KEYS.DENTAL]: dentalData.testimonials,
    [VERTICAL_KEYS.REALESTATE]: realEstateData.testimonials,
  };

  const testData = contentMap[activeVertical];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVertical}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-theme-primary mb-2">
                Verified Reputations
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-heading uppercase tracking-tight text-theme-text">
                {testData.heading}
              </h2>
              <div className="w-16 h-1 bg-theme-primary mx-auto my-4 rounded-full" />
              <p className="text-sm sm:text-base text-theme-text-muted font-body">
                {testData.subheading}
              </p>
            </div>

            {/* Testimonials Cards (2 Column High Impact Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {testData.items.map((item, index) => (
                <div
                  key={index}
                  className="p-8 sm:p-10 rounded-3xl glass-panel border border-theme-border/40 relative shadow-theme-card hover:shadow-theme-glow transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Big Accent Quote Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary mb-6">
                    <Quote className="w-6 h-6" />
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-base sm:text-lg text-theme-text font-body leading-relaxed mb-8 italic">
                    "{item.quote}"
                  </blockquote>

                  {/* Author Meta */}
                  <div className="pt-6 border-t border-theme-border/20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-13 h-13 rounded-full object-cover border-2 border-theme-primary shadow-md"
                      />
                      <div>
                        <div className="font-heading font-bold text-lg text-theme-text flex items-center gap-1.5">
                          <span>{item.author}</span>
                          <CheckCircle className="w-4 h-4 text-theme-primary" />
                        </div>
                        <div className="text-xs text-theme-text-muted font-body">
                          {item.title}
                        </div>
                      </div>
                    </div>

                    {/* Badge / Outcome Tag */}
                    <div className="hidden sm:block text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-theme-primary/15 text-theme-primary border border-theme-primary/30">
                        {item.car}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
