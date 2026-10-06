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
        const data = {
          lat: latitude.toFixed(6),
          lng: longitude.toFixed(6),
          accuracy: Math.round(accuracy),
          mapsLink,
          timestamp: new Date().toLocaleTimeString(),
        };

        setLocationData(data);
        setGpsLoading(false);
        setBeaconTransmitted(true);

        // Auto-copy coordinates to clipboard so patient can immediately paste in any chat
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(
            `🚨 EMERGENCY SOS! Location Pin: ${mapsLink} (Lat: ${data.lat}, Lng: ${data.lng}, Acc: ±${data.accuracy}m)`
          ).then(() => setCopied(true)).catch(() => {});
        }

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
          'Location permission needed to pinpoint your exact coordinates. Please call 8072212411 directly to speak with dispatch.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (isOpen) {
      handleFetchLocation();
      // On mobile, auto-trigger the phone dialer after 500ms so patient is immediately connected
      const timer = setTimeout(() => {
        window.location.href = TEL_URL;
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendLocationSMS = () => {
    const text = locationData
      ? `🚨 MEDICAL EMERGENCY! Immediate trauma ambulance needed at: ${locationData.mapsLink} (Lat: ${locationData.lat}, Lng: ${locationData.lng}, Accuracy: ±${locationData.accuracy}m)`
      : `🚨 MEDICAL EMERGENCY! Immediate ambulance assistance required at my location.`;
    window.location.href = `sms:${EMERGENCY_NUMBER}?body=${encodeURIComponent(text)}`;
  };

  const handleSendLocationWhatsApp = () => {
    const text = locationData
      ? `🚨 *MEDICAL EMERGENCY SOS*\nImmediate trauma ambulance needed.\n📍 *Live Location*: ${locationData.mapsLink}\n*Coordinates*: Lat ${locationData.lat}, Lng ${locationData.lng} (±${locationData.accuracy}m)\n*Dispatched*: ${locationData.timestamp}`
      : `🚨 *MEDICAL EMERGENCY SOS*\nImmediate medical assistance needed. Please call me back.`;
    window.open(`https://wa.me/918072212411?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyCoordinates = () => {
    if (!locationData) return;
    navigator.clipboard.writeText(
      `🚨 EMERGENCY SOS: ${locationData.mapsLink} (Lat ${locationData.lat}, Lng ${locationData.lng})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-rose-500 overflow-hidden text-slate-900">
        
        {/* Urgent Header */}
        <div className="bg-rose-600 px-5 sm:px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-sm sm:text-base tracking-wide flex items-center gap-2">
                <span>EMERGENCY SOS BEACON ACTIVE</span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </h2>
              <p className="text-[11px] text-rose-100 font-bold">AuraCare Trauma Hotline: 8072212411</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Primary Call Trigger Box */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-center space-y-3">
            <div className="text-xs font-black text-rose-800 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <span>Connecting To Emergency Dispatch Room</span>
            </div>

            <a
              href={TEL_URL}
              className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-rose-600/35 transition-all active:scale-98"
            >
              <PhoneCall className="w-6 h-6 animate-bounce" />
              <span>CALL 8072212411 NOW</span>
            </a>

            <p className="text-[11px] text-slate-500 font-medium">
              Dialer automatically triggered. If call didn't start, tap the red button above.
            </p>
          </div>

          {/* GPS Coordinates & Live Beacon Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Live Satellite GPS Coordinates</span>
              </span>

              {gpsLoading && (
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Locking GPS...</span>
                </span>
              )}

              {beaconTransmitted && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>GPS Acquired</span>
                </span>
              )}
            </div>

            {locationData ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Latitude:</span>
                    <span className="font-bold text-slate-900">{locationData.lat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Longitude:</span>
                    <span className="font-bold text-slate-900">{locationData.lng}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">GPS Accuracy:</span>
                    <span className="font-semibold text-emerald-700">±{locationData.accuracy} meters</span>
                  </div>
                </div>

                {/* Instant Actions for Location */}
                <div className="grid grid-cols-2 gap-2 pt-1">
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
                    <span>SMS Pin</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <button
                    onClick={handleCopyCoordinates}
                    className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? '✓ Coordinates Copied!' : 'Copy Location Link'}</span>
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

          {/* Quick Guidance */}
          <div className="pt-1 text-center text-[11px] text-slate-500">
            Emergency Desk 24/7 Helpline: <strong className="text-slate-900 font-bold">8072212411</strong> • AuraCare Level-1 Trauma
          </div>
        </div>
      </div>
    </div>
  );
}
