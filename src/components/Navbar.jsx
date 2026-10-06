import React, { useState } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { EmergencySOSModal } from './EmergencySOSModal';
import {
  Activity,
  Calendar,
  ShieldAlert,
  Menu,
  X,
  PhoneCall,
  Clock,
  BookOpen,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const activePage = useVerticalStore((state) => state.activePage);
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  // Focused Hospital Navigation Routes with Medical Journal / Blog
  const navPages = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'departments', label: 'Departments' },
    { id: 'facilities', label: 'Facilities & Tech' },
    { id: 'blog', label: 'Medical Journal' },
    { id: 'contact', label: 'Emergency & Contact' },
  ];

  return (
    <>
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all duration-300">
        {/* Top Clinical & Emergency Utility Bar */}
        <div className="bg-slate-900 text-white text-[11px] font-medium py-1 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                24/7 Level-1 Trauma Emergency Hotline:
              </span>
              <a
                href="tel:8072212411"
                className="text-white hover:text-rose-300 font-black flex items-center gap-1 transition-colors"
              >
                <span>8072212411</span>
                <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">SOS</span>
              </a>
              <span className="hidden md:inline text-slate-600">•</span>
              <span className="hidden md:inline text-slate-300">
                Door-To-Doctor Under 4 Minutes
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="text-emerald-400 font-semibold hidden sm:inline flex items-center gap-1">
                <span>✓ JCI Accredited Hospital</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <button
                onClick={() => setActivePage('contact')}
                className="hover:text-emerald-400 hidden sm:inline transition-colors"
              >
                Admissions & Directions
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar (Clean 68px height) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0"
            onClick={() => setActivePage('home')}
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 flex items-center gap-1">
                <span>AURACARE+</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
              <div className="text-[10px] tracking-wider uppercase font-semibold text-emerald-800">
                Medical Center & Health System
              </div>
            </div>
          </div>

          {/* Central Navigation Links (Single Line on Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navPages.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {page.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setSosModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>SOS: 8072212411</span>
            </button>

            <button
              onClick={() => setActivePage('appointments')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-t border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Medical Navigation:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navPages.map((page) => {
                const isActive = activePage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => {
                      setActivePage(page.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    {page.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setActivePage('appointments');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <a
                href="tel:8072212411"
                className="w-full py-3 rounded-xl bg-rose-600 text-white font-extrabold text-xs text-center shadow-md flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span>EMERGENCY SOS: 8072212411</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
