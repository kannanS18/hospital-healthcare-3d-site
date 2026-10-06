import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { InteractiveClinicalHub } from '../components/InteractiveClinicalHub';
import { useVerticalStore } from '../store/useVerticalStore';
import { hospitalData } from '../data/hospitalData';
import {
  Activity,
  Heart,
  Brain,
  Dna,
  ShieldAlert,
  Clock,
  UserCheck,
  Building,
  Calendar,
  Search,
  PhoneCall,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';

export function HomePage({ onOpenBooking }) {
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          HERO & INTERACTIVE CLINICAL COMMAND CENTER
          ========================================================================= */}
      <section className="relative pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Left: Headline, Accreditations & Quick Actions */}
          <div className="lg:col-span-6 z-20">
            <HeroSection
              onOpenBooking={onOpenBooking}
              onExplore3D={() => {
                const el = document.getElementById('departments-preview');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>

          {/* Right: Interactive Clinical Hub & Triage Command Station */}
          <div className="lg:col-span-6 relative z-10">
            <InteractiveClinicalHub onOpenBooking={onOpenBooking} />
          </div>

        </div>
      </section>

      {/* =========================================================================
          LIVE EMERGENCY & ER WAIT TIMES TICKER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Live Emergency Triage Status
              </h3>
              <p className="text-xs text-slate-500">
                Level-1 Trauma Certified • Updated real-time • Door-to-doctor under 4 minutes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 block">Adult ER Wait</span>
              <span className="text-sm font-extrabold text-emerald-600 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                4 min
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 block">Pediatric Urgent</span>
              <span className="text-sm font-extrabold text-emerald-600 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                6 min
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 block">Trauma Bay</span>
              <span className="text-sm font-extrabold text-rose-600">Immediate</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 block">Virtual Care</span>
              <span className="text-sm font-extrabold text-emerald-600">Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PATIENT ACTION HUB (FOR EVERYDAY PEOPLE & FAMILIES)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
            Easy Patient Navigation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            How Can We Care For You Today?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActivePage('doctors')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Find a Doctor
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Browse 180+ board-certified surgeons and specialists.
            </p>
          </button>

          <button
            onClick={() => setActivePage('appointments')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Book Appointment
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simple 4-step scheduling with instant digital medical pass.
            </p>
          </button>

          <button
            onClick={() => setActivePage('departments')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Clinical Departments
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Explore 8 world-class multidisciplinary hospital institutes.
            </p>
          </button>

          <button
            onClick={() => setActivePage('contact')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
              Emergency & Trauma
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              24/7 Level-1 trauma response. Direct helpline: 8072212411.
            </p>
          </button>
        </div>
      </section>

      {/* =========================================================================
          CENTERS OF EXCELLENCE PREVIEW
          ========================================================================= */}
      <section id="departments-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
              Medical Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Centers of Clinical Excellence
            </h2>
          </div>
          <button
            onClick={() => setActivePage('departments')}
            className="text-emerald-700 font-bold text-sm hover:underline flex items-center gap-1"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitalData.services.items.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">{item.metric}</span>
                <button
                  onClick={() => setActivePage('appointments')}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-700"
                >
                  Book &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PATIENT RECOVERY STORIES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
            Compassionate Care
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Real Stories of Healing & Hope
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitalData.testimonials.items.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-emerald-200" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                  <p className="text-[11px] text-slate-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
