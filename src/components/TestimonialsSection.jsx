import React from 'react';
import { hospitalData } from '../data/hospitalData';
import { Quote, CheckCircle } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="outcomes" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#0D9488] mb-2">Clinical Recovery Registry</div>
        <h2 className="text-4xl sm:text-5xl font-bold font-heading uppercase text-[#0F172A]">PATIENT OUTCOMES</h2>
        <div className="w-16 h-1 bg-[#0D9488] mx-auto my-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hospitalData.testimonials.map((item, i) => (
          <div key={i} className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0D9488]/20 shadow-sm flex flex-col justify-between">
            <Quote className="w-8 h-8 text-[#0D9488] mb-6" />
            <blockquote className="text-base sm:text-lg text-[#0F172A] font-body leading-relaxed mb-8 italic">
              "{item.quote}"
            </blockquote>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full object-cover border-2 border-[#0D9488]" />
                <div>
                  <div className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-1.5">
                    <span>{item.author}</span>
                    <CheckCircle className="w-4 h-4 text-[#0D9488]" />
                  </div>
                  <div className="text-xs text-gray-500">{item.title}</div>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#0D9488]/15 text-[#0D9488]">
                {item.car}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}