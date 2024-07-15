import Link from 'next/link';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typewriter } from 'react-simple-typewriter';

const CarouselSection = () => {
  return (
    <section className="bg-gray-900 text-white py-0">
      <div className="relative h-screen overflow-hidden">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          interval={5000}
          transitionTime={500}
          stopOnHover={false}
          showStatus={false}
          showIndicators={false}
          className="h-full"
        >
          <div>
            <img
              src="images/slider/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src="images/slider/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src="images/slider/doctor-s-hand-holding-stethoscope-closeup.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
          </div>
        </Carousel>
        <div className="absolute inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="text-5xl font-bold text-white mb-6">
              Join Us For{' '}
              <Typewriter
                loop
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
                words={[' Better Health', ' Happy Days', ' Longer Lives']}
              />
            </div>
            <Link href="/patients/patient-login">
              <div className="inline-block px-8 py-3 rounded-md bg-pink-500 text-white text-2xl hover:bg-pink-600 transition duration-300 ease-in-out">
                Get Started
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
