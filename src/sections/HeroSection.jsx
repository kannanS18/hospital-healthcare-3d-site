import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { ArrowRight, Search, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroSection({ onOpenBooking }) {
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const hospitalTelemetry = useVerticalStore(
    (state) => state.hospitalCustomizer.telemetryMessage
  );
  const currentMode = useVerticalStore(
    (state) => state.hospitalCustomizer.explorerMode || 'heart'
  );
  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);

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

      {/* 3D Clinical Anatomy & Digital Twin Live Console */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-md max-w-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base flex-shrink-0">
            {currentMode === 'heart' ? '❤️' : currentMode === 'brain' ? '🧠' : '🧍'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  AuraCare 3D Digital Twin • Live Clinical Explorer
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-slate-800 font-medium mt-1 leading-relaxed">
              {hospitalTelemetry ||
                "❤️ Cardiology Suite: Normal Sinus Rhythm (72 BPM) • 120/80 mmHg • SpO2 99%"}
            </p>
            {/* Quick Interactive Organ Triggers */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  updateHospital({
                    explorerMode: 'heart',
                    bpm: 72,
                    telemetryMessage: "❤️ Cardiology Suite: Real-time 3D Beating Heart • 72 BPM • Aorta & Coronary Output Active",
                  })
                }
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                  currentMode === 'heart'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                ❤️ Inspect Heart
              </button>
              <button
                onClick={() =>
                  updateHospital({
                    explorerMode: 'brain',
                    telemetryMessage: "🧠 Neurological Institute: 3D Cerebral Cortex & Synaptic Network • Stroke Unit Active",
                  })
                }
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                  currentMode === 'brain'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                🧠 Neural Scan
              </button>
              <button
                onClick={() =>
                  updateHospital({
                    explorerMode: 'body',
                    telemetryMessage: "🧍 Digital Twin: Holographic Laser Diagnostic Scanner • All Organ Systems Normal",
                  })
                }
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                  currentMode === 'body'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                🧍 Body Scanner
              </button>
            </div>
          </div>
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
