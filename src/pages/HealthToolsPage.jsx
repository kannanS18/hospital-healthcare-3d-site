import React, { useState } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import {
  Activity,
  Heart,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Navigation,
  ShieldAlert,
} from 'lucide-react';
import { EmergencySOSModal } from '../components/EmergencySOSModal';

export function HealthToolsPage() {
  const [height, setHeight] = useState(172);
  const [weight, setWeight] = useState(68);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const EMERGENCY_NUMBER = '8072212411';

  // BMI Calculation
  const heightMeters = height / 100;
  const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

  let bmiCategory = 'Normal Healthy Weight';
  let bmiColor = 'text-emerald-600';
  let bmiAdvice =
    'Your BMI is in the optimal clinical range. Maintain 150 minutes of weekly aerobic exercise and a balanced Mediterranean diet.';

  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-blue-600';
    bmiAdvice =
      'Consider speaking with our clinical dietitians to ensure adequate caloric and micronutrient intake.';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-600';
    bmiAdvice =
      'Mildly elevated cardiovascular risk. Our preventive cardiology team can help build an individualized lifestyle plan.';
  } else if (bmi >= 30) {
    bmiCategory = 'Obesity Range';
    bmiColor = 'text-rose-600';
    bmiAdvice =
      'Higher risk for metabolic and coronary conditions. We recommend scheduling a comprehensive cardiac wellness evaluation.';
  }

  // Common quick triage categories (Instant 1-Click Buttons — No slow typing required)
  const triageOptions = [
    {
      title: 'Chest Pain or Shortness of Breath',
      severity: 'CRITICAL EMERGENCY',
      color: 'border-rose-300 bg-rose-50/70 text-rose-900',
      badge: 'bg-rose-600 text-white',
      desc: 'Possible acute myocardial infarction or pulmonary embolism. Requires immediate ambulance response.',
      isEmergency: true,
    },
    {
      title: 'Sudden Numbness, Speech Slur, Facial Droop',
      severity: 'CRITICAL STROKE CODE',
      color: 'border-rose-300 bg-rose-50/70 text-rose-900',
      badge: 'bg-rose-600 text-white',
      desc: 'Signs of acute stroke. Every second counts. Direct ambulance dispatch to Comprehensive Stroke Center.',
      isEmergency: true,
    },
    {
      title: 'High Persistent Fever or Severe Infection',
      severity: 'URGENT CARE',
      color: 'border-amber-200 bg-amber-50/60 text-amber-950',
      badge: 'bg-amber-500 text-white',
      desc: 'Symptoms suggest acute infection requiring prompt clinical evaluation or same-day urgent care.',
      isEmergency: false,
    },
    {
      title: 'Routine Health Checkup & Specialist Care',
      severity: 'OUTPATIENT ELECTIVE',
      color: 'border-emerald-200 bg-emerald-50/60 text-emerald-950',
      badge: 'bg-emerald-600 text-white',
      desc: 'Routine screening, wellness consultations, preventive cardiology, or orthopedic follow-ups.',
      isEmergency: false,
    },
  ];

  return (
    <>
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

      <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
            Clinical Health Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Interactive Patient Health Tools
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Assess clinical biometrics, navigate immediate emergency triage, and connect with senior specialists with one tap.
          </p>
        </div>

        {/* Emergency Quick Action Banner */}
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Are you currently experiencing acute medical danger?</h3>
              <p className="text-xs text-slate-600">Never wait for an online form in an emergency. Tap to dial 8072212411 immediately.</p>
            </div>
          </div>
          <button
            onClick={() => setSosModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Launch Emergency SOS</span>
          </button>
        </div>

        {/* Tool 1: Interactive BMI & Cardiovascular Risk Calculator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Clinical Body Mass & Metabolic Index Calculator</h2>
              <p className="text-xs text-slate-500">Calculated according to WHO & American College of Cardiology standards</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                  <span>Height (cm)</span>
                  <span className="text-emerald-700 font-extrabold text-sm">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                  <span>Weight (kg)</span>
                  <span className="text-emerald-700 font-extrabold text-sm">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Result Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Your BMI</span>
                  <span className="text-3xl font-extrabold text-slate-900">{bmi}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wide block">Classification</span>
                  <span className={`text-base font-bold ${bmiColor}`}>{bmiCategory}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3">
                💡 <strong>Physician Note:</strong> {bmiAdvice}
              </p>

              <button
                onClick={() => setActivePage('appointments')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Discuss With A Preventive Cardiologist
              </button>
            </div>
          </div>
        </div>

        {/* Tool 2: Rapid Clinical Triage Guide (1-Click Action Cards — Zero Typing Required) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Rapid Medical Triage Decision Guide</h2>
              <p className="text-xs text-slate-500">Instant triage recommendations without needing to type in an emergency</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {triageOptions.map((opt, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border ${opt.color} flex flex-col justify-between space-y-3`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${opt.badge}`}>
                      {opt.severity}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{opt.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{opt.desc}</p>
                </div>

                <div className="pt-2">
                  {opt.isEmergency ? (
                    <button
                      onClick={() => setSosModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>1-Click Emergency SOS (8072212411)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePage('appointments')}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Book Outpatient Visit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
