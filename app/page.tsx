"use client"
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaClinicMedical } from 'react-icons/fa';
import Timeline from '@/components/TimeLine';
import Footer from '@/components/Footer';
import CarouselSection from '@/components/CarousalComponent';
import HealthcareCarousel from '@/components/healthcareCarousal';
import HealthcareSection from '@/components/healthcare';
import PasskeyModal from '@/components/modal/AdminPasskey';



const HomePage: React.FC = () => {
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
