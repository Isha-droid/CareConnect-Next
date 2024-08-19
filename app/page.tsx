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

import { Socket, io } from "socket.io-client"

const PORT = 2999

// function socketClient() {
//   const socket = io(`:${PORT + 1}`, { path: "/api/socket/page", addTrailingSlash: false })

//   socket.on("connect", () => {
//     console.log("Connected")
//   })

//   socket.on("disconnect", () => {
//     console.log("Disconnected")
//   })

//   socket.on("connect_error", async err => {
//     console.log(`connect_error due to ${err.message}`)
//     await fetch("/api/socket")
//   })

//   return socket
// }

const HomePage: React.FC = () => {
  // useEffect(() => {
  //   const socket = socketClient();

  //   return () => {
  //     socket.disconnect(); // Clean up the socket connection when the component unmounts
  //   }
  // }, []);

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
      <Footer onAdminClick={undefined} />

    </div>
  );
};

export default HomePage;
