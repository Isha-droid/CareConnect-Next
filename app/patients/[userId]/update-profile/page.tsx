"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { IPatientRegister } from '../models/PatientRegister';

const UpdateProfile: React.FC = () => {
  const searchParams = useSearchParams();
  const [patient, setPatient] = useState<IPatientRegister | null>(null);

  useEffect(() => {
    const patientParam = searchParams.get('patient');
    if (patientParam) {
      try {
        const decodedPatient = JSON.parse(decodeURIComponent(patientParam)) as IPatientRegister;
        setPatient(decodedPatient);
      } catch (error) {
        console.error("Failed to parse patient data from query:", error);
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient!,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic, such as updating the patient data
    console.log('Updated patient data:', patient);
  };

  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg">Loading patient data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-pink-500">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-pink-500">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={patient.name}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-gray-700 border border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-pink-500">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={patient.email}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-gray-700 border border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 text-pink-500">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={patient.phone}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-gray-700 border border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthDate" className="mb-1 text-pink-500">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={patient.birthDate}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-gray-700 border border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 text-pink-500">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={patient.gender}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-gray-700 border border-gray-600"
            />
          </div>
          {/* Add more fields as necessary */}
          <button
            type="submit"
            className="w-full p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
