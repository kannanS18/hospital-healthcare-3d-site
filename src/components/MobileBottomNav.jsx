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

  return (
    <>
      {/* PWA Floating Install Banner (Discreet on Mobile) */}
      {showInstallBanner && (
        <div className="md:hidden fixed bottom-[68px] left-3 right-3 z-40 p-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
              +
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Install AuraCare+ App</div>
              <div className="text-[10px] text-slate-400">Instant offline access & direct emergency call</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm whitespace-nowrap"
            >
              <Download className="w-3 h-3" />
              <span>Install</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation Bar (Visible only on mobile md:hidden) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around h-[62px]"
      >
        <button
          onClick={() => setActivePage('home')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-90 ${
            activePage === 'home'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${activePage === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Home</span>
        </button>

        <button
          onClick={() => setActivePage('doctors')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-90 ${
            activePage === 'doctors'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <UserCheck className={`w-5 h-5 ${activePage === 'doctors' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Doctors</span>
        </button>

        {/* Center Booking Action Pill */}
        <button
          onClick={() => setActivePage('appointments')}
          className="flex flex-col items-center justify-center -mt-4 w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 active:scale-90 transition-transform"
          aria-label="Book Appointment"
        >
          <Calendar className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActivePage('blog')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-90 ${
            activePage === 'blog'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activePage === 'blog' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Journal</span>
        </button>

        <a
          href="tel:8072212411"
          className="flex flex-col items-center justify-center w-14 h-12 rounded-xl text-rose-600 hover:text-rose-700 transition-all active:scale-90"
        >
          <PhoneCall className="w-5 h-5 stroke-[2] animate-pulse" />
          <span className="text-[10px] mt-0.5 font-bold">SOS</span>
        </a>
      </nav>
    </>
  );
}
