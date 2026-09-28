import React, { useState } from 'react';
import { hospitalData } from '../data/hospitalData';
import { ExternalLink } from 'lucide-react';

export function GallerySection({ onOpenBooking }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Chief Physicians', 'Surgical Suites', 'Diagnostic Labs'];

  const filtered = filter === 'All' ? hospitalData.gallery : hospitalData.gallery.filter(i => i.category === filter);

  return (
    <section id="faculty" className="py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#0D9488] mb-2">Hospital Faculty & Facilities</div>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading uppercase text-[#0F172A]">FACULTY & MEDICAL INFRASTRUCTURE</h2>
            <p className="text-gray-600 text-sm mt-1">Attending department chairs and advanced hybrid operating suites.</p>
          </div>
          <div className="flex gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${filter === c ? 'bg-[#0D9488] text-white shadow-sm' : 'bg-slate-100 text-gray-600 hover:text-black'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-200 hover:border-[#0D9488] transition-all flex flex-col shadow-sm">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0D9488] text-white text-[10px] font-mono font-bold uppercase">{item.badge}</div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-heading text-[#0F172A] group-hover:text-[#0D9488] transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{item.specs}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-mono text-[#0D9488]">{item.category}</span>
                  <button onClick={onOpenBooking} className="text-gray-500 hover:text-black flex items-center gap-1 font-heading uppercase">
                    <span>Consult</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}