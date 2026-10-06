import React from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { Activity, ShieldCheck, Award, Heart, Phone, MapPin, Mail } from 'lucide-react';

export function FooterSection() {
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-12 border-t border-slate-200 bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-2xl font-extrabold text-white tracking-tight">
                AURACARE+
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              JCI-accredited tertiary medical health system uniting robotic surgical innovation, genomic precision medicine, and compassionate patient-centered healing.
            </p>

            {/* Accreditations Banner */}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>Joint Commission Gold Seal • Magnet Recognition • Level-1 Trauma</span>
            </div>
          </div>

          {/* Links Column 1: Clinical Specialties */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">
              Clinical Institutes
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li onClick={() => setActivePage('departments')} className="hover:text-emerald-400 cursor-pointer">
                Cardiology & Heart Center
              </li>
              <li onClick={() => setActivePage('departments')} className="hover:text-emerald-400 cursor-pointer">
                Cranial Neurosciences
              </li>
              <li onClick={() => setActivePage('departments')} className="hover:text-emerald-400 cursor-pointer">
                Precision Oncology Institute
              </li>
              <li onClick={() => setActivePage('departments')} className="hover:text-emerald-400 cursor-pointer">
                Orthopedics & Joint Surgery
              </li>
              <li onClick={() => setActivePage('departments')} className="hover:text-emerald-400 cursor-pointer">
                da Vinci Robotic Surgery
              </li>
              <li onClick={() => setActivePage('departments')} className="hover:text-emerald-400 cursor-pointer">
                Pediatrics & Neonatal ICU
              </li>
            </ul>
          </div>

          {/* Links Column 2: Patient Access */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">
              Patient Access
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li onClick={() => setActivePage('appointments')} className="hover:text-emerald-400 cursor-pointer">
                Book Consultation
              </li>
              <li onClick={() => setActivePage('doctors')} className="hover:text-emerald-400 cursor-pointer">
                Find a Senior Doctor
              </li>
              <li onClick={() => setActivePage('blog')} className="hover:text-emerald-400 cursor-pointer text-emerald-300 font-semibold">
                Medical Journal & Health Blog
              </li>
              <li onClick={() => setActivePage('facilities')} className="hover:text-emerald-400 cursor-pointer">
                Hospital Facilities & Tech
              </li>
              <li onClick={() => setActivePage('contact')} className="hover:text-emerald-400 cursor-pointer">
                Visiting Hours & Directions
              </li>
              <li onClick={() => setActivePage('contact')} className="hover:text-emerald-400 cursor-pointer">
                Emergency & Trauma Center
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact Summary */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">
              Emergency & Direct
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="text-rose-400 font-bold">24/7 Trauma Hotline</p>
              <a href="tel:8072212411" className="font-mono font-bold text-white text-base block hover:text-emerald-400">
                +91 8072212411
              </a>
              <p className="text-[11px] text-slate-400 pt-2">
                AuraCare Pavilion, 450 Medical Sciences Way, Boston, MA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {currentYear} AuraCare Health Systems. All rights reserved. JCI & HIPAA Compliant.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Patient Rights</span>
            <span className="hover:text-slate-300 cursor-pointer">HIPAA Notice of Privacy</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
