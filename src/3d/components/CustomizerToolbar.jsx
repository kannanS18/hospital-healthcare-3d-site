import React, { useState } from 'react';
import { useVerticalStore } from '../../store/useVerticalStore';
import { Sliders, Activity, Heart, Brain, User, Sparkles } from 'lucide-react';

export function CustomizerToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const hospitalConfig = useVerticalStore((state) => state.hospitalCustomizer);
  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);

  const currentMode = hospitalConfig.explorerMode || 'heart';
  const currentBpm = hospitalConfig.bpm || 72;
  const isXray = hospitalConfig.xrayMode || false;

  return (
    <div className="absolute bottom-4 left-4 z-30 pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 border border-emerald-200 shadow-lg hover:border-emerald-500 transition-all text-slate-800 backdrop-blur-md group cursor-pointer"
      >
        <Sliders className="w-4 h-4 text-emerald-600 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-xs font-bold tracking-wider uppercase">
          3D Anatomy Explorer
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </button>

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="mt-2.5 p-4 rounded-2xl bg-white/98 border border-emerald-200 shadow-2xl w-80 space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              Clinical Anatomy Systems
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Organ Mode Switcher */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
              Active Anatomical Suite
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() =>
                  updateHospital({
                    explorerMode: 'heart',
                    telemetryMessage: `❤️ Cardiology Suite: Normal Sinus Rhythm (${currentBpm} BPM) • 120/80 mmHg • SpO2 99%`,
                  })
                }
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  currentMode === 'heart'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${currentMode === 'heart' ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                <span className="text-[10px]">Cardiology</span>
              </button>

              <button
                onClick={() =>
                  updateHospital({
                    explorerMode: 'brain',
                    telemetryMessage: "🧠 Neurological Institute: Comprehensive Stroke Unit • Synaptic Map Active",
                  })
                }
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  currentMode === 'brain'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
                }`}
              >
                <Brain className={`w-4 h-4 ${currentMode === 'brain' ? 'text-sky-500 animate-bounce' : 'text-slate-400'}`} />
                <span className="text-[10px]">Neurology</span>
              </button>

              <button
                onClick={() =>
                  updateHospital({
                    explorerMode: 'body',
                    telemetryMessage: "🧍 Digital Twin: Whole-Body Diagnostic Laser Scan Active • Level-1 Ready",
                  })
                }
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  currentMode === 'body'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
                }`}
              >
                <User className={`w-4 h-4 ${currentMode === 'body' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-[10px]">Digital Twin</span>
              </button>
            </div>
          </div>

          {/* Heart Rate BPM Slider (Active in Cardiology Mode) */}
          {currentMode === 'heart' && (
            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wide">
                  Simulate Heart Rate
                </span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {currentBpm} BPM
                </span>
              </div>
              <input
                type="range"
                min="55"
                max="130"
                step="5"
                value={currentBpm}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  updateHospital({
                    bpm: val,
                    telemetryMessage: `❤️ Heart Rate synced to ${val} BPM. Ventricular contractility updated.`,
                  });
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Rest (60)</span>
                <span>Normal (72)</span>
                <span>Elevated (110)</span>
              </div>
            </div>
          )}

          {/* X-Ray / Holographic Shader Mode */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Bio-Hologram / X-Ray Mode
            </span>
            <input
              type="checkbox"
              checked={isXray}
              onChange={(e) => updateHospital({ xrayMode: e.target.checked })}
              className="accent-emerald-600 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="p-2 rounded-xl bg-slate-50 text-[10px] text-slate-600 border border-slate-200 leading-snug">
            💡 <strong>Interactive:</strong> Click on the floating 3D organ tags or drag to inspect anatomy from any angle.
          </div>
        </div>
      )}
    </div>
  );
}
