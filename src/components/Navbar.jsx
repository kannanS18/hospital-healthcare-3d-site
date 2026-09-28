import React from 'react';
import { Activity, ArrowUpRight } from 'lucide-react';

export function Navbar({ onOpenBooking }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-[#0D9488]/20">
      <div className="bg-emerald-950 text-white text-[11px] font-mono py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-semibold text-emerald-300">Level 1 Trauma Emergency Hotline:</span>
          <a href="tel:18006334227" className="underline hover:text-white font-bold">1-800-MEDICARE</a>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-300">
          <span>Patient Portal Login</span>
          <span>•</span>
          <span>JCI Accredited Facility</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/40 flex items-center justify-center text-[#0D9488]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold font-heading tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <span>MediCare+</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#0D9488]/20 text-[#0D9488] border border-[#0D9488]/30">HEALTH</span>
            </div>
            <div className="text-[10px] tracking-widest font-mono text-gray-500 uppercase">CENTERS OF EXCELLENCE</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-heading font-semibold uppercase tracking-wider text-gray-600">
          <a href="#services" className="hover:text-[#0D9488] transition-colors">Specialties</a>
          <a href="#faculty" className="hover:text-[#0D9488] transition-colors">Medical Faculty</a>
          <a href="#outcomes" className="hover:text-[#0D9488] transition-colors">Outcomes</a>
          <a href="#contact" className="hover:text-[#0D9488] transition-colors">Admissions</a>
        </nav>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white shadow-md hover:shadow-lg transition-all"
        >
          <span>Book Consultation</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}