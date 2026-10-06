import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Brain,
  ShieldAlert,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  UserCheck,
  Stethoscope,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useVerticalStore } from '../store/useVerticalStore';

export function InteractiveClinicalHub({ onOpenBooking }) {
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const [activeTab, setActiveTab] = useState('symptoms'); // 'symptoms' | 'telemetry' | 'booker' | 'vitals'

  // 1. Symptom Navigator State
  const [selectedRegion, setSelectedRegion] = useState('cardio');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Chest Tightness']);

  // 2. Vitals Calculator State
  const [bpValue, setBpValue] = useState(122);
  const [pulseValue, setPulseValue] = useState(72);

  // 3. Booker State
  const [selectedDept, setSelectedDept] = useState('Cardiology');
  const [selectedSlot, setSelectedSlot] = useState('Today 2:30 PM');

  // Symptom Database
  const regions = [
    { id: 'cardio', label: '🫀 Chest / Heart', dept: 'Cardiology', doctor: 'Dr. James Vance, MD', doctorRole: 'Chief of Interventional Cardiology' },
    { id: 'neuro', label: '🧠 Head / Neuro', dept: 'Neurology', doctor: 'Dr. Sarah Lin, MD', doctorRole: 'Director of Stroke & Neurovascular' },
    { id: 'ortho', label: '🦴 Spine / Joints', dept: 'Orthopedics', doctor: 'Dr. Marcus Reynolds, MD', doctorRole: 'Robotic Joint & Spine Surgeon' },
    { id: 'general', label: '🩺 General / Fever', dept: 'Internal Medicine', doctor: 'Dr. Maya Thorne, MD', doctorRole: 'Senior Attending Physician' },
  ];

  const symptomOptions = {
    cardio: [
      { name: 'Chest Tightness', severity: 'critical' },
      { name: 'Palpitations', severity: 'urgent' },
      { name: 'Shortness of Breath', severity: 'critical' },
      { name: 'High Blood Pressure', severity: 'urgent' },
      { name: 'Mild Fatigue', severity: 'routine' },
    ],
    neuro: [
      { name: 'Sudden Severe Headache', severity: 'critical' },
      { name: 'Dizziness / Vertigo', severity: 'urgent' },
      { name: 'Blurred Vision', severity: 'critical' },
      { name: 'Memory Fog', severity: 'routine' },
      { name: 'Tension Headache', severity: 'routine' },
    ],
    ortho: [
      { name: 'Lower Back Sharp Pain', severity: 'urgent' },
      { name: 'Knee Swelling', severity: 'routine' },
      { name: 'Shoulder Reduced Mobility', severity: 'routine' },
      { name: 'Numbness in Limbs', severity: 'urgent' },
      { name: 'Post-Fall Joint Injury', severity: 'critical' },
    ],
    general: [
      { name: 'High Fever (> 102°F)', severity: 'urgent' },
      { name: 'Severe Dehydration', severity: 'critical' },
      { name: 'Persistent Cough', severity: 'routine' },
      { name: 'Unexplained Weight Loss', severity: 'routine' },
      { name: 'Annual Health Check', severity: 'routine' },
    ],
  };

  const currentRegionData = regions.find((r) => r.id === selectedRegion) || regions[0];
  const currentSymptomsList = symptomOptions[selectedRegion] || [];

  const toggleSymptom = (symName) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symName) ? prev.filter((s) => s !== symName) : [...prev, symName]
    );
  };

  // Calculate Triage Level
  const hasCritical = selectedSymptoms.some((s) => {
    const item = currentSymptomsList.find((opt) => opt.name === s);
    return item?.severity === 'critical';
  });
  const hasUrgent = selectedSymptoms.some((s) => {
    const item = currentSymptomsList.find((opt) => opt.name === s);
    return item?.severity === 'urgent';
  });

  const triageLevel = hasCritical
    ? { title: 'LEVEL 1: CRITICAL EVALUATION RECOMMENDED', color: 'bg-red-50 text-red-800 border-red-300', dot: 'bg-red-600', advice: 'Potential acute cardiac or vascular symptom. Immediate emergency evaluation advised.' }
    : hasUrgent
    ? { title: 'LEVEL 2: SAME-DAY URGENT CARE', color: 'bg-amber-50 text-amber-800 border-amber-300', dot: 'bg-amber-500', advice: 'Specialist consultation advised within 4–12 hours for prompt symptom resolution.' }
    : { title: 'LEVEL 3: ROUTINE SPECIALIST CONSULTATION', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500', advice: 'Symptoms indicate stable condition suitable for scheduled outpatient consultation.' };

  // Calculate Vitals Score
  const calculateVitalsScore = () => {
    let score = 100;
    if (bpValue > 140 || bpValue < 90) score -= 25;
    else if (bpValue > 130) score -= 12;

    if (pulseValue > 100 || pulseValue < 50) score -= 20;
    else if (pulseValue > 85) score -= 8;

    return Math.max(30, Math.min(99, score));
  };
  const vitalsScore = calculateVitalsScore();

  return (
    <div className="relative rounded-3xl bg-white border border-emerald-100 shadow-2xl overflow-hidden">
      {/* Top Interactive Mode Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/80 p-2 gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('symptoms')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'symptoms'
              ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
          <span>Symptom Triage</span>
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'telemetry'
              ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-red-500" />
          <span>Live ER Status</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        <button
          onClick={() => setActiveTab('booker')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'booker'
              ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          <span>Quick Book</span>
        </button>

        <button
          onClick={() => setActiveTab('vitals')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'vitals'
              ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Vitals Gauge</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      <div className="p-5 sm:p-6 min-h-[440px] flex flex-col justify-between">
        
        {/* =========================================================================
            TAB 1: INTERACTIVE SMART SYMPTOM TRIAGE
            ========================================================================= */}
        {activeTab === 'symptoms' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                  <span>Interactive Clinical Symptom Triage</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    AI-Assisted
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select body system and tap symptoms for an instant clinical triage assessment.
                </p>
              </div>
            </div>

            {/* Body System Selector Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    setSelectedRegion(reg.id);
                    setSelectedSymptoms([]);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    selectedRegion === reg.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{reg.label}</span>
                </button>
              ))}
            </div>

            {/* Clickable Symptom Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                Tap Applicable Symptoms:
              </label>
              <div className="flex flex-wrap gap-2">
                {currentSymptomsList.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym.name);
                  return (
                    <button
                      key={sym.name}
                      onClick={() => toggleSymptom(sym.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span>{sym.name}</span>
                      {isChecked ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-Time Clinical Triage Assessment Card */}
            <div className={`p-3.5 rounded-2xl border ${triageLevel.color} transition-all`}>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${triageLevel.dot} animate-pulse`} />
                <span className="text-xs font-extrabold tracking-wide uppercase">
                  {triageLevel.title}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {triageLevel.advice}
              </p>
            </div>

            {/* Recommended Specialist Card & 1-Click Action */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  MD
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{currentRegionData.doctor}</div>
                  <div className="text-[11px] text-emerald-700 font-medium">{currentRegionData.doctorRole}</div>
                  <div className="text-[10px] text-slate-400">Next Slot: Today at 2:30 PM • Room 402</div>
                </div>
              </div>

              {hasCritical ? (
                <a
                  href="tel:8072212411"
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-600/20 whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call ER Hotline</span>
                </a>
              ) : (
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap cursor-pointer"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: LIVE EMERGENCY & HOSPITAL TELEMETRY
            ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                  <span>Live Emergency Command Center</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Updated Live
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time operational capacity and emergency department telemetry.
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    ER Wait Time
                  </span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-700 mt-1">
                  &lt; 3 <span className="text-base font-bold">mins</span>
                </div>
                <div className="text-[10px] text-emerald-600 mt-0.5">Level-1 Trauma Rapid Triage</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    ICU Beds Ready
                  </span>
                  <ShieldAlert className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  14 <span className="text-base font-bold">Beds</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Critical Care & Telemetry</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Cath Lab / OR
                  </span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  Ready
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">0 Min Door-To-Balloon Delay</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    On-Site Surgeons
                  </span>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  18 <span className="text-base font-bold">Active</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Trauma, Cardiac, Neuro</div>
              </div>
            </div>

            {/* Direct Emergency SOS Trigger Box */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Immediate Medical Emergency?</span>
                </div>
                <div className="text-[11px] text-red-700 mt-0.5">
                  Direct hotwire to AuraCare Trauma Command with automatic GPS dispatch.
                </div>
              </div>

              <a
                href="tel:8072212411"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call SOS: 8072212411</span>
              </a>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: INSTANT 10-SECOND SPECIALIST APPOINTMENT BOOKER
            ========================================================= */}
        {activeTab === 'booker' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-base font-extrabold text-slate-950">
                Instant 10-Second Specialist Booking
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select clinical department and pick your preferred consultation window.
              </p>
            </div>

            {/* Department Chips */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                Select Clinical Department:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Dermatology'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      selectedDept === dept
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                Available Priority Slots Today:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Today 2:30 PM', 'Today 4:15 PM', 'Tomorrow 10:00 AM'].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                      selectedSlot === slot
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Action Button */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <span>Confirm {selectedDept} Booking ({selectedSlot})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] text-slate-400 mt-2">
                ✓ Zero advance payment required • Instant SMS confirmation to your phone
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: INTERACTIVE VITALS & CARDIOVASCULAR HEALTH CALCULATOR
            ========================================================================= */}
        {activeTab === 'vitals' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-base font-extrabold text-slate-950 flex items-center justify-between">
                <span>Interactive Vital Signs Assessment</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Score: {vitalsScore}/100
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust blood pressure and pulse sliders to simulate real-time cardiovascular telemetry.
              </p>
            </div>

            {/* Blood Pressure Slider */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Systolic Blood Pressure</span>
                <span className="font-extrabold text-emerald-700 text-sm">{bpValue} mmHg</span>
              </div>
              <input
                type="range"
                min="90"
                max="170"
                value={bpValue}
                onChange={(e) => setBpValue(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Optimal (110-120)</span>
                <span>Elevated (130-139)</span>
                <span>Stage 2 (&gt;140)</span>
              </div>
            </div>

            {/* Resting Pulse Slider */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Resting Heart Rate</span>
                <span className="font-extrabold text-emerald-700 text-sm">{pulseValue} BPM</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                value={pulseValue}
                onChange={(e) => setPulseValue(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Athletic (50-60)</span>
                <span>Normal (60-80)</span>
                <span>Tachycardia (&gt;100)</span>
              </div>
            </div>

            {/* Diagnostic Outcome */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-emerald-900">
                  {vitalsScore >= 85 ? 'Optimal Cardiovascular Stability' : 'Mild Preventative Follow-Up Suggested'}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  {vitalsScore >= 85
                    ? 'All hemodynamics fall within benchmark JCI clinical safety parameters.'
                    : 'Schedule an outpatient ECG screening to review blood pressure management.'}
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer"
              >
                Get Checkup
              </button>
            </div>
          </div>
        )}

        {/* Bottom Hospital Trust Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>AuraCare JCI Clinical Grade</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Emergency SOS:</span>
            <a href="tel:8072212411" className="font-bold text-emerald-700 hover:underline">
              8072212411
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
