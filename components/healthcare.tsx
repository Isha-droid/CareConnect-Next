import React from 'react';
import { FaHeartbeat, FaStethoscope, FaUserMd } from 'react-icons/fa';

const HealthcareSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center text-pink-500 mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-lg text-center text-gray-400">
            Innovative healthcare services for patients and providers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 group">
            <div className="flex flex-col items-center mb-4">
              <FaHeartbeat className="text-pink-500 text-9xl mb-4" />
              <h3 className="text-2xl font-semibold text-pink-500">Service 1</h3>
            </div>
            <p className="text-gray-400 group-hover:hidden">
              Quick medical advice for minor issues and follow-up. Our experts are here...
            </p>
            <p className="hidden group-hover:block text-gray-400 mt-2">
              Get quick and reliable medical advice for minor issues and follow-up appointments. Our experts are here to support you.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 group">
            <div className="flex flex-col items-center mb-4">
              <FaStethoscope className="text-pink-500 text-9xl mb-4" />
              <h3 className="text-2xl font-semibold text-pink-500">Service 2</h3>
            </div>
            <p className="text-gray-400 group-hover:hidden">
              Comprehensive diagnostic services to ensure your health and well-being...
            </p>
            <p className="hidden group-hover:block text-gray-400 mt-2">
              Our comprehensive diagnostic services help ensure your health and well-being with accurate and timely results.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 group">
            <div className="flex flex-col items-center mb-4">
              <FaUserMd className="text-pink-500 text-9xl mb-4" />
              <h3 className="text-2xl font-semibold text-pink-500">Service 3</h3>
            </div>
            <p className="text-gray-400 group-hover:hidden">
              Expert consultations with top doctors for specialized care and treatment...
            </p>
            <p className="hidden group-hover:block text-gray-400 mt-2">
              Schedule expert consultations with top doctors for specialized care and treatment tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSection;
