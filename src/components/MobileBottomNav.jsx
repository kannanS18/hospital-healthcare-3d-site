import React, { useState, useEffect } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import {
  Home,
  UserCheck,
  Calendar,
  BookOpen,
  PhoneCall,
  Download,
  X,
  ShieldAlert,
} from 'lucide-react';

export function MobileBottomNav() {
  const activePage = useVerticalStore((state) => state.activePage);
  const setActivePage = useVerticalStore((state) => state.setActivePage);
  const setSosModalOpen = useVerticalStore((state) => state.setSosModalOpen);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'doctors', label: 'Doctors', icon: UserCheck },
    // Center is Book (appointments)
    { id: 'blog', label: 'Journal', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: PhoneCall, isEmergency: true },
  ];

  return (
    <>
      {/* PWA Floating Install Banner (Discreet on Mobile) */}
      {showInstallBanner && (
        <div className="md:hidden fixed bottom-[72px] left-3 right-3 z-40 p-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
              +
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Install AuraCare+ App</div>
              <div className="text-[10px] text-slate-400">Offline clinical access & 1-tap SOS</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Download className="w-3 h-3" />
              <span>Install</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="p-1 text-slate-400 hover:text-white"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation Bar (Visible only on mobile md:hidden) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1 flex items-center justify-around h-[66px]"
      >
        {/* Left Side: Home & Doctors */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'border-2 border-emerald-600 bg-emerald-50/90 text-emerald-900 shadow-xs'
                  : 'border-2 border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-emerald-700 stroke-[2.5]' : 'stroke-[1.75]'
                }`}
              />
              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'font-black text-emerald-900' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Center Booking Action Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setActivePage('appointments')}
            className={`flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-2xl text-white active:scale-95 transition-all cursor-pointer ${
              activePage === 'appointments'
                ? 'bg-emerald-600 border-2 border-emerald-900 ring-4 ring-emerald-500/50 shadow-xl scale-105'
                : 'bg-emerald-600 border-2 border-emerald-500/90 shadow-lg shadow-emerald-600/30'
            }`}
            aria-label="Book Appointment"
          >
            <Calendar className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span
            className={`text-[9px] mt-0.5 tracking-tight ${
              activePage === 'appointments'
                ? 'font-black text-emerald-800'
                : 'font-semibold text-slate-500'
            }`}
          >
            Book
          </span>
        </div>

        {/* Right Side: Journal & Contact/SOS */}
        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isEmergency) {
                  setSosModalOpen(true);
                } else {
                  setActivePage(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
                isActive
                  ? 'border-2 border-emerald-600 bg-emerald-50/90 text-emerald-900 shadow-xs'
                  : item.isEmergency
                  ? 'border-2 border-transparent text-rose-600 hover:text-rose-700'
                  : 'border-2 border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? 'text-emerald-700 stroke-[2.5]'
                    : item.isEmergency
                    ? 'text-rose-600 stroke-[2]'
                    : 'stroke-[1.75]'
                }`}
              />
              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive
                    ? 'font-black text-emerald-900'
                    : item.isEmergency
                    ? 'font-bold text-rose-700'
                    : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              {item.isEmergency && !isActive && (
                <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
