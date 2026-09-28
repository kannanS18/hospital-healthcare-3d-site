import React from 'react';
import { Navbar } from './components/Navbar';
import { HospitalCanvas } from './3d/HospitalCanvas';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-body relative selection:bg-[#0D9488] selection:text-white">
      <Navbar onOpenBooking={scrollToContact} />
      <div className="relative pt-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-[#0D9488] -z-10 opacity-15 pointer-events-none" />
        <HeroSection onOpenBooking={scrollToContact} />
        <div className="relative -mt-10 sm:-mt-16 z-10">
          <HospitalCanvas />
        </div>
      </div>
      <ServicesSection onOpenBooking={scrollToContact} />
      <GallerySection onOpenBooking={scrollToContact} />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}