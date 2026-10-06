import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { ArrowRight, Search, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroSection({ onOpenBooking }) {
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const hospitalSpeech = useVerticalStore((state) => state.hospitalCustomizer.speechMessage);
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

      {/* Doctor Mascot Interactive Dialogue Bubble */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-md max-w-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base flex-shrink-0">
            🩺
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Dr. Maya Thorne, MD • 3D Physician Mascot
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-800 font-medium mt-1 leading-relaxed">
              {hospitalSpeech ||
                "👋 Welcome to AuraCare! Move your cursor across the screen — my gaze tracks your pointer in real-time."}
            </p>
            {/* Quick Mascot Triggers */}
            <div className="mt-2.5 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  updateHospital({
                    triggerWalkIn: true,
                    speechMessage: "🚶‍♀️ Dr. Maya walking up to welcome you to AuraCare Medical Center!",
                  })
                }
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                🚶‍♀️ Walk Up
              </button>
              <button
                onClick={() =>
                  updateHospital({
                    isWaving: true,
                    speechMessage: "👋 Hello! Dr. Maya at your service. Our emergency trauma & cardiology suites are open 24/7!",
                  })
                }
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                👋 Wave
              </button>
              <button
                onClick={() =>
                  updateHospital({
                    speechMessage: "💓 Live Telemetry: Heart Rate 72 BPM, Blood Pressure 120/80 mmHg, SpO2 99%. All vitals optimal!",
                  })
                }
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                🩺 Vitals
              </button>
              <button
                onClick={() => {
                  const tips = [
                    "“A 20-minute daily brisk walk lowers cardiovascular risk by 30%.” — Dr. Maya",
                    "“Drinking 2.5L of water daily enhances cellular repair and cognitive focus.” — Dr. Maya",
                    "“7-8 hours of sleep boosts your natural T-cell immunity by 40%.” — Dr. Maya",
                    "“Prioritizing annual preventive wellness screenings saves lives.” — Dr. Maya",
                  ];
                  const t = tips[Math.floor(Math.random() * tips.length)];
                  updateHospital({ speechMessage: t });
                }}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                💡 Health Tip
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
