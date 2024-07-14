"use client"
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import Card from './Card'; // Adjust the import path according to your file structure
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  width: 30,
  height: 30,
  cursor: 'pointer',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

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
  {
    imageSrc: '/assets/images/stethoscope.jpeg',
    title: 'Medical Equipment',
    description: 'Explore our range of medical equipment for healthcare professionals.',
  },
  {
    imageSrc: '/assets/images/medtech.jpeg',
    title: 'MedTech Solutions',
    description: 'Discover advanced medical technologies shaping the future of healthcare.',
  },
  {
    imageSrc: '/assets/images/onboarding-img.png',
    title: 'Who We Are',
    description: 'Learn about our mission to provide quality healthcare services to communities around the globe.',
  },
  {
    imageSrc: '/assets/images/onboarding-img.png',
    title: 'Who We Are',
    description: 'Learn about our mission to provide quality healthcare services to communities around the globe.',
  },
  {
    imageSrc: '/assets/images/medtech.jpeg',
    title: 'MedTech Solutions',
    description: 'Discover advanced medical technologies shaping the future of healthcare.',
  },
  {
    imageSrc: '/assets/images/medtech.jpeg',
    title: 'MedTech Solutions',
    description: 'Discover advanced medical technologies shaping the future of healthcare.',
  },
];

const HealthcareCarousel: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">

      <div className="mb-12">
          <h2 className="text-4xl font-bold text-center text-pink-500 mb-4">
            Explore Our Platform
          </h2>
          <p className="text-lg text-center text-gray-400">
          Discover more about our comprehensive healthcare solutions.
          </p>
        </div>

      <Carousel
        showArrows={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={500}
        emulateTouch
        showStatus={false}
        showThumbs={false}
        className="max-w-4xl w-full"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
              <FaArrowLeft />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
              <FaArrowRight />
            </button>
          )
        }
      >
        {[...Array(Math.ceil(cardsData.length / 3))].map((_, index) => (
          <div key={index} className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-full">
              {cardsData.slice(index * 3, index * 3 + 3).map((card, idx) => (
                <Card key={idx} imageSrc={card.imageSrc} title={card.title} description={card.description} />
              ))}
            </div>
          </div>
        ))}
      </Carousel>
      </div>
    </section>
  );
};

export default HealthcareCarousel;
