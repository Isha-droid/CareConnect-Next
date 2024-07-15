"use client"
import { useEffect } from 'react';
import { useState } from 'react';

import { FaClinicMedical } from 'react-icons/fa';
import Timeline from '@/components/TimeLine';
import Footer from '@/components/Footer';
import CarouselSection from '@/components/CarousalComponent';
import HealthcareCarousel from '@/components/healthcareCarousal';
import HealthcareSection from '@/components/healthcare';
import PasskeyModal from '@/components/modal/AdminPasskey';
const HomePage = () => {
  useEffect(() => {
    // Example: Adjust slider settings based on screen size or other conditions
    // For example, you can dynamically change slidesToShow based on window width
  }, []);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleAdminClick = () => {
    setIsAdminModalOpen(true);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header section */}
      <header className="flex items-center justify-center py-4 bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <FaClinicMedical className="text-pink-500 text-5xl" />
          <span className="text-5xl font-bold font-sans text-white">Care Connect</span>
        </div>
      </header>

      {/* Main content sections */}
      <section className="flex flex-col items-center justify-center px-4 py-8 bg-gray-900">
        <CarouselSection />
      </section>

      <section className="flex flex-col items-center justify-center px-4 py-8 bg-gray-900">
        <HealthcareCarousel />
      </section>

      <section className="flex flex-col items-center justify-center px-4 py-8 bg-gray-900">
        <HealthcareSection />
      </section>

      <section className="flex flex-col items-center justify-center px-4 py-8 bg-gray-900">
        <Timeline />
      </section>

      {/* Footer section */}
      <Footer onAdminClick={handleAdminClick} />

      {isAdminModalOpen && (
        <PasskeyModal onClose={() => setIsAdminModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
