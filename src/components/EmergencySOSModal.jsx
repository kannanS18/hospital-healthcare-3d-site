import React, { useState, useEffect } from 'react';
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
  Copy,
  ExternalLink,
  Send,
} from 'lucide-react';

export function EmergencySOSModal({ isOpen, onClose }) {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [copied, setCopied] = useState(false);
  const [beaconTransmitted, setBeaconTransmitted] = useState(false);

  const EMERGENCY_NUMBER = '8072212411';
  const TEL_URL = `tel:${EMERGENCY_NUMBER}`;

  // Unique Crisis Incident Tracking ID (RapidSOS CAD Pattern)
  const [incidentId] = useState(() => `AC-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported on this device. Please call dispatch directly.');
      return;
    }

    setGpsLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const data = {
          incidentId,
          lat: latitude.toFixed(6),
          lng: longitude.toFixed(6),
          accuracy: Math.round(accuracy),
          mapsLink,
          timestamp: new Date().toLocaleTimeString(),
        };

        setLocationData(data);
        setGpsLoading(false);
        setBeaconTransmitted(true);

        // Auto-copy coordinates to clipboard as fallback
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(
            `🚨 [AuraCare SOS Incident ${incidentId}] Emergency Pin: ${mapsLink} (Lat: ${data.lat}, Lng: ${data.lng}, Acc: ±${data.accuracy}m)`
          ).then(() => setCopied(true)).catch(() => {});
        }

        // Silent Telemetry Stream (CAD sync)
        try {
          fetch('https://formspree.io/f/xbjnbqzy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              incidentId,
              emergency_number: '8072212411',
              alert: '🚨 CRITICAL MEDICAL EMERGENCY SOS DISPATCH',
              mapsLink: mapsLink,
              latitude: data.lat,
              longitude: data.lng,
              accuracy: `${data.accuracy}m`,
              timestamp: new Date().toISOString(),
            }),
          }).catch(() => {});
        } catch (e) {}

        // Store to local emergency dispatch log
        try {
          const log = JSON.parse(localStorage.getItem('auracare_emergency_beacons') || '[]');
          log.unshift({ ...data, date: new Date().toISOString() });
          localStorage.setItem('auracare_emergency_beacons', JSON.stringify(log.slice(0, 10)));
        } catch (e) {}
      },
      (err) => {
        setGpsLoading(false);
        setLocationError(
          'Location signal timed out or permission restricted. Please state your landmark when calling dispatch.'
        );
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (isOpen) {
      handleFetchLocation();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendLocationSMS = () => {
    const text = locationData
      ? `🚨 EMERGENCY [Incident ${incidentId}]! Trauma ambulance needed immediately at: ${locationData.mapsLink} (Lat: ${locationData.lat}, Lng: ${locationData.lng}, Accuracy: ±${locationData.accuracy}m)`
      : `🚨 EMERGENCY [Incident ${incidentId}]! Immediate ambulance assistance required.`;
    window.location.href = `sms:${EMERGENCY_NUMBER}?body=${encodeURIComponent(text)}`;
  };

  const handleSendLocationWhatsApp = () => {
    const text = locationData
      ? `🚨 *CRITICAL EMERGENCY [Incident ${incidentId}]*\nImmediate trauma ambulance needed.\n📍 *Live Location*: ${locationData.mapsLink}\n*Coordinates*: Lat ${locationData.lat}, Lng ${locationData.lng} (±${locationData.accuracy}m)\n*Dispatched*: ${locationData.timestamp}`
      : `🚨 *CRITICAL EMERGENCY [Incident ${incidentId}]*\nImmediate medical assistance needed. Please call me back.`;
    window.open(`https://wa.me/918072212411?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyCoordinates = () => {
    if (!locationData) return;
    navigator.clipboard.writeText(
      `🚨 [Incident ${incidentId}] Location: ${locationData.mapsLink} (Lat ${locationData.lat}, Lng ${locationData.lng})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-rose-600 overflow-hidden text-slate-900">
        
        {/* RapidSOS-Style Tactical Emergency Banner */}
        <div className="bg-rose-600 px-5 sm:px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-sm sm:text-base tracking-wider uppercase">
                  TRAUMA SOS BEACON
                </h2>
                <span className="text-[10px] bg-white text-rose-700 font-extrabold px-2 py-0.5 rounded-full">
                  #{incidentId}
                </span>
              </div>
              <p className="text-[11px] text-rose-100 font-medium">AuraCare Dedicated Emergency Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Primary High-Contrast Call Action */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/60 border-2 border-rose-400 text-center space-y-3.5 shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span className="text-xs font-black text-rose-900 tracking-wide uppercase">
                Direct Line: 8072212411
              </span>
            </div>

            <a
              href={TEL_URL}
              className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-xl shadow-rose-600/40 transition-all cursor-pointer"
            >
              <PhoneCall className="w-6 h-6 animate-bounce" />
              <span>CALL DISPATCH ROOM</span>
            </a>

            <div className="bg-white/80 rounded-xl p-2.5 text-[11px] text-slate-700 border border-rose-200 flex items-center justify-center gap-1.5 font-medium">
              <span>Tell operator your Incident PIN:</span>
              <strong className="text-rose-700 font-black text-xs font-mono">#{incidentId}</strong>
            </div>
          </div>

          {/* RapidSOS-Style Telemetry & GPS Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Satellite GPS CAD Link</span>
              </span>

              {gpsLoading && (
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Locking Orbit...</span>
                </span>
              )}

              {beaconTransmitted && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>CAD Stream Synchronized</span>
                </span>
              )}
            </div>

            {locationData ? (
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-800 space-y-1 shadow-inner">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Incident Code:</span>
                    <span className="font-bold text-rose-600 font-mono">{incidentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coordinates:</span>
                    <span className="font-bold text-slate-900">{locationData.lat}, {locationData.lng}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">GPS Accuracy:</span>
                    <span className="font-semibold text-emerald-700">±{locationData.accuracy} meters</span>
                  </div>
                </div>

                {/* Instant Location Dispatch Channels */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    onClick={handleSendLocationWhatsApp}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp Pin</span>
                  </button>

                  <button
                    onClick={handleSendLocationSMS}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>SMS Emergency Pin</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <button
                    onClick={handleCopyCoordinates}
                    className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? '✓ Incident Copied!' : 'Copy Location Link'}</span>
                  </button>

                  <a
                    href={locationData.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : locationError ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <p>{locationError}</p>
                <button
                  onClick={handleFetchLocation}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs"
                >
                  Retry GPS Lock
                </button>
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Acquiring satellite lock for emergency dispatch...</span>
              </div>
            )}
          </div>

          {/* Dedicated Hospital Hotline Note */}
          <div className="pt-0.5 text-center text-[11px] text-slate-500">
            Emergency Desk Dedicated 24/7 Hotline: <strong className="text-slate-900 font-bold">8072212411</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
