import React, { useState } from 'react';
import {
  PhoneCall,
  MapPin,
  AlertTriangle,
  X,
  Navigation,
  Share2,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Loader2,
} from 'lucide-react';

export function EmergencySOSModal({ isOpen, onClose }) {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [triageStep, setTriageStep] = useState('question'); // 'question' | 'danger' | 'urgent'

  if (!isOpen) return null;

  const EMERGENCY_NUMBER = '8072212411';
  const TEL_URL = `tel:${EMERGENCY_NUMBER}`;

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setGpsLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocationData({
          lat: latitude.toFixed(6),
          lng: longitude.toFixed(6),
          accuracy: Math.round(accuracy),
          mapsLink,
        });
        setGpsLoading(false);
      },
      (err) => {
        setGpsLoading(false);
        setLocationError(
          'Location access denied or unavailable. Please call 8072212411 directly and state your address.'
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const handleSendLocationSMS = () => {
    if (!locationData) return;
    const bodyText = encodeURIComponent(
      `🚨 MEDICAL EMERGENCY SOS! Immediate medical assistance needed at my coordinates: ${locationData.mapsLink} (Lat: ${locationData.lat}, Lng: ${locationData.lng}, Acc: ±${locationData.accuracy}m)`
    );
    window.location.href = `sms:${EMERGENCY_NUMBER}?body=${bodyText}`;
  };

  const handleSendLocationWhatsApp = () => {
    if (!locationData) return;
    const message = encodeURIComponent(
      `🚨 MEDICAL EMERGENCY SOS!\nImmediate medical assistance needed.\nCoordinates: Lat ${locationData.lat}, Lng ${locationData.lng}\nGoogle Maps: ${locationData.mapsLink}`
    );
    window.open(`https://wa.me/918072212411?text=${message}`, '_blank');
  };

  const resetAndClose = () => {
    setTriageStep('question');
    setLocationData(null);
    setLocationError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden text-slate-900">
        
        {/* Urgent Header */}
        <div className="bg-rose-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-wide flex items-center gap-2">
                <span>24/7 EMERGENCY TRIAGE & AMBULANCE</span>
              </h2>
              <p className="text-[11px] text-rose-100 font-medium">Direct Line: +91 8072212411</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">

          {/* STEP 1: Direct Risk Question */}
          {triageStep === 'question' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-100">
                <AlertTriangle className="w-9 h-9 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider border border-rose-200">
                  Critical Assessment
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                  Are you or someone nearby in immediate medical danger / at risk?
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Symptoms include chest tightness, unconsciousness, severe bleeding, difficulty breathing, stroke symptoms, or acute trauma.
                </p>
              </div>

              {/* Instant Binary Decision Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setTriageStep('danger');
                    handleFetchLocation();
                  }}
                  className="py-4 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-rose-600/30 flex flex-col items-center justify-center gap-1 transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span>YES — AT RISK</span>
                  </span>
                  <span className="text-[11px] text-rose-100 font-normal group-hover:underline">
                    Call 8072212411 & Send GPS
                  </span>
                </button>

                <button
                  onClick={() => setTriageStep('urgent')}
                  className="py-4 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm tracking-wide border border-slate-300 flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <span>NO — NON-CRITICAL</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    Urgent Care & Consultation
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CRITICAL DANGER / SOS TRIGGERED */}
          {triageStep === 'danger' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm text-rose-900">
                    Immediate 1-Click Trauma Call
                  </h4>
                  <p className="text-xs text-rose-800 mt-0.5 leading-snug">
                    Tap below to dial our emergency trauma desk directly at <strong>8072212411</strong>. No forms, no wait.
                  </p>
                </div>
              </div>

              {/* PRIMARY CALL ACTION */}
              <a
                href={TEL_URL}
                className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-rose-600/40 flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                <PhoneCall className="w-6 h-6 animate-pulse" />
                <span>CALL AMBULANCE: 8072212411</span>
              </a>

              {/* GPS TELEMETRY DISPATCH */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Real-Time GPS Location Dispatch</span>
                  </span>
                  {gpsLoading && (
                    <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Acquiring GPS...
                    </span>
                  )}
                </div>

                {locationData ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>GPS Coordinates Locked (±{locationData.accuracy}m)</span>
                      </div>
                      <div className="font-mono text-[11px] text-slate-500">
                        Latitude: {locationData.lat} • Longitude: {locationData.lng}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleSendLocationSMS}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Send via SMS</span>
                      </button>
                      <button
                        onClick={handleSendLocationWhatsApp}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Share on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {locationError ? (
                      <p className="text-xs text-rose-600 font-medium">{locationError}</p>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Share your live location with our ambulance dispatch team so paramedics reach you immediately.
                      </p>
                    )}
                    <button
                      onClick={handleFetchLocation}
                      disabled={gpsLoading}
                      className="w-full py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{gpsLoading ? 'Detecting Coordinates...' : 'Get My Current Location'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setTriageStep('question')}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  &larr; Back to risk evaluation
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: NON-CRITICAL / URGENT CARE */}
          {triageStep === 'urgent' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <h4 className="font-extrabold text-sm text-emerald-900">
                  Urgent Care & Elective Outpatient Services
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  For non-life-threatening symptoms (mild fever, joint pain, checkups, prescription renewals), you can connect directly with our outpatient desk or book an online consultation pass.
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href="tel:8072212411"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Hospital Front Desk: 8072212411</span>
                </a>

                <button
                  onClick={() => {
                    resetAndClose();
                    window.location.hash = 'appointments';
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Book In-Person / Video Visit</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setTriageStep('question')}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  &larr; Back to risk evaluation
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>AuraCare+ Emergency Command</span>
          <span>Response time &lt; 4 mins</span>
        </div>
      </div>
    </div>
  );
}
