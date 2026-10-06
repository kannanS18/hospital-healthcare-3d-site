import React, { useState } from 'react';
import { useVerticalStore } from '../../store/useVerticalStore';
import { Sliders, RotateCw, Activity, Sparkles, User, Heart } from 'lucide-react';

export function CustomizerToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const hospitalConfig = useVerticalStore((state) => state.hospitalCustomizer);
  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);

  return (
    <div className="absolute bottom-4 left-4 z-30 pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 border border-emerald-200 shadow-lg hover:border-emerald-500 transition-all text-slate-800 backdrop-blur-md group"
      >
        <Sliders className="w-4 h-4 text-emerald-600 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-bold tracking-wider uppercase">
          3D Mascot Controls
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </button>

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="mt-2.5 p-4 rounded-2xl bg-white/98 border border-emerald-200 shadow-2xl w-72 space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              Dr. Maya 3D Mascot
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs p-1"
            >
              ✕
            </button>
          </div>

          {/* Interactive Mascot Actions */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
              Mascot Actions & Gait
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  updateHospital({
                    triggerWalkIn: true,
                    speechMessage: "🚶‍♀️ Dr. Maya walking up to welcome you to AuraCare Medical Center!",
                  });
                }}
                className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 transition-all flex items-center justify-center gap-1.5 text-slate-700"
              >
                <span>🚶‍♀️ Walk Up</span>
              </button>
              <button
                onClick={() => {
                  updateHospital({
                    isWaving: true,
                    speechMessage: "👋 Hello! Dr. Maya at your service. Our emergency & cardiology suites are open 24/7!",
                  });
                }}
                className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 transition-all flex items-center justify-center gap-1.5 text-slate-700"
              >
                <span>👋 Wave</span>
              </button>
              <button
                onClick={() => {
                  updateHospital({
                    speechMessage: "💓 Live Telemetry: Heart Rate 72 BPM, Blood Pressure 120/80 mmHg, SpO2 99% (Optimal).",
                  });
                }}
                className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 transition-all flex items-center justify-center gap-1.5 text-slate-700"
              >
                <span>🩺 Vitals</span>
              </button>
              <button
                onClick={() => {
                  const tips = [
                    "“A 20-minute daily brisk walk lowers cardiovascular risk by 30%.” — Dr. Maya",
                    "“Drinking 2.5L of water daily enhances cellular repair and cognitive focus.” — Dr. Maya",
                    "“7-8 hours of sleep boosts your natural T-cell immunity by 40%.” — Dr. Maya",
                  ];
                  const t = tips[Math.floor(Math.random() * tips.length)];
                  updateHospital({ speechMessage: t });
                }}
                className="py-1.5 px-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:border-emerald-500 hover:text-emerald-700 transition-all flex items-center justify-center gap-1.5 text-slate-700"
              >
                <span>💡 Tip</span>
              </button>
            </div>
          </div>

          {/* Follow Cursor Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-700 font-medium">Mascot Follow Cursor</span>
            <input
              type="checkbox"
              checked={hospitalConfig.mascotFollow !== false}
              onChange={(e) => updateHospital({ mascotFollow: e.target.checked })}
              className="accent-emerald-600 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-200 leading-snug">
            💡 <strong>Hint:</strong> Move your mouse around to direct Dr. Maya's gaze. Drag with mouse to inspect in 360°!
          </div>
        </div>
      )}
    </div>
  );
}
