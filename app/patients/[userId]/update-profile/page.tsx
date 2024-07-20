"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUploader } from '@/components/forms/FileUpload'; // Ensure this component is updated

// Define your Zod schema
const schema = z.object({
  birthDate: z.string().nonempty("Birth date is required"),
  gender: z.enum(['male', 'female']),
  address: z.string().nonempty("Address is required"),
  occupation: z.string().nonempty("Occupation is required"),
  emergencyContactName: z.string().nonempty("Emergency contact name is required"),
  emergencyContactNumber: z.string().nonempty("Emergency contact number is required"),
  insuranceProvider: z.string().nonempty("Insurance provider is required"),
  insurancePolicyNumber: z.string().nonempty("Insurance policy number is required"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationDocument: z.string(), // Adjust as per your requirement
});

type FormData = z.infer<typeof schema>;

const UpdateProfile: React.FC = () => {
  const searchParams = useSearchParams();
  const [patient, setPatient] = useState<FormData | null>(null);
  console.log(patient)

  // Initialize form with useForm and Zod resolver
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: patient || {}
  });

  useEffect(() => {
    const patientParam = searchParams.get('patient');
    if (patientParam) {
      try {
        const decodedPatient = JSON.parse(decodeURIComponent(patientParam)) as FormData;
        setPatient(decodedPatient);
        // Set default values for the form
        Object.keys(decodedPatient).forEach((key) => {
          setValue(key as keyof FormData, decodedPatient[key]);
        });
      } catch (error) {
        console.error("Failed to parse patient data from query:", error);
      }
    }
  }, [searchParams, setValue]);

  const handleFileChange = (file: File) => {
    setValue('identificationDocument', file);
  };

  const handleSubmitForm = (data: FormData) => {
    // Handle form submission logic
    console.log('Updated patient data:', data);
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
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Update Profile</h2>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl mb-4 text-white">Personal Information</h3>
              <div className="flex flex-col mb-4">
                <label htmlFor="birthDate" className="mb-1 text-white">Birth Date</label>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="date"
                      id="birthDate"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Select date"
                    />
                  )}
                />
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="gender" className="mb-1 text-white">Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          value="male"
                          checked={field.value === 'male'}
                          {...field}
                          className="form-radio text-pink-500"
                        />
                      )}
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          value="female"
                          checked={field.value === 'female'}
                          {...field}
                          className="form-radio text-pink-500"
                        />
                      )}
                    />
                    <span>Female</span>
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="address" className="mb-1 text-white">Address</label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="address"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Enter address"
                    />
                  )}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="occupation" className="mb-1 text-white">Occupation</label>
                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="occupation"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Enter occupation"
                    />
                  )}
                />
                {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>}
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl mb-4 text-white">Emergency Contact</h3>
              <div className="flex flex-col mb-4">
                <label htmlFor="emergencyContactName" className="mb-1 text-white">Contact Name</label>
                <Controller
                  name="emergencyContactName"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="emergencyContactName"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Enter contact name"
                    />
                  )}
                />
                {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName.message}</p>}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="emergencyContactNumber" className="mb-1 text-white">Contact Number</label>
                <Controller
                  name="emergencyContactNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="emergencyContactNumber"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Enter contact number"
                    />
                  )}
                />
                {errors.emergencyContactNumber && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactNumber.message}</p>}
              </div>
            </div>

            {/* Insurance Information Card */}
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl mb-4 text-white">Insurance Information</h3>
              <div className="flex flex-col mb-4">
                <label htmlFor="insuranceProvider" className="mb-1 text-white">Insurance Provider</label>
                <Controller
                  name="insuranceProvider"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="insuranceProvider"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Enter insurance provider"
                    />
                  )}
                />
                {errors.insuranceProvider && <p className="text-red-500 text-sm mt-1">{errors.insuranceProvider.message}</p>}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="insurancePolicyNumber" className="mb-1 text-white">Insurance Policy Number</label>
                <Controller
                  name="insurancePolicyNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="insurancePolicyNumber"
                      {...field}
                      className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                      placeholder="Enter policy number"
                    />
                  )}
                />
                {errors.insurancePolicyNumber && <p className="text-red-500 text-sm mt-1">{errors.insurancePolicyNumber.message}</p>}
              </div>
            </div>
          </div>

          {/* Medical History Card */}
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl mb-4 text-white">Medical History</h3>
            <div className="flex flex-col mb-4">
              <label htmlFor="allergies" className="mb-1 text-white">Allergies</label>
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="allergies"
                    {...field}
                    rows={3}
                    className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                    placeholder="List any allergies"
                  />
                )}
              />
              {errors.allergies && <p className="text-red-500 text-sm mt-1">{errors.allergies.message}</p>}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="currentMedication" className="mb-1 text-white">Current Medication</label>
              <Controller
                name="currentMedication"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="currentMedication"
                    {...field}
                    rows={3}
                    className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                    placeholder="List current medications"
                  />
                )}
              />
              {errors.currentMedication && <p className="text-red-500 text-sm mt-1">{errors.currentMedication.message}</p>}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="familyMedicalHistory" className="mb-1 text-white">Family Medical History</label>
              <Controller
                name="familyMedicalHistory"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="familyMedicalHistory"
                    {...field}
                    rows={3}
                    className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                    placeholder="Family medical history"
                  />
                )}
              />
              {errors.familyMedicalHistory && <p className="text-red-500 text-sm mt-1">{errors.familyMedicalHistory.message}</p>}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="pastMedicalHistory" className="mb-1 text-white">Past Medical History</label>
              <Controller
                name="pastMedicalHistory"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="pastMedicalHistory"
                    {...field}
                    rows={3}
                    className="p-2 rounded-lg bg-gray-700 border border-pink-500 placeholder-pink-500 text-white"
                    placeholder="Past medical history"
                  />
                )}
              />
              {errors.pastMedicalHistory && <p className="text-red-500 text-sm mt-1">{errors.pastMedicalHistory.message}</p>}
            </div>
          </div>

          {/* File Upload Card */}
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl mb-4 text-white">Identification Document</h3>
            <Controller
              name="identificationDocument"
              control={control}
              render={({ field }) => (
                <FileUploader
                  onChange={handleFileChange}
                  file={field.value}
                />
              )}
            />
            {errors.identificationDocument && <p className="text-red-500 text-sm mt-1">{errors.identificationDocument.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg shadow-md"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
