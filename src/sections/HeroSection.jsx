import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { ArrowRight, Search, ShieldCheck, HeartPulse, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';

export function HeroSection({ onOpenBooking }) {
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  return (
    <div className="space-y-6">
      {/* Top Industry Accreditation Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        <span>JCI ACCREDITED • TOP 1% WORLD MEDICAL CENTERS</span>
      </div>

      {/* Hero Headline */}
      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
          <span>World-Class Healthcare.</span>
          <span className="block text-emerald-600">Compassionately Delivered.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl pt-2">
          Integrating robotic surgical suites, precision genomic medicine, and over 180+ board-certified specialists to provide rapid, patient-centered healing when it matters most.
        </p>
      </div>

      {/* Main Action CTAs */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-lg shadow-emerald-600/25"
        >
          <span>Book Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActivePage('doctors')}
          className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-800 hover:border-emerald-600 hover:text-emerald-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 bg-white"
        >
          <Search className="w-4 h-4 text-emerald-600" />
          <span>Find a Doctor</span>
        </button>
      </div>

      {/* Rapid Clinical Access & Emergency Hotline Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 border border-emerald-200/80 shadow-md max-w-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              🏥
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Level-1 Trauma & Emergency Command</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                24/7 Rapid Ambulance & Cardiac Triage Protocol
              </div>
            </div>
          </div>

          <a
            href="tel:8072212411"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>8072212411</span>
          </a>
        </div>
      </div>

      {/* Live Hospital Trust Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-xl">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
          <div className="text-2xl font-extrabold text-emerald-700">99.4%</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
            Patient Recovery
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
          <div className="text-2xl font-extrabold text-slate-900">180+</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
            Top Surgeons
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
          <div className="text-2xl font-extrabold text-emerald-700">&lt;4 min</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
            Avg. ER Wait
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
          <div className="text-2xl font-extrabold text-slate-900">45+</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
            Specialties
          </div>
        </div>
      </div>
    </div>
  );
}
