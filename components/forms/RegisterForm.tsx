"use client"
// RegisterForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  birthDate: z.date(),
  gender: z.enum(['male', 'female', 'other']),
});

type FormValues = z.infer<typeof schema>;

const RegisterForm = ({ user }: { user: User }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-xl w-full">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-400 text-sm mb-2">First Name</label>
        <input type="text" id="firstName" {...register('firstName')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email</label>
        <input type="email" id="email" {...register('email')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="birthDate" className="block text-gray-400 text-sm mb-2">Date of Birth</label>
        <input type="date" id="birthDate" {...register('birthDate')} className="w-full p-2 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none focus:border-pink-500" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-2">Gender</label>
        <div className="flex items-center">
          <label className="mr-4">
            <input type="radio" {...register('gender')} value="male" className="mr-1" />
            Male
          </label>
          <label className="mr-4">
            <input type="radio" {...register('gender')} value="female" className="mr-1" />
            Female
          </label>
          <label>
            <input type="radio" {...register('gender')} value="other" className="mr-1" />
            Other
          </label>
        </div>
      </div>

      <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
