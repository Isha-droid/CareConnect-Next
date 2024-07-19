"use client";
import { FC } from 'react';
import Image from 'next/image';
import { FaPhone, FaBirthdayCake, FaGenderless, FaInfoCircle, FaUser } from 'react-icons/fa';
import { IPatientRegister } from '../models/PatientRegister';

interface PatientProfileProps {
  patient: IPatientRegister | null;
}

const PatientProfile: FC<PatientProfileProps> = ({ patient }) => {
  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg">No patient data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center rounded-full border-4 border-pink-500 mb-6 md:mb-0 bg-gray-700 overflow-hidden transition-transform transform hover:scale-110 duration-300 ease-in-out">
            {patient.profilePicture ? (
              <Image
                src={patient.profilePicture}
                alt="Profile Picture"
                width={192}
                height={192}
                className="object-cover"
              />
            ) : (
              <FaUser className="text-6xl text-gray-400" />
            )}
          </div>

          {/* Personal Information */}
          <div className="md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4 text-pink-500">{patient.name}</h1>
            <p className="text-lg mb-2"><FaInfoCircle className="inline mr-2 text-pink-500" /> <span className="font-semibold">Email:</span> {patient.email}</p>
            <p className="text-lg mb-2"><FaPhone className="inline mr-2 text-pink-500" /> <span className="font-semibold">Phone:</span> {patient.phone}</p>
            <p className="text-lg mb-2"><FaBirthdayCake className="inline mr-2 text-pink-500" /> <span className="font-semibold">Birth Date:</span> {patient.birthDate}</p>
            <p className="text-lg mb-2"><FaGenderless className="inline mr-2 text-pink-500" /> <span className="font-semibold">Gender:</span> {patient.gender}</p>
          </div>
        </div>

        {/* Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Address & Occupation */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Address & Occupation</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Address:</span> {patient.address}</p>
            <p className="text-lg"><span className="font-semibold">Occupation:</span> {patient.occupation}</p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Emergency Contact</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {patient.emergencyContactName}</p>
            <p className="text-lg"><span className="font-semibold">Number:</span> {patient.emergencyContactNumber}</p>
          </div>

          {/* Insurance Information */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Insurance Information</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Provider:</span> {patient.insuranceProvider}</p>
            <p className="text-lg"><span className="font-semibold">Policy Number:</span> {patient.insurancePolicyNumber}</p>
          </div>

          {/* Medical Information */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Medical Information</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Allergies:</span> {patient.allergies}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Current Medication:</span> {patient.currentMedication}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Family Medical History:</span> {patient.familyMedicalHistory}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Past Medical History:</span> {patient.pastMedicalHistory}</p>
            <p className="text-lg"><span className="font-semibold">Primary Physician:</span> {patient.primaryPhysician}</p>
          </div>
        </div>

        {/* Identification Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">Identification Information</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-lg mb-2"><span className="font-semibold">Identification Type:</span> {patient.identificationType}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Identification No:</span> {patient.identificationNo}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Identification Document ID:</span> {patient.identificationDocumentId}</p>
            {/* Display document if available */}
            {patient.identificationDocument && (
              <div className="mt-4">
                <Image
                  src={patient.identificationDocument} // Assuming identificationDocument is a URL
                  alt="Identification Document"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>

        {/* Quotes Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <blockquote className="italic text-lg mb-4">
            <p>"The greatest wealth is health."</p>
          </blockquote>
          <footer className="text-sm text-gray-400">
            — Virgil
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
