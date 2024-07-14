"use client";

import { FaArrowRight, FaHeartbeat } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../public/assets/icons/logo-full.svg';
import Link from 'next/link';
import './globals.css';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Card from '@/components/Card';

const cardsData = [
  {
    imageSrc: '/assets/images/onboarding-img.png',
    title: 'Who We Are',
    description: 'Learn about our mission to provide quality healthcare services to communities around the globe.',
  },
  {
    imageSrc: '/assets/images/dr-cruz.png',
    title: 'Our Services',
    description: 'Discover our comprehensive range of healthcare services tailored to meet your needs.',
  },
  {
    imageSrc: '/assets/images/dr-lee.png',
    title: 'Meet Our Team',
    description: 'Meet the dedicated professionals who make our healthcare platform a success.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-center py-4 bg-gray-800 shadow-md">
        <Image src={logo} alt="Logo" className="h-10" />
      </header>

      <main className="relative flex flex-col items-center justify-center flex-grow p-4">
        <div className="absolute inset-0 bg-gray-900 opacity-75 z-0"></div>
        <div className="relative z-10 w-full max-w-3xl text-center my-20">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-pink-500"
          >
            <span className="text-white">Discover Your</span> Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-3xl mb-12 text-gray-300"
          >
            <Typewriter
              words={['Empower Your Health', 'Your Trusted Healthcare Partner', 'Innovative Medical Solutions']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/patients/patient-login">
              <div className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                Get Started <FaArrowRight className="ml-2" />
              </div>
            </Link>
          </motion.div>
        </div>
        <FaHeartbeat className="absolute bottom-0 mb-4 text-pink-500 opacity-25 text-[20rem] lg:text-[30rem]" />
      </main>

      <section className="flex flex-col items-center justify-center p-8 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Explore Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <Card key={index} imageSrc={card.imageSrc} title={card.title} description={card.description} />
          ))}
        </div>
      </section>

      <footer className="flex items-center justify-center py-4 bg-gray-800 text-gray-400">
        <Link href="/?admin=true" className="text-gray-400 hover:underline mr-4">
          Admin
        </Link>
        <div>&copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
