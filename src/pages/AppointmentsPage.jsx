import React, { useState } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, FileText, Printer, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const DOCTOR_OPTIONS = [
  { id: 'doc-1', name: 'Dr. Maya Thorne, MD, FACC', spec: 'Cardiology & Heart Center', fee: '$180' },
  { id: 'doc-2', name: 'Dr. Aris Thorne, MD, PhD', spec: 'Neurology & Brain Sciences', fee: '$220' },
  { id: 'doc-3', name: 'Dr. Priya Sharma, MD, FAAP', spec: 'Pediatrics & Child Wellness', fee: '$150' },
  { id: 'doc-4', name: 'Dr. David Chen, MD, FAAOS', spec: 'Orthopedics & Joint Surgery', fee: '$190' },
  { id: 'doc-5', name: 'Dr. Sarah Jenkins, MD, PhD', spec: 'Comprehensive Oncology', fee: '$240' },
  { id: 'doc-6', name: 'Dr. Robert Torres, MD, FACS', spec: 'da Vinci Robotic Surgery', fee: '$210' },
];

export function AppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTOR_OPTIONS[0].id);
  const [appointmentDate, setAppointmentDate] = useState('2026-10-08');
  const [selectedSlot, setSelectedSlot] = useState('11:15 AM');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [reason, setReason] = useState('');
  const [insurance, setInsurance] = useState('Blue Cross / Blue Shield');
  const [confirmedPass, setConfirmedPass] = useState(null);

  const updateHospital = useVerticalStore((state) => state.updateHospitalCustomizer);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const docObj = DOCTOR_OPTIONS.find((d) => d.id === selectedDoctor) || DOCTOR_OPTIONS[0];
    const passCode = 'AC-' + Math.floor(100000 + Math.random() * 900000);

    const passData = {
      code: passCode,
      patient: patientName,
      doctor: docObj.name,
      specialty: docObj.spec,
      fee: docObj.fee,
      date: appointmentDate,
      time: selectedSlot,
      insurance: insurance,
      location: 'AuraCare Pavilion, 450 Medical Sciences Way, Wing B',
    };

    setConfirmedPass(passData);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {}

    // Update doctor mascot greeting
    updateHospital({
      isWaving: true,
      speechMessage: `🎉 Appointment confirmed for ${patientName}! Your pass code is ${passCode}. We look forward to meeting you.`,
    });
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
          Direct Patient Access
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Schedule a Clinical Consultation
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Book an in-person or virtual telehealth appointment with our department chairs in less than 2 minutes.
        </p>
      </div>

      {!confirmedPass ? (
        /* Booking Wizard Card */
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            
            {/* Step 1: Doctor Selection */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                1. Select Attending Specialist
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
              >
                {DOCTOR_OPTIONS.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.spec} ({doc.fee})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                  2. Choose Preferred Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                  3. Select Time Slot
                </label>
                <div className="flex flex-wrap gap-2">
                  {['09:00 AM', '11:15 AM', '02:30 PM', '04:00 PM'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        selectedSlot === slot
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Patient Information */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                4. Patient Personal Information
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient Full Name"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Phone Number (e.g. +1 555-0199)"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  />
                </div>
                <div>
                  <select
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  >
                    <option value="Medicare / Medicaid">Medicare / Medicaid</option>
                    <option value="Blue Cross / Blue Shield">Blue Cross / Blue Shield</option>
                    <option value="UnitedHealthcare">UnitedHealthcare</option>
                    <option value="Aetna / Cigna">Aetna / Cigna</option>
                    <option value="Private Self-Pay / International">Private Self-Pay / International</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Primary symptom or reason for visit (optional)..."
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20"
            >
              Confirm Appointment & Generate Medical Pass
            </button>
          </form>
        </div>
      ) : (
        /* Confirmed Digital Pass */
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Appointment Confirmed!</h2>
            <p className="text-xs text-slate-500 mt-1">
              Your consultation has been scheduled with AuraCare Health Systems.
            </p>
          </div>

          {/* Printable Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-emerald-200 text-left space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="font-bold text-emerald-800 text-xs tracking-wider">AURACARE MEDICAL PASS</span>
              <span className="font-mono font-bold text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                {confirmedPass.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Patient:</span>
                <span className="font-bold text-slate-800">{confirmedPass.patient}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Physician:</span>
                <span className="font-bold text-slate-800">{confirmedPass.doctor}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Date & Time:</span>
                <span className="font-semibold text-slate-800">{confirmedPass.date} at {confirmedPass.time}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Insurance:</span>
                <span className="font-semibold text-slate-800">{confirmedPass.insurance}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Hospital Wing:</span>
                <span className="text-slate-700">{confirmedPass.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Medical Pass</span>
            </button>
            <button
              onClick={() => setConfirmedPass(null)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              Book Another Visit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
