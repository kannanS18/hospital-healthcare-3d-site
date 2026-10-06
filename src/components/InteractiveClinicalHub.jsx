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
  AlertTriangle,
  ArrowRight,
  Search,
  Building,
  Award,
} from 'lucide-react';
import { useVerticalStore } from '../store/useVerticalStore';

export function InteractiveClinicalHub({ onOpenBooking }) {
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const [activeTab, setActiveTab] = useState('booker'); // 'booker' | 'doctors' | 'telemetry' | 'triage'

  // Booker State
  const [selectedDept, setSelectedDept] = useState('Cardiology');
  const [selectedSlot, setSelectedSlot] = useState('Today 2:30 PM');
  const [visitType, setVisitType] = useState('In-Person Visit');

  // Doctor Filter State
  const [doctorDeptFilter, setDoctorDeptFilter] = useState('All');

  // Clinical Guidance State
  const [selectedCondition, setSelectedCondition] = useState('cardio');

  const specialists = [
    {
      id: 'doc-1',
      name: 'Dr. James Vance, MD',
      role: 'Chief of Interventional Cardiology',
      dept: 'Cardiology',
      credentials: 'Harvard Medical • 18+ Years Exp.',
      nextSlot: 'Today, 2:30 PM',
      rating: '4.98 (340+ reviews)',
    },
    {
      id: 'doc-2',
      name: 'Dr. Sarah Lin, MD, PhD',
      role: 'Director of Stroke & Neurovascular',
      dept: 'Neurology',
      credentials: 'Johns Hopkins • 16+ Years Exp.',
      nextSlot: 'Today, 4:00 PM',
      rating: '4.96 (280+ reviews)',
    },
    {
      id: 'doc-3',
      name: 'Dr. Marcus Reynolds, MD',
      role: 'Robotic Joint & Spine Reconstruction',
      dept: 'Orthopedics',
      credentials: 'Mayo Clinic Fellow • 14+ Years Exp.',
      nextSlot: 'Tomorrow, 10:15 AM',
      rating: '4.99 (410+ reviews)',
    },
    {
      id: 'doc-4',
      name: 'Dr. Maya Thorne, MD',
      role: 'Senior Attending Physician & Internal Medicine',
      dept: 'Internal Medicine',
      credentials: 'Columbia University • 20+ Years Exp.',
      nextSlot: 'Today, 3:15 PM',
      rating: '4.97 (390+ reviews)',
    },
  ];

  const guidanceTopics = {
    cardio: {
      title: 'Cardiovascular Care Pathway',
      doctor: 'Dr. James Vance, MD (Cardiology)',
      urgentSigns: 'Severe chest pressure, radiating arm or jaw pain, acute shortness of breath.',
      routineSigns: 'Mild palpitations, routine blood pressure monitoring, cholesterol follow-up.',
      urgentAction: 'Immediate Level-1 Emergency evaluation required. Call 8072212411 immediately.',
      routineAction: 'Schedule outpatient cardiology consultation within 24–48 hours.',
    },
    neuro: {
      title: 'Neurological & Stroke Pathway',
      doctor: 'Dr. Sarah Lin, MD, PhD (Neurology)',
      urgentSigns: 'Sudden facial droop, arm weakness, slurred speech, acute thunderclap headache.',
      routineSigns: 'Chronic tension headaches, mild dizzy spells, sleep disturbance.',
      urgentAction: 'Stroke Code Priority: Door-to-needle intervention. Call 8072212411.',
      routineAction: 'Book outpatient comprehensive neurological examination.',
    },
    ortho: {
      title: 'Orthopedic & Spine Pathway',
      doctor: 'Dr. Marcus Reynolds, MD (Orthopedics)',
      urgentSigns: 'Compound fracture, inability to bear weight after acute trauma, severe joint lock.',
      routineSigns: 'Chronic knee stiffness, recurring back discomfort, athletic recovery.',
      urgentAction: 'Urgent orthopedic trauma intake. Immediate radiology triage.',
      routineAction: 'Schedule robotic joint assessment or physical therapy evaluation.',
    },
    general: {
      title: 'Internal Medicine & Executive Wellness',
      doctor: 'Dr. Maya Thorne, MD (Internal Medicine)',
      urgentSigns: 'High fever > 103°F with confusion, severe respiratory distress, acute dehydration.',
      routineSigns: 'Annual executive physical, preventative health screening, blood work analysis.',
      urgentAction: 'Same-day emergency or acute urgent care intake advised.',
      routineAction: 'Book preventative wellness evaluation with senior attending physician.',
    },
  };

  const filteredSpecialists = doctorDeptFilter === 'All'
    ? specialists
    : specialists.filter((s) => s.dept === doctorDeptFilter);

  return (
    <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Top Clinical Navigation Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/90 p-2 gap-1.5 overflow-x-auto scrollbar-none">
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
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'doctors'
              ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Specialists</span>
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
          onClick={() => setActiveTab('triage')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'triage'
              ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
          <span>Clinical Triage</span>
        </button>
      </div>

      {/* Main Tab Body */}
      <div className="p-5 sm:p-6 min-h-[420px] flex flex-col justify-between">
        
        {/* =========================================================================
            TAB 1: INSTANT CONSULTATION BOOKING
            ========================================================================= */}
        {activeTab === 'booker' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-950">
                  Request Specialist Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select department, consultation mode, and your preferred appointment time.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Guaranteed Slot
              </span>
            </div>

            {/* Department Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                Select Department:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Robotics'].map((dept) => (
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

            {/* Visit Type & Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Consultation Mode:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['In-Person Visit', 'Tele-Consultation'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setVisitType(type)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center cursor-pointer ${
                        visitType === type
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Next Available Window:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Today 2:30 PM', 'Tomorrow 10:00 AM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center cursor-pointer ${
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
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <span>Confirm {selectedDept} Booking ({selectedSlot})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-slate-500 mt-2">
                ✓ No payment required today • Immediate SMS confirmation • Priority intake
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: VERIFIED SPECIALISTS DIRECTORY
            ========================================================================= */}
        {activeTab === 'doctors' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-950">
                  Board-Certified Attending Faculty
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Meet our department chairs and schedule direct consultations.
                </p>
              </div>
              <button
                onClick={() => setActivePage('doctors')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
              >
                <span>All 180+ Doctors</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Department Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Internal Medicine'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDoctorDeptFilter(dept)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    doctorDeptFilter === dept
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Doctor Cards List */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredSpecialists.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      MD
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">{doc.role}</div>
                      <div className="text-[10px] text-slate-400">{doc.credentials} • {doc.nextSlot}</div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: LIVE EMERGENCY COMMAND TELEMETRY
            ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                  <span>Level-1 Trauma Command Telemetry</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time operational readiness, ER wait times, and emergency capacity.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Status
              </span>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    ER Wait Time
                  </span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-700 mt-1">
                  &lt; 3 <span className="text-base font-bold">mins</span>
                </div>
                <div className="text-[10px] text-emerald-600 mt-0.5">Immediate triage nurse intake</div>
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
                <div className="text-[10px] text-slate-500 mt-0.5">Trauma, Cardiac & Neuro</div>
              </div>
            </div>

            {/* Direct Emergency SOS Trigger Box */}
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Immediate Life-Threatening Emergency?</span>
                </div>
                <div className="text-[11px] text-red-700 mt-0.5">
                  Direct line to AuraCare Level-1 Trauma Desk & Rapid Ambulance Dispatch.
                </div>
              </div>

              <a
                href="tel:8072212411"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call SOS: 8072212411</span>
              </a>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: PHYSICIAN-VERIFIED CLINICAL GUIDELINES (JCI ESI)
            ========================================================================= */}
        {activeTab === 'triage' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                  <span>Standardized Clinical Triage Protocols</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    JCI ESI Protocol
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Board-certified physician guidance on emergency vs. outpatient specialist care.
                </p>
              </div>
            </div>

            {/* Area Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'cardio', label: '🫀 Cardiology' },
                { id: 'neuro', label: '🧠 Neurology' },
                { id: 'ortho', label: '🦴 Orthopedics' },
                { id: 'general', label: '🩺 Internal Med' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCondition(item.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    selectedCondition === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Protocol Display Card */}
            {(() => {
              const current = guidanceTopics[selectedCondition] || guidanceTopics.cardio;
              return (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-red-50/80 border border-red-200">
                    <div className="text-[11px] font-bold text-red-900 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Level 1 Acute Red Flags (Immediate ER):</span>
                    </div>
                    <p className="text-xs text-red-800 mt-1 leading-relaxed">
                      {current.urgentSigns}
                    </p>
                    <div className="mt-2 pt-2 border-t border-red-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-red-700 font-semibold">{current.urgentAction}</span>
                      <a
                        href="tel:8072212411"
                        className="px-3 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition-colors"
                      >
                        Call Hotline
                      </a>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Elective & Outpatient Consultation:</span>
                    </div>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      {current.routineSigns}
                    </p>
                    <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700 font-semibold">{current.routineAction}</span>
                      <button
                        onClick={onOpenBooking}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        Book Visit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Bottom Hospital Trust Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>AuraCare JCI Clinical Center</span>
          </div>
          <div className="flex items-center gap-2">
            <span>24/7 Emergency SOS:</span>
            <a href="tel:8072212411" className="font-extrabold text-red-600 hover:underline">
              8072212411
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
