import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { hospitalData } from '../data/hospitalData';
import { Send, MapPin, Phone, Clock, Mail, CheckCircle2 } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', symptoms: '', insurance: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#0D9488', '#0284C7', '#FFFFFF'] });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', symptoms: '', insurance: '', details: '' });
    }, 5000);
  };

  const { workshopInfo } = hospitalData.contact;

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#0D9488] mb-2">Patient Admissions & Triage</div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading uppercase text-[#0F172A]">SCHEDULE A CLINICAL CONSULTATION</h2>
          <div className="w-16 h-1 bg-[#0D9488] mx-auto my-4 rounded-full" />
          <p className="text-gray-600 text-sm">Our patient coordinators will triage your inquiry to match you with the appropriate specialty team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-md">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0D9488]/20 text-[#0D9488] flex items-center justify-center mx-auto border-2 border-[#0D9488] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#0F172A]">Consultation Request Logged</h3>
                <p className="text-sm text-gray-600 font-body">Our clinical admissions team will contact you within 2 hours to confirm your appointment time.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-gray-600 mb-2">Patient Full Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Eleanor Vance" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:border-[#0D9488] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-gray-600 mb-2">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="vance@healthmail.com" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:border-[#0D9488] focus:outline-none text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-gray-600 mb-2">Direct Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 392-1089" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:border-[#0D9488] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-gray-600 mb-2">Department / Specialty *</label>
                    <select required value={formData.symptoms} onChange={e => setFormData({ ...formData, symptoms: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:border-[#0D9488] focus:outline-none text-sm">
                      <option value="">Select Specialty</option>
                      <option value="Cardiology">Cardiovascular & Thoracic Surgery</option>
                      <option value="Neurology">Neurosciences & Brain Institute</option>
                      <option value="Oncology">Precision Oncology & Immunotherapy</option>
                      <option value="Robotics">da Vinci Robotic Surgery</option>
                      <option value="Executive">Executive Full Body Diagnostic</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-gray-600 mb-2">Insurance Carrier / Coverage Tier *</label>
                  <select required value={formData.insurance} onChange={e => setFormData({ ...formData, insurance: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:border-[#0D9488] focus:outline-none text-sm">
                    <option value="">Select Insurance</option>
                    <option value="Medicare">Medicare / Medicaid</option>
                    <option value="BlueCross">Blue Cross / Blue Shield</option>
                    <option value="United">UnitedHealthcare</option>
                    <option value="Cigna">Cigna / Aetna</option>
                    <option value="SelfPay">Private Concierge / International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-gray-600 mb-2">Clinical Symptoms or Prior Scans</label>
                  <textarea rows={3} value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} placeholder="Describe any relevant medical history, prior hospitalizations, or physician referrals..." className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F172A] focus:border-[#0D9488] focus:outline-none text-sm resize-none" />
                </div>

                <button type="submit" className="w-full py-4 rounded-xl font-heading font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white shadow-md hover:shadow-lg transition-all">
                  <span>Submit Confidential Intake</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold font-heading text-[#0F172A] uppercase">Clinical Campus</h3>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488] shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-500 uppercase">Hospital Address</div>
                    <div className="font-medium text-[#0F172A] mt-0.5">{workshopInfo.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488] shrink-0"><Phone className="w-5 h-5" /></div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-500 uppercase">Emergency Desk</div>
                    <div className="font-bold text-[#0D9488] mt-0.5">{workshopInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488] shrink-0"><Clock className="w-5 h-5" /></div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-500 uppercase">Admissions & ER</div>
                    <div className="font-medium text-[#0F172A] mt-0.5">{workshopInfo.hours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488] shrink-0"><Mail className="w-5 h-5" /></div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-500 uppercase">HIPAA Encrypted Intake</div>
                    <div className="font-medium text-[#0F172A] mt-0.5">{workshopInfo.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}