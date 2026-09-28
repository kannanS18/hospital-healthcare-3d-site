import React from 'react';
import { hospitalData } from '../data/hospitalData';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection({ onOpenBooking }) {
  const { hero } = hospitalData;
  return (
    <div className="relative pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono font-semibold tracking-wider text-[#0D9488] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
          <span>{hero.badge}</span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-[#0F172A] uppercase leading-none">
            <span className="block">{hero.titleLine1}</span>
            <span className="block theme-gradient-text mt-1">{hero.titleLine2}</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl font-body leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase flex items-center gap-3 bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white shadow-md hover:shadow-lg transition-all"
            >
              <span>{hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              className="px-6 py-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase glass-panel text-[#0F172A] hover:border-[#0D9488] transition-all flex items-center gap-2"
            >
              <span>Explore Specialties</span>
              <ChevronDown className="w-4 h-4 text-[#0D9488]" />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel max-w-3xl">
            {hero.metrics.map((m, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A]">{m.value}</div>
                <div className="text-[11px] font-mono uppercase text-gray-500 tracking-wider mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}