import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  privacyConsent: z.boolean().refine(value => value === true, { message: 'Privacy consent is required' }),
  gender: z.enum(['male', 'female', 'other']),
  birthDate: z.string().min(1, { message: 'Birth date is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  emergencyContactName: z.string().min(1, { message: 'Emergency contact name is required' }),
  emergencyContactNumber: z.string().min(1, { message: 'Emergency contact number is required' }),
  insuranceProvider: z.string().min(1, { message: 'Insurance provider is required' }),
  insurancePolicyNumber: z.string().min(1, { message: 'Insurance policy number is required' }),
  allergies: z.string().min(1, { message: 'Allergies information is required' }),
  currentMedication: z.string().min(1, { message: 'Current medication information is required' }),
  familyMedicalHistory: z.string().min(1, { message: 'Family medical history is required' }),
  pastMedicalHistory: z.string().min(1, { message: 'Past medical history is required' }),
  identificationType: z.enum(['passport', 'drivingLicense', 'nationalID']),
  identificationNo: z.string().min(1, { message: 'Identification number is required' }),
  identificationDocumentId: z.string().min(1, { message: 'Identification document ID is required' }),
  primaryPhysician: z.string().min(1, { message: 'Primary physician information is required' }),
});

type FormValues = z.infer<typeof schema>;

const RegisterForm = ({user: any}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Add your submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-lg p-8 shadow-lg w-full space-y-6">
      <h2 className="text-white text-lg font-semibold mb-4">Professional Information Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email</label>
          <input type="email" id="email" {...register('email')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-400 text-sm mb-2">Phone Number</label>
          <input type="text" id="phone" {...register('phone')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 text-sm mb-2">Name</label>
          <input type="text" id="name" {...register('name')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-400 text-sm mb-2">Gender</label>
          <select id="gender" {...register('gender')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-gray-400 text-sm mb-2">Birth Date</label>
          <input type="date" id="birthDate" {...register('birthDate')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-400 text-sm mb-2">Address</label>
          <textarea id="address" {...register('address')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="occupation" className="block text-gray-400 text-sm mb-2">Occupation</label>
          <input type="text" id="occupation" {...register('occupation')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="emergencyContactName" className="block text-gray-400 text-sm mb-2">Emergency Contact Name</label>
          <input type="text" id="emergencyContactName" {...register('emergencyContactName')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="emergencyContactNumber" className="block text-gray-400 text-sm mb-2">Emergency Contact Number</label>
          <input type="text" id="emergencyContactNumber" {...register('emergencyContactNumber')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.emergencyContactNumber && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactNumber.message}</p>}
        </div>
      </div>

      {/* Medical Information */}
      <h3 className="text-white text-lg font-semibold mb-4 mt-8">Medical Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="insuranceProvider" className="block text-gray-400 text-sm mb-2">Insurance Provider</label>
          <input type="text" id="insuranceProvider" {...register('insuranceProvider')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.insuranceProvider && <p className="text-red-500 text-sm mt-1">{errors.insuranceProvider.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="insurancePolicyNumber" className="block text-gray-400 text-sm mb-2">Insurance Policy Number</label>
          <input type="text" id="insurancePolicyNumber" {...register('insurancePolicyNumber')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.insurancePolicyNumber && <p className="text-red-500 text-sm mt-1">{errors.insurancePolicyNumber.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="allergies" className="block text-gray-400 text-sm mb-2">Allergies</label>
          <textarea id="allergies" {...register('allergies')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.allergies && <p className="text-red-500 text-sm mt-1">{errors.allergies.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="currentMedication" className="block text-gray-400 text-sm mb-2">Current Medication</label>
          <textarea id="currentMedication" {...register('currentMedication')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.currentMedication && <p className="text-red-500 text-sm mt-1">{errors.currentMedication.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="familyMedicalHistory" className="block text-gray-400 text-sm mb-2">Family Medical History</label>
          <textarea id="familyMedicalHistory" {...register('familyMedicalHistory')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.familyMedicalHistory && <p className="text-red-500 text-sm mt-1">{errors.familyMedicalHistory.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="pastMedicalHistory" className="block text-gray-400 text-sm mb-2">Past Medical History</label>
          <textarea id="pastMedicalHistory" {...register('pastMedicalHistory')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.pastMedicalHistory && <p className="text-red-500 text-sm mt-1">{errors.pastMedicalHistory.message}</p>}
        </div>
      </div>

      {/* Identification and Verification */}
      <h3 className="text-white text-lg font-semibold mb-4 mt-8">Identification and Verification</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="identificationType" className="block text-gray-400 text-sm mb-2">Identification Type</label>
          <select id="identificationType" {...register('identificationType')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500">
            <option value="passport">Passport</option>
            <option value="drivingLicense">Driving License</option>
            <option value="nationalID">National ID</option>
          </select>
          {errors.identificationType && <p className="text-red-500 text-sm mt-1">{errors.identificationType.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="identificationNo" className="block text-gray-400 text-sm mb-2">Identification Number</label>
          <input type="text" id="identificationNo" {...register('identificationNo')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.identificationNo && <p className="text-red-500 text-sm mt-1">{errors.identificationNo.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="identificationDocumentId" className="block text-gray-400 text-sm mb-2">Identification Document ID</label>
          <input type="text" id="identificationDocumentId" {...register('identificationDocumentId')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.identificationDocumentId && <p className="text-red-500 text-sm mt-1">{errors.identificationDocumentId.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="primaryPhysician" className="block text-gray-400 text-sm mb-2">Primary Physician</label>
          <input type="text" id="primaryPhysician" {...register('primaryPhysician')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
          {errors.primaryPhysician && <p className="text-red-500 text-sm mt-1">{errors.primaryPhysician.message}</p>}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <input type="checkbox" id="privacyConsent" {...register('privacyConsent')} className="mr-2 cursor-pointer border border-gray-400 focus:outline-none rounded h-5 w-5 bg-gray-700 text-pink-500" />
          <label htmlFor="privacyConsent" className="text-gray-400 text-sm">I agree to the privacy policy, including the use of my personal information as described.</label>
        </div>
        {errors.privacyConsent && <p className="text-red-500 text-sm mt-1">{errors.privacyConsent.message}</p>}
      </div>

      <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 focus:outline-none focus:bg-pink-600 ">Submit</button>
    </form>
  );
};

export default RegisterForm;
