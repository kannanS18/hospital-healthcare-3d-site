import React from 'react';
import { Activity, Award } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="pt-16 pb-12 border-t border-slate-200 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/20 border border-[#0D9488]/40 flex items-center justify-center text-[#0D9488]"><Activity className="w-5 h-5" /></div>
              <span className="text-2xl font-bold font-heading tracking-wider">MediCare+ HEALTH</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">JCI-accredited academic medical center uniting robotic surgical innovation, genomic oncology, and humanized patient care.</p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#0D9488]">
              <Award className="w-4 h-4" />
              <span>Joint Commission Gold Seal • Magnet Recognition</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">Institutes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Cardiovascular Institute</li>
              <li>Brain & Spinal Neurosciences</li>
              <li>Genomic Oncology Center</li>
              <li>Level 1 Trauma & Emergency</li>
              <li>da Vinci Robotic Suites</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">Boston Medical Campus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">450 Medical Sciences Way, Boston, MA<br/><br/>Emergency: 1-800-MEDICARE<br/>Clinical Desk: +1 (800) 452-9800</p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} MediCare+ Health System. All rights reserved. HIPAA Compliant.</div>
          <div className="flex gap-6">
            <span>Patient Privacy (HIPAA)</span>
            <span>Non-Discrimination Policy</span>
            <span>Patient Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
}