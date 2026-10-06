import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useVerticalStore } from '../store/useVerticalStore';
import { VERTICAL_KEYS, THEMES } from '../themes';
import { carData } from '../data/carData';
import { hospitalData } from '../data/hospitalData';
import { dentalData } from '../data/dentalData';
import { realEstateData } from '../data/realEstateData';
import { Send, MapPin, Phone, Clock, Mail, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export function ContactSection() {
  const activeVertical = useVerticalStore((state) => state.activeVertical);
  const theme = THEMES[activeVertical] || THEMES.car;

  const contentMap = {
    [VERTICAL_KEYS.CAR]: carData.contact,
    [VERTICAL_KEYS.HOSPITAL]: hospitalData.contact,
    [VERTICAL_KEYS.DENTAL]: dentalData.contact,
    [VERTICAL_KEYS.REALESTATE]: realEstateData.contact,
  };

  const contactData = contentMap[activeVertical];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire Confetti with theme colors
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: [theme.colors.primary, theme.colors.secondary, '#FFFFFF'],
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', details: '' });
    }, 5000);
  };

  return (
    <section id="contact-section" className="py-20 sm:py-28 relative overflow-hidden bg-theme-surface/50 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVertical}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-theme-primary mb-2">
                Direct Engagement
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-heading uppercase tracking-tight text-theme-text">
                {contactData.heading}
              </h2>
              <div className="w-16 h-1 bg-theme-primary mx-auto my-4 rounded-full" />
              <p className="text-sm sm:text-base text-theme-text-muted font-body">
                {contactData.subheading}
              </p>
            </div>

            {/* 2-Column Grid: Form + Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Form Column (7 Cols) */}
              <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-theme-border/40 shadow-2xl relative">
                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-theme-primary/20 text-theme-primary flex items-center justify-center mx-auto border-2 border-theme-primary animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-theme-text">
                      Inquiry Successfully Received
                    </h3>
                    <p className="text-sm text-theme-text-muted max-w-md mx-auto font-body">
                      Thank you. Your dossier has been routed to our chief specialist. We will connect with you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-semibold uppercase text-theme-text-muted mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alexander Wright"
                          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-theme-border/50 text-theme-text placeholder:text-theme-text-muted/50 focus:border-theme-primary focus:outline-none transition-all text-sm font-body"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold uppercase text-theme-text-muted mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alexander@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-theme-border/50 text-theme-text placeholder:text-theme-text-muted/50 focus:border-theme-primary focus:outline-none transition-all text-sm font-body"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-semibold uppercase text-theme-text-muted mb-2">
                          Direct Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2831"
                          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-theme-border/50 text-theme-text placeholder:text-theme-text-muted/50 focus:border-theme-primary focus:outline-none transition-all text-sm font-body"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold uppercase text-theme-text-muted mb-2">
                          Service Category *
                        </label>
                        <select
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border/50 text-theme-text focus:border-theme-primary focus:outline-none transition-all text-sm font-body cursor-pointer"
                        >
                          <option value="">Select Service / Department</option>
                          {contactData.fields.serviceOptions.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Dynamic Field: Budget or Insurance */}
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-theme-text-muted mb-2">
                        {activeVertical === VERTICAL_KEYS.HOSPITAL
                          ? 'Primary Health Insurance / Coverage Tier *'
                          : 'Target Project Budget / Allocation *'}
                      </label>
                      <select
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border/50 text-theme-text focus:border-theme-primary focus:outline-none transition-all text-sm font-body cursor-pointer"
                      >
                        <option value="">Please Select</option>
                        {contactData.fields.budgetOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Specific Detail Field */}
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-theme-text-muted mb-2">
                        {contactData.fields.vehiclePlaceholder}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Please share any relevant specifications, vehicle year, clinical symptoms, or property preferences..."
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-theme-border/50 text-theme-text placeholder:text-theme-text-muted/50 focus:border-theme-primary focus:outline-none transition-all text-sm font-body resize-none"
                      />
                    </div>

                    {/* DENTAL COMFORT MENU CHECKBOXES */}
                    {activeVertical === VERTICAL_KEYS.DENTAL && contactData.comfortMenu && (
                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-heading font-bold text-theme-primary uppercase">
                          <Heart className="w-4 h-4" />
                          <span>Complementary Spa Comfort Menu (Select any):</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-theme-text">
                          {contactData.comfortMenu.map((item, i) => (
                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="accent-theme-primary rounded w-3.5 h-3.5" />
                              <span className="text-[11px] text-theme-text-muted">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`w-full py-4 rounded-xl font-heading font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${theme.buttonClass}`}
                    >
                      <span>Submit Confidential Inquiry</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* Info Column (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-panel p-8 rounded-3xl border border-theme-border/40 shadow-xl space-y-6">
                  <h3 className="text-xl font-bold font-heading text-theme-text uppercase">
                    Headquarters & Concierge
                  </h3>

                  <div className="space-y-5 text-xs sm:text-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-theme-text-muted uppercase">Physical Campus</div>
                        <div className="font-medium text-theme-text mt-0.5">{contactData.workshopInfo.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-theme-text-muted uppercase">Direct Line</div>
                        <div className="font-bold text-theme-primary mt-0.5">{contactData.workshopInfo.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-theme-text-muted uppercase">Hours of Operation</div>
                        <div className="font-medium text-theme-text mt-0.5">{contactData.workshopInfo.hours}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-theme-text-muted uppercase">Encrypted Dispatch</div>
                        <div className="font-medium text-theme-text mt-0.5">{contactData.workshopInfo.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Assurance Card */}
                <div className="p-6 rounded-2xl glass-panel border border-theme-border/30 text-xs text-theme-text-muted space-y-2">
                  <div className="flex items-center gap-2 font-heading font-bold text-theme-text uppercase">
                    <Sparkles className="w-4 h-4 text-theme-primary" />
                    <span>Non-Disclosure & Confidentiality Protocol</span>
                  </div>
                  <p className="leading-relaxed">
                    All telemetry, patient health records (HIPAA/GDPR compliant), and private property portfolio inquiries are protected by encrypted multi-factor access controls.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
