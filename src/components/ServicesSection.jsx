import React from 'react';
import { hospitalData } from '../data/hospitalData';
import { Heart, Brain, Dna, Activity, Cpu, Stethoscope, ArrowRight } from 'lucide-react';

const icons = { Heart, Brain, Dna, Activity, Cpu, Stethoscope };

export function ServicesSection({ onOpenBooking }) {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#0D9488] mb-2">Tertiary Care Institutes</div>
        <h2 className="text-4xl sm:text-5xl font-bold font-heading uppercase text-[#0F172A]">CENTERS OF CLINICAL EXCELLENCE</h2>
        <div className="w-16 h-1 bg-[#0D9488] mx-auto my-4 rounded-full" />
        <p className="text-gray-600 text-sm sm:text-base">Multi-disciplinary research and surgical departments delivering validated patient recoveries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitalData.services.map((item, i) => {
          const Icon = icons[item.icon] || Activity;
          return (
            <div key={i} className="p-7 rounded-2xl bg-white border-l-4 border-l-[#0D9488] shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-slate-100 text-gray-500">{item.tag}</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0F172A] mb-2 group-hover:text-[#0D9488] transition-colors">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">{item.desc}</p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-[#0D9488]">{item.metric}</span>
                <button onClick={onOpenBooking} className="text-gray-500 group-hover:text-[#0D9488] font-heading font-bold uppercase flex items-center gap-1">
                  <span>Specialists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}