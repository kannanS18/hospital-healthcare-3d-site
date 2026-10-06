import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { Cpu, ShieldCheck, Activity, Award, Eye, ArrowRight, Zap } from 'lucide-react';

const FACILITIES = [
  {
    title: 'da Vinci Xi Dual-Console Surgical Platform',
    category: 'ROBOTIC OPERATING THEATRE',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    desc: 'Equipped with 3D high-definition optical magnification and robotic micro-wrists providing 7 degrees of freedom, transforming complex surgeries into tiny keyhole incisions.',
    specs: ['Sub-millimeter motion scaling', 'Tremor filtration technology', 'Dual-surgeon training console', 'Fluorescence firefly imaging'],
  },
  {
    title: 'Ultra-High Field 3.0-Tesla Neuro MRI & Spectral CT',
    category: 'DIAGNOSTIC RADIOLOGY SUITE',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    desc: 'High-gradient 3T magnetic resonance imaging producing razor-sharp micro-structural mapping of brain, cardiac, and musculoskeletal anatomy with 70% acoustic noise dampening.',
    specs: ['Acoustic noise reduction to ambient level', 'Diffusion tensor tractography', 'Ultrafast scan sequences (under 12 min)', 'Wide-bore comfort design'],
  },
  {
    title: 'AI Tele-ICU & Critical Care Bio-Telemetry',
    category: 'INTENSIVE CARE INFRASTRUCTURE',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    desc: 'Every critical care bed is linked to continuous physiological AI telemetry that predicts early organ distress and hemodynamic instability up to 6 hours before clinical symptoms appear.',
    specs: ['24/7 dual-board intensivist surveillance', 'Positive-pressure HEPA isolation', 'Automated hemodynamic stabilization alarms', 'Zero-infection central line protocols'],
  },
  {
    title: 'Level-1 Emergency Trauma Bays & Rooftop Heliport',
    category: 'EMERGENCY TRAUMA INFRASTRUCTURE',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    desc: 'Direct rapid-elevator access from our rooftop heliport to state-of-the-art resuscitation trauma suites with instant hybrid angiographic capabilities.',
    specs: ['Dedicated high-speed trauma elevator', 'Instant whole-body trauma CT bay', 'Rooftop all-weather air ambulance landing', 'Immediate massive blood transfusion depot'],
  },
];

export function FacilitiesPage() {
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
          Hospital Infrastructure
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Advanced Clinical Technology & Facilities
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Engineered for patient comfort, rapid clinical intervention, and minimal invasive trauma.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FACILITIES.map((fac, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="h-56 overflow-hidden bg-slate-100 relative">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                  {fac.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{fac.desc}</p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Clinical Specifications:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                    {fac.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActivePage('appointments')}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Schedule Consultation In This Department</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
