import React, { useState } from 'react';
import {
  PhoneCall,
  MapPin,
  Clock,
  ShieldAlert,
  Navigation,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Building,
  HeartPulse,
  Radio,
} from 'lucide-react';
import { EmergencySOSModal } from '../components/EmergencySOSModal';

export function ContactEmergencyPage() {
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const EMERGENCY_PHONE = '8072212411';

  return (
    <>
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200 uppercase tracking-wide inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            24/7 Immediate Trauma & Ambulance Dispatch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Emergency Care & Direct Hospital Response
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            In medical emergencies, speed is everything. AuraCare+ provides instant 1-tap emergency ambulance dispatch, live GPS positioning, and immediate connection to attending trauma surgeons.
          </p>
        </div>

        {/* =========================================================================
            PRIMARY 1-CLICK EMERGENCY ACTION HERO CARD
            ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-rose-950 via-slate-950 to-slate-900 text-white shadow-2xl border-2 border-rose-600/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                <span>Level-1 Trauma & Comprehensive Stroke Bay</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Are You or Someone Nearby in Immediate Danger?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Skip long forms. One tap directly connects your phone to our trauma response desk at <strong className="text-white font-mono text-base">8072212411</strong> and shares your real-time GPS coordinates with the active ambulance crew.
              </p>
            </div>

            {/* Direct Instant Action CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-80 flex-shrink-0">
              <button
                onClick={() => setSosModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-rose-600/40 flex items-center justify-center gap-3 transition-transform active:scale-95 border border-rose-400 group"
              >
                <ShieldAlert className="w-5 h-5 animate-bounce" />
                <span className="flex-1 text-center">TRIGGER 1-CLICK SOS</span>
              </button>

              <a
                href={`tel:${EMERGENCY_PHONE}`}
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>CALL DIRECT: {EMERGENCY_PHONE}</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TRIAGE RESPONSE OPTIONS (NO SLOW FORMS)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Emergency Red Level */}
          <div className="p-6 rounded-3xl bg-white border-2 border-rose-200 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[11px] font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full uppercase border border-rose-200 inline-block">
                Level 1: Critical Emergency
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Chest Pain, Stroke, Severe Trauma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unresponsiveness, breathing difficulty, choking, severe blood loss, sudden paralysis, or major accident.
              </p>
            </div>
            <button
              onClick={() => setSosModalOpen(true)}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 8072212411 Now</span>
            </button>
          </div>

          {/* Card 2: Urgent Amber Level */}
          <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase border border-amber-200 inline-block">
                Level 2: Urgent Care
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Fractures, High Fever, Burns</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acute asthma flares, sprains or possible fractures, severe abdominal cramps, deep cuts requiring stitches.
              </p>
            </div>
            <a
              href={`tel:${EMERGENCY_PHONE}`}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors text-center block"
            >
              Call Triage: 8072212411
            </a>
          </div>

          {/* Card 3: Direct GPS Ambulance Tracking */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Navigation className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase border border-emerald-200 inline-block">
                Instant GPS Dispatch
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Share Location with Ambulance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Can't speak or don't know the exact street address? One tap fetches GPS satellite coordinates and sends to our rescue desk.
              </p>
            </div>
            <button
              onClick={() => setSosModalOpen(true)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Broadcast GPS to Paramedics</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            HOSPITAL CAMPUS DIRECTIONS & CRITICAL HOTLINES
            ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-black text-slate-900">Hospital Campus Access & Direct Helplines</h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct hotlines monitored 24 hours daily by certified clinical emergency operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                <PhoneCall className="w-4 h-4" />
                <span>24/7 Trauma Command Desk</span>
              </div>
              <div className="text-lg font-black font-mono text-slate-900">8072212411</div>
              <p className="text-[11px] text-slate-500">Dedicated red line for paramedics, stroke, and cardiac arrest dispatch.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <MapPin className="w-4 h-4" />
                <span>Trauma Center Entrance</span>
              </div>
              <div className="text-xs font-bold text-slate-900">AuraCare Pavilion, 450 Medical Sciences Way</div>
              <p className="text-[11px] text-slate-500">Dedicated ambulance bay ramp with sheltered emergency drop-off.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                <Clock className="w-4 h-4" />
                <span>Emergency Waiting Status</span>
              </div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Average Door-to-Doctor: &lt; 4 mins</span>
              </div>
              <p className="text-[11px] text-slate-500">Zero wait-time triage for chest discomfort or acute neurologic deficits.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
