import React, { useEffect } from 'react';
import { useThemeApply } from './hooks/useThemeApply';
import { useVerticalStore } from './store/useVerticalStore';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FooterSection } from './sections/FooterSection';

// Hospital Multi-Page Views
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { HealthToolsPage } from './pages/HealthToolsPage';
import { ContactEmergencyPage } from './pages/ContactEmergencyPage';
import { BlogPage } from './pages/BlogPage';

export default function App() {
  // Apply dynamic CSS variables and typography classes
  useThemeApply();

  const activePage = useVerticalStore((state) => state.activePage);
  const setActivePage = useVerticalStore((state) => state.setActivePage);

  // Sync with URL Hash on Mount & Hashchange
  useEffect(() => {
    const handleHash = () => {
      let rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (!rawHash) rawHash = 'home';
      const validPages = [
        'home',
        'doctors',
        'departments',
        'facilities',
        'appointments',
        'health-tools',
        'contact',
        'blog',
      ];
      if (validPages.includes(rawHash)) {
        setActivePage(rawHash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, [setActivePage]);

  const handleOpenBooking = () => {
    setActivePage('appointments');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 flex flex-col justify-between pb-16 md:pb-0">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Multi-Page Content Area */}
      <main className="flex-1 pt-24 sm:pt-28">
        <div className="animate-in fade-in duration-300">
          {activePage === 'home' && <HomePage onOpenBooking={handleOpenBooking} />}
          {activePage === 'doctors' && <DoctorsPage />}
          {activePage === 'departments' && <DepartmentsPage />}
          {activePage === 'facilities' && <FacilitiesPage />}
          {activePage === 'appointments' && <AppointmentsPage />}
          {activePage === 'health-tools' && <HealthToolsPage />}
          {activePage === 'contact' && <ContactEmergencyPage />}
          {activePage === 'blog' && <BlogPage />}
        </div>
      </main>

      {/* Comprehensive Hospital Footer */}
      <FooterSection />

      {/* Mobile PWA Bottom Navigation (Visible only on mobile/tablet) */}
      <MobileBottomNav />
    </div>
  );
}
